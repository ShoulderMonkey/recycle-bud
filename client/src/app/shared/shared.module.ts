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
import { DataTableComponent } from './data-table/data-table.component';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatTooltipModule } from '@angular/material/tooltip';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { RouterModule } from '@angular/router';

export const MATERIAL_MODULES = [
  MatDialogModule,
  MatButtonModule,
  MatIconModule,
  MatFormFieldModule,
  MatInputModule,
  MatSelectModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatTooltipModule,
  MatProgressSpinnerModule
]

@NgModule({
  declarations: [
    RecycledItemDetailModalComponent,
    DataTableComponent
  ],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    MATERIAL_MODULES
  ]
})
export class SharedModule { }
