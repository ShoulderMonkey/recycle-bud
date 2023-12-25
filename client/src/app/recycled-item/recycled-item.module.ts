import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecycledItemsListComponent } from './recycled-items-list/recycled-items-list.component';
import { SharedModule } from '../shared/shared.module';



@NgModule({
  declarations: [
    RecycledItemsListComponent
  ],
  imports: [
    CommonModule,
    SharedModule
  ]
})
export class RecycledItemModule { }
