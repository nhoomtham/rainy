import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule, FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';

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

import { RainyMaterialModule } from '../../material/rainy-material.module';

const ENTITY_STATES = [
    ...shopStatusRoute,
    ...shopStatusPopupRoute,
];

@NgModule({
    imports: [
        FormsModule,
        ReactiveFormsModule,
        RainySharedModule,
        RouterModule.forRoot(ENTITY_STATES, { useHash: true }),
        RainyMaterialModule
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
