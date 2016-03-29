import {
  Inject
} from 'angular2/core';

import {
  Observable
} from 'rxjs/Observable';

import {
  Http,
  Headers
} from 'angular2/http';

import 'rxjs/add/operator/map';

export class UserService {
  static ENDPOINT: string = '/api/user/:id';

  constructor(@Inject(Http) private _http: Http) {

  }

  getAll():Observable<any> {
    return this._http
              .get(UserService.ENDPOINT.replace(':id', ''))
               .map((r) => r.json());
  }

  add(user:string, pass:string, nombre:string, apellido:string, tipo:string):Observable<any> {
    let _userStringified = JSON.stringify({user: user});
    let _passStringified = JSON.stringify({ pass: pass });
    let _nombreStringified = JSON.stringify({ nombre: nombre });
    let _apellidotringified = JSON.stringify({ apellido: apellido });
    let _tipoStringified = JSON.stringify({ apellido: apellido });

    let headers = new Headers();

    headers.append('Content-Type', 'application/json');

    // tiene que faltar : _passStringified, _nombreStringified, _apellidotringified, _tipoStringified,
    // para que reemplace todos los campos
    return this._http
    .post(UserService.ENDPOINT.replace(':id', ''), _userStringified,  { headers })
               .map((r) => r.json());
  }

  remove(id: string):Observable<any> {
    return this._http
          .delete(UserService.ENDPOINT.replace(':id', id));
  }
}
