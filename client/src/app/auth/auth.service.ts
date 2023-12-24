import { Inject, Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, tap } from 'rxjs';
import { CookieService } from 'ngx-cookie-service';
import { jwtDecode } from 'jwt-decode';
import { AuthOptions } from './auth-options';
import { User } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class AuthService {
  baseApiUrl = environment.baseApiUrl + '/auth'
  public userHasLogged: BehaviorSubject<boolean> = new BehaviorSubject(false)
  
  constructor(
    private http: HttpClient,
    private cookieService: CookieService,
    @Inject(AuthOptions) private readonly authOptions: AuthOptions
  ) {
    let user = null;
    const token = this.getJwtToken();
    if (token) {
      user = jwtDecode(token);
      if (!user) {
        this.userHasLogged.next(false)
      }else{
        this.userHasLogged.next(true)
      }
    }

    
  }

  login(credentials: any) {
    return this.http.post(`${this.baseApiUrl}/login`, credentials).pipe(
      tap((res: any) => {
        localStorage.setItem("User Token",res.access_token)
        this.setToken(res.access_token)
        this.userHasLogged.next(true)
      })
    )
  }

  register(user: User){
    return this.http.post(`${this.baseApiUrl}/register`, user)
  }

  setToken(token: string, language: string = 'it'): void {
    this.cookieService.delete(this.authOptions.authCookieName!);
    const decodedToken = jwtDecode(token);
    const expirationDate = new Date(decodedToken.exp! * 1000);
    this.cookieService.set(this.authOptions.authCookieName!, language + token, expirationDate, undefined, undefined, false, 'Strict');
   
  }

  getJwtToken(): string {
    const cookieValue = this.cookieService.get(this.authOptions.authCookieName!);
    return cookieValue ? cookieValue.substr(2) : '';
  }

  removeJwtToken(): void {
    //localStorage.removeItem("User Token")
    localStorage.clear()
    this.cookieService.deleteAll()
    this.userHasLogged.next(false)
    // this.cookieService.set(this.authOptions.authCookieName!, '', new Date(0), undefined, undefined, false, 'Strict');
    // this.cookieService.delete(this.authOptions.authCookieName!);
  }

  getLoggedUser(): User|null{
    const token = this.getJwtToken();
    if (token) {
      return jwtDecode(token);
    }else{
      return null
    }
  }
}
