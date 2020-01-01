import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpProductService } from '../../../services/http-product.service';
import * as _ from 'lodash';
import { FuseUtils } from '@fuse/utils';
@Injectable()
export class EcommerceProductService implements Resolve<any>
{
    routeParams: any;
    product: any;
    onProductChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient,
        private _httpProductService: HttpProductService
    ) {
        // Set the defaults
        this.onProductChanged = new BehaviorSubject({});
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
                this.getProduct()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get product
     *
     * @returns {Promise<any>}
     */
    getProduct(): Promise<any> {
        return new Promise((resolve, reject) => {

            if (this.routeParams.id === 'new') {
                this.onProductChanged.next(false);
                resolve(false);
            }
            else {

                this._httpProductService.getProduct(this.routeParams.id).subscribe((res) => {
                    this.product = res.product;
                    this.product.handle = FuseUtils.handleize(this.product.name);
                    this.onProductChanged.next(this.product);
                    resolve(res);
                }, reject);

            }
        });
    }

    /**
     * Save product
     *
     * @param product
     * @returns {Promise<any>}
     */
    saveProduct(product): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpProductService.saveProduct(product).subscribe((res) => {
                const statusCode = _.get(res, 'statusCode');
                if (statusCode === '0000') {
                    resolve(res);
                } else {
                    reject(res);
                }
            }, reject);
        });
    }

    /**
     * Add product
     *
     * @param product
     * @returns {Promise<any>}
     */
    addProduct(product): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpProductService.addProduct(product).subscribe((res) => {
                const statusCode = _.get(res, 'statusCode');
                if (statusCode === '0000') {
                    resolve(res);
                } else {
                    reject(res);
                }
            }, reject);
        });
    }
}
