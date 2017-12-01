import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

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

const ENTITY_STATES = [
    ...shopRoute,
    ...shopPopupRoute,
];

@NgModule({
    imports: [
        RainySharedModule,
        RainyAdminModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true })
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
