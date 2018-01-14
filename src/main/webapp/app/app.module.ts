import * as $ from 'jquery';

import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ngx-webstorage';

import { RainySharedModule, UserRouteAccessService } from './shared';
import { RainyAppRoutingModule} from './app-routing.module';
import { RainyHomeModule } from './home/home.module';
import { RainyAdminModule } from './admin/admin.module';
import { RainyAccountModule } from './account/account.module';
import { RainyEntityModule } from './entities/entity.module';
import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

// jhipster-needle-angular-add-module-import JHipster will add new module here

/* Material Pro */
import { FlexLayoutModule } from '@angular/flex-layout';
// import { FullComponent } from './layouts/full/full.component';
import { AppHeaderComponent } from './layouts/full/header/header.component';
// import { AppSidebarComponent } from './layouts/full/sidebar/sidebar.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent
} from './layouts';

import { RainyMaterialModule } from './material/rainy-material.module';

@NgModule({
    imports: [
        BrowserModule,
        // Material
        BrowserAnimationsModule,
        // Material
        // LayoutRoutingModule,
        RainyAppRoutingModule,
        Ng2Webstorage.forRoot({ prefix: 'jhi', separator: '-'}),
        RainySharedModule,
        RainyHomeModule,
        RainyAdminModule,
        RainyAccountModule,
        RainyEntityModule,
        // jhipster-needle-angular-add-module JHipster will add new module here

        RainyMaterialModule
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent,
        AppHeaderComponent
       // SpinnerComponent,
       // AppSidebarComponent
    ],
    providers: [
        ProfileService,
        customHttpProvider(),
        PaginationConfig,
        UserRouteAccessService
    ],
    bootstrap: [ JhiMainComponent ]
})
export class RainyAppModule {}
