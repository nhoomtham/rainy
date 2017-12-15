import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RainySharedModule } from '../../shared';
import {
    ShopStatusService,
    ShopStatusPopupService,
    ShopStatusComponent,
    ShopStatusDetailComponent,
    ShopStatusDialogComponent,
    ShopStatusPopupComponent,
    ShopStatusDeletePopupComponent,
    ShopStatusDeleteDialogComponent,
    shopStatusRoute,
    shopStatusPopupRoute,
    ShopStatusResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...shopStatusRoute,
    ...shopStatusPopupRoute,
];

@NgModule({
    imports: [
        RainySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        ShopStatusComponent,
        ShopStatusDetailComponent,
        ShopStatusDialogComponent,
        ShopStatusDeleteDialogComponent,
        ShopStatusPopupComponent,
        ShopStatusDeletePopupComponent,
    ],
    entryComponents: [
        ShopStatusComponent,
        ShopStatusDialogComponent,
        ShopStatusPopupComponent,
        ShopStatusDeleteDialogComponent,
        ShopStatusDeletePopupComponent,
    ],
    providers: [
        ShopStatusService,
        ShopStatusPopupService,
        ShopStatusResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RainyShopStatusModule {}
