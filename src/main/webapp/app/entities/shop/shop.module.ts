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
    ShopUserComponent,
    ShopUserNewComponent,
    ShopDeletePopupComponent,
    ShopDeleteDialogComponent,
    shopRoute,
    shopPopupRoute,
    ShopResolvePagingParams,
} from './';

import { RainyMaterialModule } from '../../material/rainy-material.module';
import { AgmCoreModule } from '@agm/core';
import { LoaderService } from './loader.service';
import { LoaderComponent } from './loader.component';

import { QuillModule } from 'ngx-quill';
// import { Ng2ImgMaxModule } from 'ng2-img-max';

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
        HttpClientModule,
        QuillModule,
        // Ng2ImgMaxModule
    ],
    declarations: [
        ShopComponent,
        ShopDetailComponent,
        ShopDialogComponent,
        ShopDeleteDialogComponent,
        ShopPopupComponent,
        ShopDeletePopupComponent,
        ShopUserComponent,
        ShopUserNewComponent,
        LoaderComponent,
    ],
    entryComponents: [
        ShopComponent,
        ShopDialogComponent,
        ShopPopupComponent,
        ShopDeleteDialogComponent,
        ShopDeletePopupComponent,
        ShopUserComponent,
        ShopUserNewComponent,
    ],
    providers: [
        ShopService,
        ShopPopupService,
        ShopResolvePagingParams,
        LoaderService,
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RainyShopModule {}
