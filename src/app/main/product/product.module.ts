import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CategoryComponent } from './category/category.component';
import { ProductListComponent } from './product-list/product-list.component';
import { AddProductComponent } from './add-product/add-product.component';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: 'category',
    component: CategoryComponent
  },
  {
    path: 'list',
    component: ProductListComponent
  },
  {
    path: 'add',
    component: AddProductComponent
  },
  {
    path: '**',
    redirectTo: 'list'
  }
];

@NgModule({
  declarations: [CategoryComponent, ProductListComponent, AddProductComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class ProductModule { }
