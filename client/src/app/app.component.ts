import { Component } from '@angular/core';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'recycle-bud-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  host: {
    class: "full-screen"
  }
})
export class AppComponent {
  title = 'client';
  isLoggedUser: boolean
  constructor(
    private authService: AuthService
  ){
    this.isLoggedUser = authService.userHasLogged.value
    
    authService.userHasLogged.subscribe(isLogged => {
      this.isLoggedUser = isLogged
    })
  }
}
