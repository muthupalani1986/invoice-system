import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SalesListComponent } from './sales-list/sales-list.component';
import { AddSalesComponent } from './add-sales/add-sales.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgmCoreModule } from '@agm/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components';
import { QuotationService } from '../quotation/quotation.service';
import { QuotationsService } from '../quotation/quotations.service';
import { AuthGuard } from '../../shared/auth.guard';

const routes = [
  {
    path: 'sales',
    component: SalesListComponent,
    resolve: {
      data: QuotationsService
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'sales/:id',
    component: AddSalesComponent,
    resolve: {
      data: QuotationService
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'sales/:id/:handle',
    component: AddSalesComponent,
    resolve: {
      data: QuotationService
    },
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'sales'
  }
];


@NgModule({
  declarations: [AddSalesComponent,SalesListComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    NgxChartsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8'
    }),
    FuseSharedModule,
    FuseWidgetModule
  ],
  providers: [
    QuotationService,
    QuotationsService
  ]
})
export class SalesModule { }
