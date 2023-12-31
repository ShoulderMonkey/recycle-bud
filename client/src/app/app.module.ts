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
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ToastrModule } from 'ngx-toastr';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HomeModule } from './home/home.module';
import { ClientAuthModule } from './auth/client-auth.module';
import { MatInputModule } from '@angular/material/input';
import { MatDialogModule } from '@angular/material/dialog';
import { RegisterComponent } from './login/register/register.component';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';
import { JwtInterceptorService } from './auth/jwt-interceptor.service';
import { SharedModule } from './shared/shared.module';
import { RecycledItemModule } from './recycled-item/recycled-item.module';
import { TranslateLoader, TranslateModule, TranslateService } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import {MatMenuModule} from '@angular/material/menu';

const MATERIAL_MODULES = [
  MatIconModule,
  MatToolbarModule,
  MatSidenavModule,
  MatButtonModule,
  MatListModule,
  MatCardModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatMenuModule
]

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}
export const LANGS = ['en', 'it', 'es', 'fr']
@NgModule({
  declarations: [
    AppComponent, 
    FrameComponent, 
    LoginComponent,
    RegisterComponent],
  imports: [
    FormsModule,
    ReactiveFormsModule,
    BrowserModule, 
    RecycledItemModule,
    SharedModule,
    RouterModule.forRoot(appRoutes), 
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      preventDuplicates: true,
      progressBar: true,
      countDuplicates: false,
      extendedTimeOut: 5000,
      positionClass: 'toast-top-right',
    }),
    TranslateModule.forRoot({
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    HomeModule,
    ClientAuthModule.forRoot({
      authCookieName: 'app-auth'
    }),
    MATERIAL_MODULES
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptorService,
      multi: true
    }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(public translate: TranslateService) {
    translate.addLangs(LANGS);
    translate.use('en')
    translate.setDefaultLang('en');
  }
}
