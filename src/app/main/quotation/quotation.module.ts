import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { QuotationComponent } from './quotation.component';

import { AuthGuard } from '../../shared/auth.guard';
import { AddQuotationComponent } from './add-quotation/add-quotation.component';

import { SharedModule } from '../../shared/shared.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgmCoreModule } from '@agm/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components';
import { QuotationsService } from './quotations.service';
import { QuotationService } from './quotation.service';


const routes = [
  {
    path: 'quotation',
    component: QuotationComponent,
    resolve: {
      data: QuotationsService
    },
    canActivate:[AuthGuard]
  },
  {
    path: 'quotation/:id',
    component: AddQuotationComponent,
    resolve: {
      data: QuotationService
    },
    canActivate:[AuthGuard]
  },
  {
    path: 'quotation/:id/:handle',
    component: AddQuotationComponent,
    resolve: {
      data: QuotationService
    },
    canActivate:[AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'quotation'
  }
];

@NgModule({
  declarations: [AddQuotationComponent,QuotationComponent],
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
  providers:[
    QuotationService,
    QuotationsService
  ]
})
export class QuotationModule { }
