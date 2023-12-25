import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { BaseResolverService } from "../../services/base-resolver.service";
import { User } from '../../models/user';
import { UserService } from '../../services/user.service';

@Injectable()
export class UserResolverService extends BaseResolverService<User> {

  routeBack = ['/']
  constructor(
    public override readonly router: Router,
    public override readonly toastr: ToastrService,
    private apiService: UserService) {
    super(router,toastr,);
  }

  findOne(email: any) {
    let obj = {
      where: {
        email : email
      }
    }
    return this.apiService.findOne(obj);
  }

}