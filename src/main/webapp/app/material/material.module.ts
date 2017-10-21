import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { RouterModule } from '@angular/router';
import { RainyMaterialModule} from './rainy-material.module';

import { RainySharedModule } from '../shared';

import { MATERIAL_ROUTE, MaterialComponent } from './';

@NgModule({
    imports: [
        RainySharedModule,
        RouterModule.forRoot([ MATERIAL_ROUTE ], { useHash: true }),
        RainyMaterialModule
    ],
    declarations: [
        MaterialComponent,
    ],
    entryComponents: [
    ],
    providers: [
    ],
    schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MaterialModule {}
