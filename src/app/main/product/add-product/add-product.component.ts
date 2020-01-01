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
import { HttpCategoryService } from '../../../services/http-category.service';
import * as _ from 'lodash';
import { NotificationService } from '../../../services/notification.service';
import { SNACK_BAR_MSGS } from '../../../constants/notification.constants';
@Component({
    selector: 'add-add-product',
    templateUrl: './add-product.component.html',
    styleUrls: ['./add-product.component.scss'],
    encapsulation: ViewEncapsulation.None,
    animations: fuseAnimations
})
export class AddProductComponent implements OnInit, OnDestroy {
    product: Product;
    categories = [];
    salesUnits = [{ id: 1, name: "Piece" }, { id: 2, name: 'dozen box' }];
    pageType: string;
    productForm: FormGroup;

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
        private _ecommerceProductService: EcommerceProductService,
        private _formBuilder: FormBuilder,
        private _location: Location,
        private _matSnackBar: MatSnackBar,
        private _httpCategoryService: HttpCategoryService,
        private _notificationService: NotificationService,
    ) {
        // Set the default
        this.product = new Product();

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
        // Subscribe to update product on changes
        this._ecommerceProductService.onProductChanged
            .pipe(takeUntil(this._unsubscribeAll))
            .subscribe(product => {

                if (product) {
                    this.product = new Product(product);
                    this.pageType = 'edit';
                }
                else {
                    this.pageType = 'new';
                    this.product = new Product();
                }

                this.productForm = this.createProductForm();
            });

        this._httpCategoryService.getAllCategories().subscribe((data) => {
            const statusCode = _.get(data, 'statusCode');
            if (statusCode === '0000') {
                this.categories = _.get(data, 'categories', []);
            } else {
                this._notificationService.show(SNACK_BAR_MSGS.genericError, 'error');
            }
        }, (error) => {
            this._notificationService.show(SNACK_BAR_MSGS.genericError, 'error');
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
    createProductForm(): FormGroup {
        return this._formBuilder.group({
            id: [this.product.id],
            name: [this.product.name],
            handle: [this.product.handle],
            description: [this.product.description],
            image: [this.product.image],
            buyingPrice: [this.product.buyingPrice],
            sellingPrice: [this.product.sellingPrice],
            taxRate: [this.product.taxRate],
            quantity: [this.product.quantity],
            category: [this.product.category],
            salesUnit: [this.product.salesUnit],
            code: [this.product.code]
        });
    }

    /**
     * Save product
     */
    saveProduct(): void {
        const data = this.productForm.getRawValue();
        data.handle = FuseUtils.handleize(data.name);
        this._ecommerceProductService.saveProduct(data)
            .then((response) => {
                // Trigger the subscription with new data
                this._ecommerceProductService.onProductChanged.next(data);
                this._notificationService.show(response.message, 'success');
            }, (err) => {
                this._notificationService.show(SNACK_BAR_MSGS.genericError, 'error');
            });
    }

    /**
     * Add product
     */
    addProduct(): void {
        const data = this.productForm.getRawValue();
        data.handle = FuseUtils.handleize(data.name);
        data.code = this.generateProductCode(data);
        this._ecommerceProductService.addProduct(data)
            .then((response) => {
                // Trigger the subscription with new data
                data.id = response.id;
                this.productForm.patchValue({ id: response.id });
                this._ecommerceProductService.onProductChanged.next(data);
                this._notificationService.show(response.message, 'success');
                // Change the location with new one
                this._location.go('product/' + this.product.id + '/' + this.product.handle);
            }, (error) => {
                this._notificationService.show(SNACK_BAR_MSGS.genericError, 'error');
            });
    }
    public onImageUpload(evt) {

        var files = evt.target.files;
        var file = files[0];

        if (files && file) {
            var reader = new FileReader();

            reader.onload = this.handleReaderLoaded.bind(this);

            reader.readAsBinaryString(file);
        }
    }
    private generateProductCode(data): string {
        const category = _.find(this.categories, { 'id': data.category });
        const numberOfWords = category.category_name.split(' ');
        if (numberOfWords.length == 1) {
            const catName = category.category_name.substring(0, 3).toUpperCase();
            let code = catName.padEnd(3, 'C');
            return code + '-';
        }
        const matches = category.category_name.match(/\b(\w)/g);
        let code = matches.join('');
        return code.toUpperCase() + '-';
    }
    private handleReaderLoaded(readerEvt) {
        var binaryString = readerEvt.target.result;
        const base64textString = btoa(binaryString);
        this.productForm.patchValue({ image: base64textString });
        this.productForm.controls.image.markAsDirty();
        this.product.image = base64textString;
    }
}
