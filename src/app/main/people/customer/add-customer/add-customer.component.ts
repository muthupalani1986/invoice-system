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
import { Customer } from '../customer.model';
import { CustomerService } from '../customer.service';
import { NotificationService } from '../../../../services/notification.service';
import { SNACK_BAR_MSGS } from '../../../../constants/notification.constants';
import { CustomerRequestPayload } from '../../../../interfaces/customer.interface';
@Component({
  selector: 'app-add-customer',
  templateUrl: './add-customer.component.html',
  styleUrls: ['./add-customer.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class AddCustomerComponent implements OnInit, OnDestroy {
  customer: Customer;
  pageType: string;
  customerForm: FormGroup;

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
    private _customerService: CustomerService,
    private _formBuilder: FormBuilder,
    private _location: Location,
    private _matSnackBar: MatSnackBar,
    private _notificationService:NotificationService
  ) {
    // Set the default
    this.customer = new Customer();

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
    
    this._customerService.onCustomerChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(customer => {        
        if (customer) {
          const isValidData=_.get(customer,'name','404'); 
          if(isValidData==='404'){
            this._notificationService.show(SNACK_BAR_MSGS.genericError,'error');
          }         
          this.customer = new Customer(customer);
          this.pageType = 'edit';
        }
        else {
          this.pageType = 'new';
          this.customer = new Customer();
        }

        this.customerForm = this.createCustomerForm();
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
    const inputData:Customer=data;
    const requestPayload: Customer = {
      ...data
    }
    this._customerService.saveCustomer(requestPayload)
      .then((response) => {
        // Trigger the subscription with new data
        this._customerService.onCustomerChanged.next(data);
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
    const inputData:Customer=data;
    const requestPayload: Customer = {
      ...data
    }
    this._customerService.addCustomer(requestPayload)
      .then((response) => {        
        // Trigger the subscription with new data
        data.id = response.id;
        this.customerForm.patchValue({ id: response.id });
        this._customerService.onCustomerChanged.next(data);
        this._notificationService.show(response.message,'success');
        // Change the location with new one
        this._location.go('people/customer/' + this.customer.id + '/' + this.customer.handle);
      },(err)=>{
        this._notificationService.show(SNACK_BAR_MSGS.genericError,'error');
      });
  }
}
