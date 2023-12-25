import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UserListComponent } from './user-list/user-list.component';
import { UserRoutingModule } from './user-routing.module';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserResolverService } from './user-detail/user-resolver.service';
import { SharedModule } from '../shared/shared.module';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';

const MATERIAL_MODULES = [
  MatIconModule,
  MatButtonModule,
  MatFormFieldModule,
  MatInputModule,
  MatCardModule
]

@NgModule({
  declarations: [
    UserListComponent,
    UserDetailComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    MATERIAL_MODULES
  ],
  providers: [UserResolverService]
})
export class UserModule { }
