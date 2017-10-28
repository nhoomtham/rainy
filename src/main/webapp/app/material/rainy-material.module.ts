import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatTabsModule, MatIconModule } from '@angular/material';
import { MatCardModule, MatListModule, MatGridListModule, MatInputModule} from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatListModule, MatGridListModule,
      MatTabsModule, MatInputModule, MatIconModule
            ],
  exports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatListModule, MatGridListModule,
      MatTabsModule, MatInputModule, MatIconModule
            ],
})
export class RainyMaterialModule { }
