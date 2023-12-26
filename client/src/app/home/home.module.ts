import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';

export const MATERIAL_MODULES = [
  MatCardModule,
  MatIconModule,
  MatButtonModule
]

@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    TranslateModule,
    CommonModule,
    SharedModule,
    MATERIAL_MODULES
  ]
})
export class HomeModule { }
