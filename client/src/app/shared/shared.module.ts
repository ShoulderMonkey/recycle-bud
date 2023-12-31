import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSelectModule } from '@angular/material/select';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTooltipModule } from '@angular/material/tooltip';
import { RouterModule } from '@angular/router';
import { RecycledItemDetailModalComponent } from './recycled-item-detail-modal/recycled-item-detail-modal.component';
import { DataTableComponent } from './data-table/data-table.component';
import { TranslateModule } from '@ngx-translate/core';

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
    TranslateModule,
    FormsModule,
    ReactiveFormsModule,
    CommonModule,
    RouterModule,
    DatePipe,
    MATERIAL_MODULES
  ],
  exports: [
    RecycledItemDetailModalComponent,
    DataTableComponent
  ],
  providers: [
    DatePipe
  ]
})
export class SharedModule { }
