import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';

import { RainySharedModule } from '../../shared';
import {
    AlbumService,
    AlbumPopupService,
    AlbumComponent,
    AlbumDetailComponent,
    AlbumDialogComponent,
    AlbumPopupComponent,
    AlbumDeletePopupComponent,
    AlbumDeleteDialogComponent,
    albumRoute,
    albumPopupRoute,
} from './';

const ENTITY_STATES = [
    ...albumRoute,
    ...albumPopupRoute,
];

@NgModule({
    imports: [
        RainySharedModule,
        RouterModule.forChild(ENTITY_STATES)
    ],
    declarations: [
        AlbumComponent,
        AlbumDetailComponent,
        AlbumDialogComponent,
        AlbumDeleteDialogComponent,
        AlbumPopupComponent,
        AlbumDeletePopupComponent,
    ],
    entryComponents: [
        AlbumComponent,
        AlbumDialogComponent,
        AlbumPopupComponent,
        AlbumDeleteDialogComponent,
        AlbumDeletePopupComponent,
    ],
    providers: [
        AlbumService,
        AlbumPopupService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RainyAlbumModule {}
