import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RainySharedModule } from '../../shared';
import { RainyAdminModule } from '../../admin/admin.module';
import { RainyMaterialModule } from '../../material/rainy-material.module';

import {
    UserFavoriteService,
    UserFavoritePopupService,
    UserFavoriteComponent,
    UserFavoriteShopComponent,
    UserFavoriteDetailComponent,
    UserFavoriteDialogComponent,
    UserFavoritePopupComponent,
    UserFavoriteDeletePopupComponent,
    UserFavoriteDeleteDialogComponent,
    userFavoriteRoute,
    userFavoritePopupRoute,
    UserFavoriteResolvePagingParams,
} from './';

const ENTITY_STATES = [
    ...userFavoriteRoute,
    ...userFavoritePopupRoute,
];

@NgModule({
    imports: [
        RainySharedModule,
        RainyAdminModule,
        RouterModule.forChild(ENTITY_STATES),
        RainyMaterialModule
    ],
    declarations: [
        UserFavoriteComponent,
        UserFavoriteShopComponent,
        UserFavoriteDetailComponent,
        UserFavoriteDialogComponent,
        UserFavoriteDeleteDialogComponent,
        UserFavoritePopupComponent,
        UserFavoriteDeletePopupComponent,
    ],
    entryComponents: [
        UserFavoriteComponent,
        UserFavoriteShopComponent,
        UserFavoriteDialogComponent,
        UserFavoritePopupComponent,
        UserFavoriteDeleteDialogComponent,
        UserFavoriteDeletePopupComponent,
    ],
    providers: [
        UserFavoriteService,
        UserFavoritePopupService,
        UserFavoriteResolvePagingParams,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RainyUserFavoriteModule {}
