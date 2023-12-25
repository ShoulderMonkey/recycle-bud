import { CommonModule } from '@angular/common';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';

import { AuthOptions } from './auth-options';
import { AuthService } from './auth.service';
import { JwtInterceptorService } from './jwt-interceptor.service';
import { HttpClientModule } from '@angular/common/http';
import { AdminGuard } from './admin.guard';

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
        AdminGuard
      ]
    };
  }

  static forChild(): ModuleWithProviders<ClientAuthModule> {
    return {
      ngModule: ClientAuthModule,
      providers: [AdminGuard, CookieService, AuthService]
    };
  }
}
