import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecycledItemsListComponent } from './recycled-items-list/recycled-items-list.component';
import { SharedModule } from '../shared/shared.module';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TranslateModule } from '@ngx-translate/core';

const MATERIAL_MODULES = [
  MatIconModule,
  MatButtonModule
]

@NgModule({
  declarations: [
    RecycledItemsListComponent
  ],
  imports: [
    TranslateModule,
    CommonModule,
    SharedModule,
    MATERIAL_MODULES
  ]
})
export class RecycledItemModule { }
