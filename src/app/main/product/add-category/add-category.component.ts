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
import { CategoryService } from 'app/main/product/category/category.service';
import { Category } from '../category/category.model';


@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.scss'],
  encapsulation: ViewEncapsulation.None,
  animations: fuseAnimations
})
export class AddCategoryComponent implements OnInit, OnDestroy {
  category: Category;
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
    private _categoryService: CategoryService,
    private _formBuilder: FormBuilder,
    private _location: Location,
    private _matSnackBar: MatSnackBar
  ) {
    // Set the default
    this.category = new Category();

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
    this._categoryService.onCategoryChanged
      .pipe(takeUntil(this._unsubscribeAll))
      .subscribe(category => {

        if (category) {
          this.category = new Category(category);
          this.pageType = 'edit';
        }
        else {
          this.pageType = 'new';
          this.category = new Category();
        }

        this.productForm = this.createProductForm();
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
      id: [this.category.id],
      name: [this.category.name]
    });
  }

  /**
   * Save product
   */
  saveProduct(): void {
    const data = this.productForm.getRawValue();
    data.handle = FuseUtils.handleize(data.name);

    this._categoryService.saveCategory(data)
      .then(() => {

        // Trigger the subscription with new data
        this._categoryService.onCategoryChanged.next(data);

        // Show the success message
        this._matSnackBar.open('Product saved', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });
      });
  }

  /**
   * Add product
   */
  addProduct(): void {
    const data = this.productForm.getRawValue();
    data.handle = FuseUtils.handleize(data.name);

    this._categoryService.addProduct(data)
      .then(() => {

        // Trigger the subscription with new data
        this._categoryService.onCategoryChanged.next(data);

        // Show the success message
        this._matSnackBar.open('Product added', 'OK', {
          verticalPosition: 'top',
          duration: 2000
        });

        // Change the location with new one
        this._location.go('product/category/' + this.category.id + '/' + this.category.name);
      });
  }
}
