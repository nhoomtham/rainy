import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { MatButtonModule, MatCheckboxModule, MatTabsModule, MatIconModule } from '@angular/material';
import { MatCardModule, MatListModule, MatGridListModule, MatInputModule } from '@angular/material';
import { MatRadioModule, MatSelectModule, MatFormFieldModule, MatProgressSpinnerModule} from '@angular/material';

@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatListModule, MatGridListModule,
      MatTabsModule, MatInputModule, MatIconModule, MatRadioModule, MatSelectModule, MatFormFieldModule,
        MatProgressSpinnerModule],
  exports: [MatButtonModule, MatCheckboxModule, MatCardModule, MatListModule, MatGridListModule,
      MatTabsModule, MatInputModule, MatIconModule, MatRadioModule, MatSelectModule, MatFormFieldModule,
      MatProgressSpinnerModule],
})
export class RainyMaterialModule { }
