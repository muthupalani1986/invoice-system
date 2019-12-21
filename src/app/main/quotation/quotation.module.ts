import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { QuotationListComponent } from './quotation-list/quotation-list.component';
import { NewQuotationComponent } from './new-quotation/new-quotation.component';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: 'list',
    component: QuotationListComponent
  },
  {
    path: 'add',
    component: NewQuotationComponent
  },
  {
    path: '**',
    redirectTo: 'list'
  }
];

@NgModule({
  declarations: [QuotationListComponent, NewQuotationComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class QuotationModule { }
