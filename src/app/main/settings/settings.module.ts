import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { BrandComponent } from './brand/brand.component';
import { UnitComponent } from './unit/unit.component';
import { CustomerGroupComponent } from './customer-group/customer-group.component';
import { TaxComponent } from './tax/tax.component';
import { RouterModule } from '@angular/router';

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
    component: CustomerGroupComponent
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
  declarations: [WarehouseComponent, BrandComponent, UnitComponent, CustomerGroupComponent, TaxComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class SettingsModule { }
