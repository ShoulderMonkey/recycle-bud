
import { HttpClient } from "@angular/common/http";
import { FindOneOptions, FindManyOptions } from "typeorm"

export abstract class BaseService<T>{

  abstract baseApiUrl : string

  constructor(public http: HttpClient) { }

  getOneById(id: string){
    return this.http.get<T>(this.baseApiUrl + '/' + id);
  }

  getAll(){
    return this.http.get<T[]>(this.baseApiUrl)
  }

  findOne(options?: FindOneOptions){
    return this.http.post<T>(this.baseApiUrl + '/findOne', options, )
  }

  findMany(options: FindManyOptions){
    return this.http.post<T[]>( this.baseApiUrl + '/findMany', options)
  }

  createOne(item: T){
    return this.http.post<T>(this.baseApiUrl, item);
  }

  updateOne(item : T, id: string){
    return this.http.put<T>(this.baseApiUrl +'/' + id, item);
  }

  deleteOne(id : string){
    return this.http.delete<T>(this.baseApiUrl+'/'+ id);
  }

  deleteCascade(item: T){
    return this.http.delete(this.baseApiUrl+ '/cascade', {body:item})
  }

}
