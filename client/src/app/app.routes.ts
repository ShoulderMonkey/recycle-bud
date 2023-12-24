import { Route } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RecycledItemsListComponent } from './recycled-item/recycled-items-list/recycled-items-list.component';

export const appRoutes: Route[] = [
    { path: "*" ,pathMatch: "full", redirectTo: "home"},
    { path: "home", component: HomeComponent},
    { path: "list", component: RecycledItemsListComponent}
];
