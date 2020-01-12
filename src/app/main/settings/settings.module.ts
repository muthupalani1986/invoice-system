import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { WarehouseComponent } from './warehouse/warehouse.component';
import { BrandComponent } from './brand/brand.component';
import { UnitComponent } from './unit/unit.component';
import { TaxComponent } from './tax/tax.component';
import { RouterModule } from '@angular/router';
import { SharedModule } from '../../shared/shared.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgmCoreModule } from '@agm/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components';

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
    path: 'tax',
    component: TaxComponent
  },
  {
    path: '**',
    redirectTo: 'tax'
  }
];

@NgModule({
  declarations: [WarehouseComponent, BrandComponent, UnitComponent, TaxComponent],
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
  ]
})
export class SettingsModule { }
