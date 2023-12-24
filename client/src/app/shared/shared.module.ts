import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecycledItemDetailModalComponent } from './recycled-item-detail-modal/recycled-item-detail-modal.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import {MatSelectModule} from '@angular/material/select';

export const MATERIAL_MODULES = [
  MatDialogModule,
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule
]

@NgModule({
  declarations: [
    RecycledItemDetailModalComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    MATERIAL_MODULES
  ]
})
export class SharedModule { }
