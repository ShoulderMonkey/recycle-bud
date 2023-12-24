import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home.component';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

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
    CommonModule,
    MATERIAL_MODULES
  ]
})
export class HomeModule { }
