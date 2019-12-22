import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpCategoryService } from '../../../services/http-category.service';


@Injectable()
export class CategoryService implements Resolve<any>
{
    routeParams: any;
    category: any;
    onCategoryChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient,
        private _httpCategoryService: HttpCategoryService,
    ) {
        // Set the defaults
        this.onCategoryChanged = new BehaviorSubject({});
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
                this.getCategory()
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
    getCategory(): Promise<any> {
        return new Promise((resolve, reject) => {

            if (this.routeParams.id === 'new') {
                this.onCategoryChanged.next(false);
                resolve(false);
            }
            else {
                this.category = { "id": "1", "category_name": "Test" }
                this.onCategoryChanged.next(this.category);
                resolve(this.category);
                /*this._httpClient.get('api/e-commerce-products/' + this.routeParams.id)
                    .subscribe((response: any) => {
                        this.product = response;
                        this.onProductChanged.next(this.product);
                        resolve(response);
                    }, reject);*/
            }
        });
    }

    /**
     * Save category
     *
     * @param product
     * @returns {Promise<any>}
     */
    saveCategory(category): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpCategoryService.saveCategory(category).subscribe((response: any) => {
                resolve(response);
            }, reject)
            /*
            this._httpClient.post('api/e-commerce-products/' + category.id, category)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);*/
        });
    }

    /**
     * Add category
     *
     * @param category
     * @returns {Promise<any>}
     */
    addCategory(category): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpCategoryService.addCategory(category).subscribe((response: any) => {
                resolve(response);
            }, reject)
            /*
            this._httpClient.post('api/e-commerce-products/', category)
                .subscribe((response: any) => {
                    resolve(response);
                }, reject);*/
        });
    }
}
