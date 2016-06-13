import {
  Inject,
  Injectable
} from 'angular2/core';

import {
  Observable
} from 'rxjs/Observable';

import {
  Http,
  Headers
} from 'angular2/http';

import 'rxjs/add/operator/map';

export class User {
  constructor(public user:string, public pass: string, public nombre: string, public apellido: string, public tipo: string, public _id:string){}
}


@Injectable()
export class UserService {
  static ENDPOINT: string = '/api/user/:id';
  static ENDP: string = '/api/user/profile/:user';
  
  gotoIndex(){
    return this._http
      .get(UserService.ENDPOINT.replace(':id', ''))
      .map((r) => r.json());
  }

  constructor(@Inject(Http) private _http: Http) {

  }

  getAll():Observable<any> {
    return this._http
              .get(UserService.ENDPOINT.replace(':id', ''))
               .map((r) => r.json());
  }

  getUserId(id: string) {
    return this._http
    .get(UserService.ENDPOINT.replace(':id', id))
    .map((r) => r.json());
  } 

  getProfile(user: string){
    return this._http
      .get(UserService.ENDP.replace(':user',user))
      .map((r) => r.json());
  }

  add(user:string, pass:string, nombre:string, apellido:string, tipo:string):Observable<any> {

    let body = JSON.stringify({user, pass, nombre, apellido, tipo});
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    return this._http
      .post(UserService.ENDPOINT.replace(':id', ''), body,  { headers })
               .map((r) => r.json());
  }

  remove(id: string):Observable<any> {
    return this._http
          .delete(UserService.ENDPOINT.replace(':id', id));
  }
}
