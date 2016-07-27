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

export class Transporte {
  constructor(
    public _id: string, 
    public nombre: string,
    public direccion: string,
    public ciudad: string, 
    public pais: string, 
    public telefono: string, 
    public email:string, 
    public detalles:string,
    public valoracion:string) { }
}


export class TransporteService {
  static ENDPOINT: string = '/api/transporte/:id';

  constructor(@Inject(Http) private _http: Http) {

  }

  getAll():Observable<any> {
    return this._http
    .get(TransporteService.ENDPOINT.replace(':id', ''))
               .map((r) => r.json());
  }

  getTransporteId(id: string) {
    return this._http
      .get(TransporteService.ENDPOINT.replace(':id', id))
      .map((r) => r.json());
  }


  add(nombre:string,direccion:string,ciudad:string,pais:string,telefono:string,email:string,detalles:string,valoracion:string):Observable<any> {
    let body = JSON.stringify({nombre, direccion,ciudad,pais,telefono,email,detalles,valoracion});
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    return this._http
      .post(TransporteService.ENDPOINT.replace(':id', ''), body, { headers })
      .map((r) => r.json());
  }

  remove(id: string):Observable<any> {
    return this._http
    .delete(TransporteService.ENDPOINT.replace(':id', id));
  }
}
