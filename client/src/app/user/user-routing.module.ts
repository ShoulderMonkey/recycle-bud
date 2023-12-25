import { NgModule } from '@angular/core';
import { Route, RouterModule } from '@angular/router';
import { UserListComponent } from './user-list/user-list.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserResolverService } from './user-detail/user-resolver.service';


const ROUTES: Route[] = [
    { path: '', component: UserListComponent },
    { path: 'new', component: UserDetailComponent},
    { path: ':id', component: UserDetailComponent, resolve: { user: UserResolverService }}
];

@NgModule({
  imports: [RouterModule.forChild(ROUTES)],
  exports: [RouterModule]
})
export class UserRoutingModule { }