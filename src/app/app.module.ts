import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { MatMomentDateModule } from '@angular/material-moment-adapter';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { TranslateModule } from '@ngx-translate/core';
import 'hammerjs';

import { FuseModule } from '@fuse/fuse.module';
import { FuseSharedModule } from '@fuse/shared.module';
import { FuseProgressBarModule, FuseSidebarModule, FuseThemeOptionsModule } from '@fuse/components';

import { fuseConfig } from 'app/fuse-config';

import { AppComponent } from 'app/app.component';
import { LayoutModule } from 'app/layout/layout.module';
import { SampleModule } from 'app/main/sample/sample.module';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { SharedModule } from './shared/shared.module';
import { DeleteConfirmationDialogComponent } from 'app/shared/components/delete-confirmation-dialog/delete-confirmation-dialog.component';

const appRoutes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./main/authentication/auth.module').then(mod => mod.AuthModule)
    },
    {
        path: 'dashboard',
        loadChildren: () => import('./main/dashboard/dashboard.module').then(mod => mod.DashboardModule)
    },
    {
        path: 'product',
        loadChildren: () => import('./main/product/product.module').then(mod => mod.ProductModule)
    },
    {
        path: 'quotation',
        loadChildren: () => import('./main/quotation/quotation.module').then(mod => mod.QuotationModule)
    },
    {
        path: 'sales',
        loadChildren: () => import('./main/sales/sales.module').then(mod => mod.SalesModule)
    },
    {
        path: 'people',
        loadChildren: () => import('./main/people/people.module').then(mod => mod.PeopleModule)
    },
    {
        path: 'settings',
        loadChildren: () => import('./main/settings/settings.module').then(mod => mod.SettingsModule)
    },
    {
        path: '**',
        redirectTo: 'auth'
    }
];

@NgModule({
    declarations: [
        AppComponent
    ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        HttpClientModule,
        RouterModule.forRoot(appRoutes, { useHash: true }),

        TranslateModule.forRoot(),

        // Material moment date module
        MatMomentDateModule,

        // Material
        MatButtonModule,
        MatIconModule,

        // Fuse modules
        FuseModule.forRoot(fuseConfig),
        FuseProgressBarModule,
        FuseSharedModule,
        FuseSidebarModule,
        FuseThemeOptionsModule,

        // App modules
        LayoutModule,
        SampleModule,
        MatSnackBarModule,
        SharedModule
    ],
    bootstrap: [
        AppComponent
    ],
    entryComponents:[DeleteConfirmationDialogComponent]
})
export class AppModule {
}
