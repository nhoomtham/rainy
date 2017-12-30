import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RainySharedModule } from '../../shared';
import { RainyAdminModule } from '../../admin/admin.module';
import {
    UserFavoriteService,
    UserFavoritePopupService,
    UserFavoriteComponent,
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
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        UserFavoriteComponent,
        UserFavoriteDetailComponent,
        UserFavoriteDialogComponent,
        UserFavoriteDeleteDialogComponent,
        UserFavoritePopupComponent,
        UserFavoriteDeletePopupComponent,
    ],
    entryComponents: [
        UserFavoriteComponent,
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
