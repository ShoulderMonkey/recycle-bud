import { Component, inject } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from '../auth/auth.service';
import { Role } from '../models/enums/role';
import { LANGS } from '../app.module';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'recycle-bud-frame',
  templateUrl: './frame.component.html',
  styleUrls: ['./frame.component.scss']
})
export class FrameComponent {

  langs = LANGS
  isAdmin = this.authService.getLoggedUser()!.role === Role.ADMIN

  private breakpointObserver = inject(BreakpointObserver);

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

    constructor(
      private authService: AuthService,
      public translate: TranslateService
      ){}

    logout(){
      this.authService.removeJwtToken()
    }

    changeLang(lang: string){
      this.translate.use(lang)
    }
}
