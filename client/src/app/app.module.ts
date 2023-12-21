import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { appRoutes } from './app.routes';
import { FrameComponent } from './frame/frame.component';
import { LoginComponent } from './login/login.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatButtonModule } from '@angular/material/button';
import { MatListModule } from '@angular/material/list';

const MATERIAL_MODULES = [
  MatIconModule,
  MatToolbarModule,
  MatSidenavModule,
  MatButtonModule,
  MatListModule
]

@NgModule({
  declarations: [
    AppComponent, 
    FrameComponent, 
    LoginComponent],
  imports: [
    BrowserModule, 
    RouterModule.forRoot(appRoutes), 
    BrowserAnimationsModule,

    MATERIAL_MODULES
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
