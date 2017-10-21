import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatTabsModule } from '@angular/material';
import { MatCardModule, MatListModule, MatGridListModule} from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatListModule, MatGridListModule,
            MatTabsModule
            ],
  exports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatListModule, MatGridListModule,
            MatTabsModule
            ],
})
export class RainyMaterialModule { }
