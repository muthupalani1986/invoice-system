import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpCategoryService } from '../../services/http-category.service';


@Injectable()
export class CategoriesService implements Resolve<any>
{
    categories: any[];
    onCategoriesChanged: BehaviorSubject<any>;

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
        this.onCategoriesChanged = new BehaviorSubject({});
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
                this.getCategories()
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
    getCategories(): Promise<any> {
        return new Promise((resolve, reject) => {
            this._httpCategoryService.getAllCategories().subscribe((data) => {
                this.categories = data.categories;
                this.onCategoriesChanged.next(this.categories);
                resolve(this.categories);
            },reject);            
        });
    }
}
