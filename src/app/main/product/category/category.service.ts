import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpCategoryService } from '../../../services/http-category.service';
import { GetCategoryResponse, CategoryDetails } from '../../../interfaces/category.interface';
import { FuseUtils } from '@fuse/utils';
import * as _ from 'lodash';


@Injectable()
export class CategoryService implements Resolve<any>
{
    routeParams: any;
    category: CategoryDetails;
    onCategoryChanged: BehaviorSubject<any>;

    /**
     * Constructor
     *
     * @param {HttpClient} _httpClient
     */
    constructor(
        private _httpClient: HttpClient,
        private _httpCategoryService: HttpCategoryService
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
                this._httpCategoryService.getCategory(this.routeParams.id).subscribe((response: GetCategoryResponse) => {
                    const categoryResponse = { ...response };
                    const statusCode = _.get(categoryResponse, 'statusCode');
                    if (statusCode === '0000') {
                        this.category = _.get(categoryResponse, 'category');
                        this.category.handle = FuseUtils.handleize(this.category.category_name);
                        this.onCategoryChanged.next(this.category);
                        resolve(response);
                    } else {
                        this.onCategoryChanged.next({});
                        resolve();
                    }

                }, reject);
            }
        });
    }

    /**
     * Save category
     *
     * @param category
     * @returns {Promise<any>}
     */
    saveCategory(category): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpCategoryService.saveCategory(category).subscribe((response: any) => {
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
     * Add category
     *
     * @param category
     * @returns {Promise<any>}
     */
    addCategory(category): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpCategoryService.addCategory(category).subscribe((response: any) => {
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
     * Delete category
     *
     * @param category
     * @returns {Promise<any>}
     */
    deleteCategory(category): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpCategoryService.deleteCategory(category).subscribe((response: any) => {
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
