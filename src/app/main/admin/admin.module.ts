import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NewUserComponent } from './user/new-user/new-user.component';

const routes = [
    {
        path     : 'new-user',
        component: NewUserComponent
    },
    {
        path      : '**',
        redirectTo: 'new-user'
    }
];

@NgModule({
    declarations: [
        NewUserComponent
    ],
    imports     : [
        RouterModule.forChild(routes)
    ]
})
export class AdminModule
{
}
