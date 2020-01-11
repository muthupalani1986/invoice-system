import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Location } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
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
  customer: Quotation;
  pageType: string;
  customerForm: FormGroup;
  customers:CustomerDetails[];
  products:ProductDetails[]

  // Private
  private _unsubscribeAll: Subject<any>;

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
    private _notificationService:NotificationService,
    private _httpCustomerService:HttpCustomerService,
    private _httpProductService:HttpProductService
  ) {
    // Set the default
    this.customer = new Quotation();

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
    
    this._quotationService.onCustomerChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(customer => {        
        if (customer) {
          const isValidData=_.get(customer,'name','404'); 
          if(isValidData==='404'){
            this._notificationService.show(SNACK_BAR_MSGS.genericError,'error');
          }         
          this.customer = new Quotation(customer);
          this.pageType = 'edit';
        }
        else {
          this.pageType = 'new';
          this.customer = new Quotation();
        }

        this.customerForm = this.createCustomerForm();
      });

      this._httpCustomerService.getAllCustomers()
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(customers => {
        this.customers=_.get(customers,'customers',[]);
      });

      this._httpProductService.getAllProducts(true)
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(products => {
        this.products=_.get(products,'products',[]);
        console.log("this.products",this.products);
      });
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
  createCustomerForm(): FormGroup {
    return this._formBuilder.group({
      id: [this.customer.id],
      name: [this.customer.name],
      company_name: [this.customer.company_name],
      email: [this.customer.email],
      phone_number: [this.customer.phone_number],
      address: [this.customer.address],
      city: [this.customer.city],
      state: [this.customer.state],
      postal_code: [this.customer.postal_code],
      country: [this.customer.country],
    });
  }

  /**
   * Save customer
   */
  saveCustomer(): void {
    const data = this.customerForm.getRawValue();
    data.name = data.name;
    data.handle=FuseUtils.handleize(data.name);
    const inputData:Quotation=data;
    const requestPayload: Quotation = {
      ...data
    }
    this._quotationService.saveCustomer(requestPayload)
      .then((response) => {
        // Trigger the subscription with new data
        this._quotationService.onCustomerChanged.next(data);
        this._notificationService.show(response.message,'success');
        
      },(err)=>{
        this._notificationService.show(SNACK_BAR_MSGS.genericError,'error');
      });
  }

  /**
   * Add customer
   */
  addCustomer(): void {
    const data = this.customerForm.getRawValue();
    data.name = data.name;
    data.handle=FuseUtils.handleize(data.name);
    const inputData:Quotation=data;
    const requestPayload: Quotation = {
      ...data
    }
    this._quotationService.addCustomer(requestPayload)
      .then((response) => {        
        // Trigger the subscription with new data
        data.id = response.id;
        this.customerForm.patchValue({ id: response.id });
        this._quotationService.onCustomerChanged.next(data);
        this._notificationService.show(response.message,'success');
        // Change the location with new one
        this._location.go('people/customer/' + this.customer.id + '/' + this.customer.handle);
      },(err)=>{
        this._notificationService.show(SNACK_BAR_MSGS.genericError,'error');
      });
  }
}
