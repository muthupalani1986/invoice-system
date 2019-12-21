import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesListComponent } from './sales-list/sales-list.component';
import { AddSalesComponent } from './add-sales/add-sales.component';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: 'list',
    component: SalesListComponent
  },
  {
    path: 'add',
    component: AddSalesComponent
  },
  {
    path: '**',
    redirectTo: 'list'
  }
];


@NgModule({
  declarations: [SalesListComponent, AddSalesComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class SalesModule { }
