import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { AddUserComponent } from './add-user/add-user.component';
import { CustomerListComponent } from './customer-list/customer-list.component';
import { AddCustomerComponent } from './add-customer/add-customer.component';
import { RouterModule } from '@angular/router';

const routes = [
  {
    path: 'user-list',
    component: UserListComponent
  },
  {
    path: 'add-user',
    component: AddUserComponent
  },
  {
    path: 'customer-list',
    component: CustomerListComponent
  },
  {
    path: 'add-customer',
    component: AddCustomerComponent
  },
  {
    path: '**',
    redirectTo: 'user-list'
  }
];

@NgModule({
  declarations: [UserListComponent, AddUserComponent, CustomerListComponent, AddCustomerComponent],
  imports: [
    RouterModule.forChild(routes),
    CommonModule
  ]
})
export class PeopleModule { }
