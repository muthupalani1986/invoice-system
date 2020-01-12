import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpCustomerService } from '../../services/http-customer.service';


@Injectable()
export class QuotationsService implements Resolve<any>
{
    customers: any[];
    onCustomersChanged: BehaviorSubject<any>;

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
        this.onCustomersChanged = new BehaviorSubject({});
    }

    /**
     * Resolver
     *
     * @param {ActivatedRouteSnapshot} route
     * @param {RouterStateSnapshot} state
     * @returns {Observable<any> | Promise<any> | any}
     */
    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
        return new Promise((resolve, reject) => {

            Promise.all([
                this.getCustomers()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get Customers
     *
     * @returns {Promise<any>}
     */
    getCustomers(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpCustomerService.getAllCustomers().subscribe((data) => {
                this.customers = data.customers;
                this.onCustomersChanged.next(this.customers);
                resolve(this.customers);
            }, reject);            
        });
    }
}
