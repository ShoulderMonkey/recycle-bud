import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RecycledItemsListComponent } from './recycled-item/recycled-items-list/recycled-items-list.component';
import { AdminGuard } from './auth/admin.guard';

export const appRoutes: Route[] = [
    { path: "*" ,pathMatch: "full", redirectTo: "home"},
    { path: "home", component: HomeComponent},
    { path: "list", component: RecycledItemsListComponent},
    { path: 'user', loadChildren: () => import('./user/user.module').then(mod => mod.UserModule), canActivate: [AdminGuard] }
];
