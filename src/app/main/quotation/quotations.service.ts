import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpCustomerService } from '../../services/http-customer.service';
import { Quotation } from './quotation.model';
import { HttpQuotationService } from '../../services/http-quotation.service';
import * as _ from 'lodash';

@Injectable()
export class QuotationsService implements Resolve<any>
{
    quotations: Quotation[];
    onQuotationsChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient,        
        private _HttpQuotationService:HttpQuotationService
    ) {
        // Set the defaults
        this.onQuotationsChanged = new BehaviorSubject({});
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
                this.getQuotations()
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
    getQuotations(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._HttpQuotationService.getAllQuotations().subscribe((data) => {
                const statusCode=_.get(data,'statusCode','404');
                if(statusCode==='0000'){                    
                    this.quotations = _.get(data,'quotations',[]);
                    this.onQuotationsChanged.next(this.quotations);
                    resolve(this.quotations);
                }else{
                    reject()
                }
                
            }, reject);            
        });
    }
}
