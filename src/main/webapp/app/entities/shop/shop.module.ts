import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

import { RainySharedModule } from '../../shared';
import { RainyAdminModule } from '../../admin/admin.module';
import {
    ShopService,
    ShopPopupService,
    ShopComponent,
    ShopDetailComponent,
    ShopDialogComponent,
    ShopPopupComponent,
    ShopDeletePopupComponent,
    ShopDeleteDialogComponent,
    shopRoute,
    shopPopupRoute,
    ShopResolvePagingParams,
} from './';

import { RainyMaterialModule } from '../../material/rainy-material.module';

import { AgmCoreModule } from '@agm/core';

const ENTITY_STATES = [
    ...shopRoute,
    ...shopPopupRoute,
];

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        RainySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true }),
        RainyMaterialModule,
        AgmCoreModule.forRoot({
            apiKey: 'AIzaSyBlk6Nxh8iMaKuhuJK_sv3gFhi_aoeK_Kg'
        }),
        HttpClientModule
    ],
    declarations: [
        ShopComponent,
        ShopDetailComponent,
        ShopDialogComponent,
        ShopDeleteDialogComponent,
        ShopPopupComponent,
        ShopDeletePopupComponent,
    ],
    entryComponents: [
        ShopComponent,
        ShopDialogComponent,
        ShopPopupComponent,
        ShopDeleteDialogComponent,
        ShopDeletePopupComponent,
    ],
    providers: [
        ShopService,
        ShopPopupService,
        ShopResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RainyShopModule {}
