import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpProductService } from '../../services/http-product.service';

@Injectable()
export class EcommerceProductsService implements Resolve<any>
{
    products: any[];
    onProductsChanged: BehaviorSubject<any>;

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
        this.onProductsChanged = new BehaviorSubject({});
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
                this.getProducts()
            ]).then(
                () => {
                    resolve();
                },
                reject
            );
        });
    }

    /**
     * Get products
     *
     * @returns {Promise<any>}
     */
    getProducts(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpProductService.getAllProducts().subscribe((res) => {
                this.products = res.products;
                this.onProductsChanged.next(this.products);
                resolve(this.products);
            }, reject);
        });
    }
        /**
     * Delete category
     *
     * @param category
     * @returns {Promise<any>}
     */
    deleteProduct(category): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpProductService.deleteProduct(category).subscribe((response: any) => {
                resolve(response);               
            }, reject)
            
        });
    }
}
