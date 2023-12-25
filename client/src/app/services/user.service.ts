import { Injectable } from "@angular/core";
import { BaseService } from "./base.service";
import { User } from "../models/user";
import { environment } from "client/src/environments/environment";
import { HttpClient } from "@angular/common/http";

@Injectable({
    providedIn: 'root'
  })
  export class UserService extends BaseService<User> {
  
    baseApiUrl: string = environment.baseApiUrl + "/user"
  
    constructor(service: HttpClient) {
      super(service);
    }
  }