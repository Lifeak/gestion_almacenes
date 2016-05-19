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

export class Almacen {
  constructor(public nombre:string, public direccion: string, public ciudad: string, public pais: string, public telefono: string, public encargado: string, public _id:string){}
}


@Injectable()
export class AlmacenService {
  static ENDPOINT: string = '/api/almacen/:id';
  
  gotoIndex(){
    return this._http
      .get(AlmacenService.ENDPOINT.replace(':id', ''))
      .map((r) => r.json());
  }

  constructor(@Inject(Http) private _http: Http) {

  }

  getAll():Observable<any> {
    return this._http
              .get(AlmacenService.ENDPOINT.replace(':id', ''))
               .map((r) => r.json());
  }

  getUserId(id: string) {
    return this._http
    .get(AlmacenService.ENDPOINT.replace(':id', id))
    .map((r) => r.json());
  } 

  add(nombre:string, direccion:string, ciudad:string, pais:string, telefono:string, encargado:string):Observable<any> {

    let body = JSON.stringify({nombre, direccion, ciudad, pais, telefono, encargado});
    alert("body" + body);
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    return this._http
    .post(AlmacenService.ENDPOINT.replace(':id', ''), body, { headers })
               .map((r) => r.json());
  }

  remove(id: string):Observable<any> {
    return this._http
    .delete(AlmacenService.ENDPOINT.replace(':id', id));
  }
}
