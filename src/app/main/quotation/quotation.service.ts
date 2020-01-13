import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';

import { FuseUtils } from '@fuse/utils';
import * as _ from 'lodash';
import { CustomerDetails } from '../../interfaces/customer.interface';
import { HttpCustomerService } from '../../services/http-customer.service';
import { HttpQuotationService } from '../../services/http-quotation.service';
import { Quotation } from './quotation.model';


@Injectable()
export class QuotationService implements Resolve<any>
{
    routeParams: any;
    quotation: Quotation;
    onQuotationChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient,
        private _httpCustomerService: HttpCustomerService,
        private _httpQuotationService:HttpQuotationService
    ) {
        // Set the defaults
        this.onQuotationChanged = new BehaviorSubject({});
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
                this.getQuotation()
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
    getQuotation(): Promise<any> {
        return new Promise((resolve, reject) => {

            if (this.routeParams.id === 'new') {
                this.onQuotationChanged.next(false);
                resolve(false);
            }
            else {
                this._httpQuotationService.getQuotation(this.routeParams.id).subscribe((response: any) => {
                    const quotationResponse = { ...response };
                    const statusCode = _.get(quotationResponse, 'statusCode');
                    if (statusCode === '0000') {
                        this.quotation = _.get(quotationResponse, 'quotation');                        
                        this.onQuotationChanged.next(this.quotation);
                        resolve(response);
                    } else {
                        this.onQuotationChanged.next({});
                        resolve();
                    }

                }, reject);
            }
        });
    }

    /**
     * Save customer
     *
     * @param quotation
     * @returns {Promise<any>}
     */
    saveQuotation(customer): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpQuotationService.saveQuotation(customer).subscribe((response: any) => {
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
     * Add quotation
     *
     * @param customer
     * @returns {Promise<any>}
     */
    addQuotation(quotation): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpQuotationService.addQuotation(quotation).subscribe((response: any) => {
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
     * Delete quotation
     *
     * @param quotation
     * @returns {Promise<any>}
     */
    deleteQuotation(quotation): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpQuotationService.deleteQuotation(quotation).subscribe((response: any) => {
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
     * Download quotation
     *
     * @param quotation
     * @returns {Promise<any>}
     */
    downloadInvoice(id): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpQuotationService.downloadInvoice(id).subscribe((response: any) => {
                resolve();           
            }, reject);
            
        });
    }
}
