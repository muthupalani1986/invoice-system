import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { FuseUtils } from '@fuse/utils';
import * as _ from 'lodash';
import { CustomerDetails } from '../../interfaces/customer.interface';
import { HttpCustomerService } from '../../services/http-customer.service';


@Injectable()
export class QuotationService implements Resolve<any>
{
    routeParams: any;
    customer: CustomerDetails;
    onCustomerChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient,
        private _httpCustomerService: HttpCustomerService
    ) {
        // Set the defaults
        this.onCustomerChanged = new BehaviorSubject({});
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        this.routeParams = route.params;

        return new Promise((resolve, reject) => {

            Promise.all([
                this.getCustomer()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get Customer
     *
     * @returns {Promise<any>}
     */
    getCustomer(): Promise<any> {
        return new Promise((resolve, reject) => {

            if (this.routeParams.id === 'new') {
                this.onCustomerChanged.next(false);
                resolve(false);
            }
            else {
                this._httpCustomerService.getCustomer(this.routeParams.id).subscribe((response: any) => {
                    const customerResponse = { ...response };
                    const statusCode = _.get(customerResponse, 'statusCode');
                    if (statusCode === '0000') {
                        this.customer = _.get(customerResponse, 'customer');
                        this.customer.handle = FuseUtils.handleize(this.customer.name);
                        this.onCustomerChanged.next(this.customer);
                        resolve(response);
                    } else {
                        this.onCustomerChanged.next({});
                        resolve();
                    }

                }, reject);
            }
        });
    }

    /**
     * Save customer
     *
     * @param customer
     * @returns {Promise<any>}
     */
    saveCustomer(customer): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpCustomerService.saveCustomer(customer).subscribe((response: any) => {
                const statusCode = _.get(response, 'statusCode', '404');
                if (statusCode === '0000'){
                    resolve(response);
                }else{
                    reject();
                }                
            }, reject);
            
        });
    }

    /**
     * Add customer
     *
     * @param customer
     * @returns {Promise<any>}
     */
    addCustomer(customer): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpCustomerService.addCustomer(customer).subscribe((response: any) => {
                const statusCode = _.get(response, 'statusCode', '404');
                if (statusCode === '0000'){
                    resolve(response);
                }else{
                    reject();
                }
            }, reject);
        });
    }

    /**
     * Delete customer
     *
     * @param customer
     * @returns {Promise<any>}
     */
    deleteCustomer(category): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpCustomerService.deleteCustomer(category).subscribe((response: any) => {
                const statusCode = _.get(response, 'statusCode', '404');
                if (statusCode === '0000'){
                    resolve(response);
                }else{
                    reject();
                }                
            }, reject);
            
        });
    }
}
