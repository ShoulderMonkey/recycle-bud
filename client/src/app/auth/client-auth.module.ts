import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { AuthOptions } from './auth-options';
import { AuthGuard } from './auth.guard';
import { AuthService } from './auth.service';
import { JwtInterceptorService } from './jwt-interceptor.service';
import { HttpClientModule } from '@angular/common/http';

@NgModule({
  declarations: [],
  imports: [CommonModule, HttpClientModule],
  exports: []
})
export class ClientAuthModule {
  static forRoot(options: AuthOptions): ModuleWithProviders<ClientAuthModule> {
    return {
      ngModule: ClientAuthModule,
      providers: [
        { provide: AuthOptions, useValue: options },
        CookieService,
        AuthService,
        JwtInterceptorService,
        AuthGuard
      ]
    };
  }

  static forChild(): ModuleWithProviders<ClientAuthModule> {
    return {
      ngModule: ClientAuthModule,
      providers: [AuthGuard, CookieService, AuthService]
    };
  }
}
