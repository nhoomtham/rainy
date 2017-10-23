import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

import { RainyShopModule } from './shop/shop.module';
import { RainyAlbumModule } from './album/album.module';
/* jhipster-needle-add-entity-module-import - JHipster will add entity modules imports here */

@NgModule({
    imports: [
        RainyShopModule,
        RainyAlbumModule,
        /* jhipster-needle-add-entity-module - JHipster will add entity modules here */
    ],
    declarations: [],
    entryComponents: [],
    providers: [],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class RainyEntityModule {}
