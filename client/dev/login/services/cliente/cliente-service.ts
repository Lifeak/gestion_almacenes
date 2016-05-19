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

export class Cliente {
  constructor(
    public _id: string, 
    public nombre: string,
    public direccion: string,
    public ciudad: string, 
    public pais: string, 
    public telefono1: string, 
    public telefono2: string, 
    public puestoTrabajo: string, 
    public email:string, 
    public detalles:string) { }
}


export class ClienteService {
  static ENDPOINT: string = '/api/cliente/:id';

  constructor(@Inject(Http) private _http: Http) {

  }

  getAll():Observable<any> {
    return this._http
    .get(ClienteService.ENDPOINT.replace(':id', ''))
               .map((r) => r.json());
  }

  gotoIndex() {
    return this._http
      .get(ClienteService.ENDPOINT.replace(':id', ''))
      .map((r) => r.json());
  }

  getClienteId(id: string) {
    return this._http
      .get(ClienteService.ENDPOINT.replace(':id', id))
      .map((r) => r.json());
  }


  add(_id:string,nombre:string,direccion:string,ciudad:string,pais:string,telefono1:string,telefono2:string,puestoTrabajo:string,email:string,detalles:string):Observable<any> {
    let body = JSON.stringify({ _id, nombre, direccion,ciudad,pais,telefono1,telefono2,puestoTrabajo,email,detalles});
    alert("body" + body);
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    return this._http
      .post(ClienteService.ENDPOINT.replace(':id', ''), body, { headers })
      .map((r) => r.json());
  }

  remove(id: string):Observable<any> {
    return this._http
    .delete(ClienteService.ENDPOINT.replace(':id', id));
  }
}
