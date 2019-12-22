import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category/category.component';
import { ProductListComponent } from './product-list/product-list.component';
import { AddProductComponent } from './add-product/add-product.component';
import { RouterModule, Routes } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatChipsModule } from '@angular/material/chips';
import { MatRippleModule } from '@angular/material/core';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSelectModule } from '@angular/material/select';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTabsModule } from '@angular/material/tabs';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgmCoreModule } from '@agm/core';

import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components/widget/widget.module';
import { EcommerceProductsService } from 'app/main/product/products.service';
import { EcommerceProductService } from 'app/main/product/add-product/product.service';
import { CategoryService } from 'app/main/product/category/category.service';
import { CategoriesService } from 'app/main/product/categories.service';
import { AddCategoryComponent } from './add-category/add-category.component';
import { SharedModule } from '../../shared/shared.module';


const routes = [
  {
    path: 'category/list',
    component: CategoryComponent,
    resolve: {
      data: CategoriesService
    }
  },
  {
    path: 'category/:id',
    component: AddCategoryComponent,
    resolve: {
      data: CategoryService
    }
  },
  {
    path: 'category/:id/:handle',
    component: AddCategoryComponent,
    resolve: {
      data: CategoryService
    }
  },
  {
    path: 'list',
    component: ProductListComponent,
    resolve: {
      data: EcommerceProductsService
    }
  },
  {
    path: ':id',
    component: AddProductComponent,
    resolve: {
      data: EcommerceProductService
    }
  },
  {
    path: ':id/:handle',
    component: AddProductComponent,
    resolve: {
      data: EcommerceProductService
    }
  },
  {
    path: '**',
    redirectTo: 'list'
  }
];

@NgModule({
  declarations: [CategoryComponent, ProductListComponent, AddProductComponent, AddCategoryComponent],
  imports: [
    RouterModule.forChild(routes),
    SharedModule,
    NgxChartsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8'
    }),

    FuseSharedModule,
    FuseWidgetModule,
  ],
  providers: [
    EcommerceProductsService,
    EcommerceProductService,
    CategoryService,
    CategoriesService
  ]
})
export class ProductModule { }
