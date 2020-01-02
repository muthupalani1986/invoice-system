import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { BrandComponent } from './brand/brand.component';
import { UnitComponent } from './unit/unit.component';
import { CustomerGroupComponent } from './customer-group/customer-group.component';
import { TaxComponent } from './tax/tax.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgmCoreModule } from '@agm/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components';
import { CustomersService } from './customer-group/customers.service';
import { CustomerService } from './customer-group/customer.service';
import { AddCustomerComponent } from './customer-group/add-customer/add-customer.component';

const routes = [
  {
    path: 'warehouse',
    component: WarehouseComponent
  },
  {
    path: 'brand',
    component: BrandComponent
  },
  {
    path: 'unit',
    component: UnitComponent
  },
  {
    path: 'customer-group',
    component: CustomerGroupComponent,
    resolve: {
      data: CustomersService
    }
  },
  {
    path: 'customer-group/:id',
    component: AddCustomerComponent,
    resolve: {
      data: CustomerService
    }
  },
  {
    path: 'customer-group/:id/:handle',
    component: AddCustomerComponent,
    resolve: {
      data: CustomerService
    }
  },
  {
    path: 'tax',
    component: TaxComponent
  },
  {
    path: '**',
    redirectTo: 'tax'
  }
];

@NgModule({
  declarations: [WarehouseComponent, BrandComponent, UnitComponent, CustomerGroupComponent, TaxComponent, AddCustomerComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule,
    SharedModule,
    NgxChartsModule,
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyD81ecsCj4yYpcXSLFcYU97PvRsE_X8Bx8'
    }),

    FuseSharedModule,
    FuseWidgetModule,
  ],
  providers:[
    CustomersService,
    CustomerService
  ]
})
export class SettingsModule { }
