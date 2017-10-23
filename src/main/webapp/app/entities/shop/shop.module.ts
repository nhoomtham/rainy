import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RainySharedModule } from '../../shared';
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

const ENTITY_STATES = [
    ...shopRoute,
    ...shopPopupRoute,
];

@NgModule({
    imports: [
        RainySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true }),
        RainyMaterialModule
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
