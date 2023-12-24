import { Injectable } from "@angular/core";
import { BaseService } from './base.service';
import { RecycledItem } from "../models/recycled-item";
import { environment } from "client/src/environments/environment";
import { HttpClient } from "@angular/common/http";
@Injectable({
    providedIn: 'root'
  })
  export class RecycledItemService extends BaseService<RecycledItem> {
  
    baseApiUrl: string = environment.baseApiUrl + "/recycled-item"
  
    constructor(service: HttpClient) {
      super(service);
    }
  }