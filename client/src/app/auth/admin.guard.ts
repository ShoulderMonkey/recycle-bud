import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import {jwtDecode} from 'jwt-decode';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { User } from '../models/user';
import { Role } from '../models/enums/role';

@Injectable()
export class AdminGuard implements CanActivate {
  constructor(
    private router: Router,
    private authService: AuthService,
  ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ):
    | Observable<boolean>
    | Promise<boolean>
    | boolean {

    let user = null;
    const token = this.authService.getJwtToken();
    if (token) {
      user = jwtDecode(token) as User;
      if(user.role === Role.ADMIN)
      return true
    }

    return false;
  }
}
