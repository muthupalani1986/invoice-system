import { Component, OnDestroy, OnInit, ViewEncapsulation, ViewChild, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject, fromEvent, Observable } from 'rxjs';
import { takeUntil, debounceTime, distinctUntilChanged, startWith, map } from 'rxjs/operators';
import { fuseAnimations } from '@fuse/animations';
import { FuseUtils } from '@fuse/utils';
import { Product } from 'app/main/product/add-product/product.model';
import { EcommerceProductService } from 'app/main/product/add-product/product.service';
import * as _ from 'lodash';

import { NotificationService } from '../../../services/notification.service';
import { SNACK_BAR_MSGS } from '../../../constants/notification.constants';
import { QuotationService } from '../quotation.service';
import { Quotation } from '../quotation.model';
import { HttpCustomerService } from '../../../services/http-customer.service';
import { CustomerDetails } from '../../../interfaces/customer.interface';
import { ProductDetails } from '../../../interfaces/product.interface';
import { HttpProductService } from '../../../services/http-product.service';


@Component({
  selector: 'app-add-quotation',
  templateUrl: './add-quotation.component.html',
  styleUrls: ['./add-quotation.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class AddQuotationComponent implements OnInit, OnDestroy {
  autoCompleteCtrl = new FormControl();
  filteredProducts: Observable<ProductDetails[]>;
  quotation: Quotation;
  pageType: string;
  quotationForm: FormGroup;
  customers: CustomerDetails[];
  products: ProductDetails[] = [];
  displayedColumns = ['name', 'code', 'quantity', 'unit_price', 'discount', 'tax', 'lineTotal', 'Action'];
  dataSource = [];
  // Private
  private _unsubscribeAll: Subject<any>;
  @ViewChild('filter', { static: true })
  filter: ElementRef;
  /**
   * Constructor
   *
   * @param {EcommerceProductService} _ecommerceProductService
   * @param {FormBuilder} _formBuilder
   * @param {Location} _location
   * @param {MatSnackBar} _matSnackBar
   */
  constructor(
    private _quotationService: QuotationService,
    private _formBuilder: FormBuilder,
    private _location: Location,
    private _matSnackBar: MatSnackBar,
    private _notificationService: NotificationService,
    private _httpCustomerService: HttpCustomerService,
    private _httpProductService: HttpProductService
  ) {
    // Set the default
    this.quotation = new Quotation();

    // Set the private defaults
    this._unsubscribeAll = new Subject();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Lifecycle hooks
  // -----------------------------------------------------------------------------------------------------

  /**
   * On init
   */
  ngOnInit(): void {

    this._quotationService.onQuotationChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(quotation => {
        if (quotation) {
          this.quotation = new Quotation(quotation);
          this.pageType = 'edit';
        }
        else {
          this.pageType = 'new';
          this.quotation = new Quotation();
        }
        this.quotationForm = this.createQuotationForm();
        this.createdOrdersForEdit();
      });

    this._httpCustomerService.getAllCustomers()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(customers => {
        this.customers = _.get(customers, 'customers', []);
      });

    this._httpProductService.getAllProducts(true)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(products => {
        this.products = _.get(products, 'products', []);
      });

    this.filteredProducts = this.autoCompleteCtrl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value))
    );
  }

  private _filter(value: string): ProductDetails[] {
    const filterValue = value.toLowerCase();
    const productDetails = _.filter(this.products, (prod) => {
      return prod.name.toLowerCase().indexOf(filterValue) !== -1 || prod.code.toLowerCase().indexOf(filterValue) !== -1
    });
    return productDetails;
  }
  getPosts(productCode: string) {
    let orderIndex: number;
    const productDetails = _.find(this.products, { code: productCode });
    if (productDetails) {
      productDetails.unit_price = productDetails.sellingPrice;
      const productId = +(productDetails.id);
      orderIndex = _.findIndex(this.ordersArray.value, { product_id: productDetails.id });
    }
    if (productDetails && orderIndex == -1) {
      productDetails.quantity = 1;
      this.placeOrder(productDetails);
    }
    if (productDetails && orderIndex !== -1) {
      productDetails.quantity = +(this.ordersArray.value[orderIndex].quantity + 1);
      this.ordersArray.at(orderIndex).patchValue(productDetails);
    }
    this.dataSource = this.ordersArray.value;
    this.updateOrderSummary();
  }
  /**
   * On destroy
   */
  ngOnDestroy(): void {
    // Unsubscribe from all subscriptions
    this._unsubscribeAll.next();
    this._unsubscribeAll.complete();
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Public methods
  // -----------------------------------------------------------------------------------------------------

  /**
   * Create product form
   *
   * @returns {FormGroup}
   */
  createQuotationForm(): FormGroup {
    return this._formBuilder.group({
      id: [this.quotation.id],
      inv_number: [this.quotation.inv_number],
      quotation_number: [this.quotation.quotation_number],
      status: [this.quotation.status],
      note: [this.quotation.note],
      order_discount: [this.quotation.order_discount],
      shipping_cost: [this.quotation.shipping_cost],
      customer_id: [this.quotation.customer_id],
      order_tax: [this.quotation.order_tax],
      orders: this._formBuilder.array([]),
      subtotal: [0],
      taxAmount: [0],
      discountAmount: [0],
      grandTotal: [0]
    });
  }

  get order_discount(): any {
    return this.quotationForm.get('order_discount');
  }

  get shipping_cost(): any {
    return this.quotationForm.get('shipping_cost');
  }

  get order_tax(): any {
    return this.quotationForm.get('order_tax');
  }

  get ordersArray(): FormArray {
    return this.quotationForm.get('orders') as FormArray;
  }

  addOrder(): FormGroup {
    const orderGroup = this.orderFormGroup();
    this.ordersArray.push(orderGroup);
    this.quotationForm.markAsDirty();
    return orderGroup;
  }

  orderFormGroup(): FormGroup {
    return this._formBuilder.group({
      id: [],
      quotation_id: [],
      product_id: [],
      quantity: [],
      unit_price: [],
      discount: [],
      tax: [],
      name: [],
      code: [],
      lineTotal: [0]
    });
  }

  createdOrdersForEdit() {
    _.each(this.quotation.orders, (order) => {
      const group = this.addOrder();
      group.patchValue({
        id: order.id,
        quotation_id: order.quotation_id,
        product_id: order.product_id,
        quantity: order.quantity,
        unit_price: order.unit_price,
        discount: order.discount,
        tax: order.tax,
        name: order.name,
        code: order.code
      });
    });
    this.dataSource = this.ordersArray.value;
    this.updateOrderSummary();
  }
  placeOrder(order) {
    const group = this.addOrder();
    group.patchValue({
      id: 0,
      quotation_id: this.quotation.id || 0,
      product_id: order.id || 0,
      quantity: order.quantity || 0,
      unit_price: order.unit_price || 0,
      discount: order.discount || 0,
      tax: order.tax || 0,
      name: order.name || '',
      code: order.code || ''
    });
  }
  /**
   * 
   * @param index 
   * @description: Delete order
   */
  deleteOrder(index: number): void {
    this.ordersArray.removeAt(index);
    this.quotationForm.markAsDirty();
    this.dataSource = this.ordersArray.value;
    this.updateOrderSummary();
  }
  /**
   * Save Quotation
   */
  saveQuotation(): void {
    const data = this.quotationForm.getRawValue();
    const requestPayload: Quotation = {
      ...data
    };
    this._quotationService.saveQuotation(requestPayload)
      .then((response) => {
        // Trigger the subscription with new data
        this._quotationService.onQuotationChanged.next(data);
        this._notificationService.show(response.message, 'success');

      }, (err) => {
        this._notificationService.show(SNACK_BAR_MSGS.genericError, 'error');
      });
  }


  /**
   * Add Quotation
   */
  addQuotation(): void {
    const data = this.quotationForm.getRawValue();
    const requestPayload: Quotation = {
      ...data
    };
    this._quotationService.addQuotation(requestPayload)
      .then((response) => {
        // Trigger the subscription with new data
        data.id = response.id;
        data.quotation_number = response.quotation_number;
        this.quotationForm.patchValue({ id: response.id });
        this._quotationService.onQuotationChanged.next(data);
        this._notificationService.show(response.message, 'success');
        // Change the location with new one        
        this._location.go('quote/quotation/' + this.quotation.id + '/' + response.quotation_number);
      }, (err) => {
        this._notificationService.show(SNACK_BAR_MSGS.genericError, 'error');
      });
  }
  updateOrderSummary() {
    let subtotal: number = 0
    _.forEach(this.ordersArray.value, (item, index: number) => {
      const amount = +(item.unit_price * item.quantity);
      const disCountAmount = +((amount * item.discount) / 100);
      const taxableAmount = +(amount - disCountAmount);
      const tax = +((taxableAmount * item.tax) / 100);
      const itemTotal = (taxableAmount + tax);
      subtotal = subtotal + itemTotal;
      this.ordersArray.at(index).patchValue({
        lineTotal: itemTotal.toFixed(2)
      });
    });
    const quotationForm = this.quotationForm.getRawValue();
    const orderDisCountAmount = +((subtotal * quotationForm.order_discount) / 100);
    const orderTaxableAmount = +((subtotal + quotationForm.shipping_cost) - orderDisCountAmount);
    const orderTaxAmount = +((orderTaxableAmount * quotationForm.order_tax) / 100);
    const grandTotal = (orderTaxableAmount + orderTaxAmount);
    this.quotationForm.patchValue({
      subtotal: subtotal.toFixed(2),
      grandTotal: grandTotal.toFixed(2),
      taxAmount: orderTaxAmount.toFixed(2),
      discountAmount: orderDisCountAmount.toFixed(2)
    })
  }
}
