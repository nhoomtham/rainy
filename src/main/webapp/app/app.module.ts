import './vendor.ts';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Ng2Webstorage } from 'ngx-webstorage';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';

import { RainySharedModule, UserRouteAccessService } from './shared';
import { RainyAppRoutingModule} from './app-routing.module';
import { RainyHomeModule } from './home/home.module';
import { RainyAdminModule } from './admin/admin.module';
import { RainyAccountModule } from './account/account.module';
import { RainyEntityModule } from './entities/entity.module';

import { MaterialModule } from './material/material.module';

import { customHttpProvider } from './blocks/interceptor/http.provider';
import { PaginationConfig } from './blocks/config/uib-pagination.config';

// jhipster-needle-angular-add-module-import JHipster will add new module here

import {
    JhiMainComponent,
    NavbarComponent,
    FooterComponent,
    ProfileService,
    PageRibbonComponent,
    ActiveMenuDirective,
    ErrorComponent
} from './layouts';

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

        MaterialModule,
    ],
    declarations: [
        JhiMainComponent,
        NavbarComponent,
        ErrorComponent,
        PageRibbonComponent,
        ActiveMenuDirective,
        FooterComponent
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
