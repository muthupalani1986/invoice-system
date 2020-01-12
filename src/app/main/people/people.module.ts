import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { AddUserComponent } from './add-user/add-user.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { RouterModule } from '@angular/router';
import { CustomerComponent } from './customer/customer.component';
import { SharedModule } from '../../shared/shared.module';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { AgmCoreModule } from '@agm/core';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseWidgetModule } from '@fuse/components';
import { CustomersService } from './customer/customers.service';
import { CustomerService } from './customer/customer.service';
import { AddCustomerComponent } from './customer/add-customer/add-customer.component';
import { AuthGuard } from '../../shared/auth.guard';


const routes = [
  {
    path: 'user-list',
    component: UserListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-user',
    component: AddUserComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'customer-list',
    component: CustomerListComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'add-customer',
    component: AddCustomerComponent
  },
  {
    path: 'customer',
    component: CustomerComponent,
    resolve: {
      data: CustomersService
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'customer/:id',
    component: AddCustomerComponent,
    resolve: {
      data: CustomerService
    },
    canActivate: [AuthGuard]
  },
  {
    path: 'customer/:id/:handle',
    component: AddCustomerComponent,
    resolve: {
      data: CustomerService
    },
    canActivate: [AuthGuard]
  },
  {
    path: '**',
    redirectTo: 'customer'
  }
];

@NgModule({
  declarations: [UserListComponent, AddUserComponent, CustomerListComponent, AddCustomerComponent, CustomerComponent],
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
  providers: [
    CustomersService,
    CustomerService
  ]
})
export class PeopleModule { }
