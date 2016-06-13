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

export class Modelo {
  constructor(
    public _id:string,
    public nombre: string,
    public refinterna: string,
    public caracteristicas: string, 
    public modeloDe: string,
    public compuestoPor: Array<string>,
    public unidades: Array<number>) { }
}


export class ModeloService {
  static ENDPOINT: string = '/api/modelo/:id';
  static ENDPOINT2: string = '/api/modelo/details/:nombre';

  constructor(@Inject(Http) private _http: Http) {

  }

  getAll():Observable<any> {
    return this._http
    .get(ModeloService.ENDPOINT.replace(':id', ''))
               .map((r) => r.json());
  }

  gotoIndex() {
    return this._http
    .get(ModeloService.ENDPOINT.replace(':id', ''))
      .map((r) => r.json());
  }

  getModeloId(id: string) {
    return this._http
      .get(ModeloService.ENDPOINT.replace(':id', id))
      .map((r) => r.json());
  }

  getModeloName(nombre: string) {
    return this._http
      .get(ModeloService.ENDPOINT2.replace(':nombre', nombre))
      .map((r) => r.json());
  }


  add(nombre:string,refinterna:string,caracteristicas:string,modeloDe:string, compuestoPor:Array<string>,unidades: Array<number>):Observable<any> {
    let body = JSON.stringify({nombre,refinterna,caracteristicas,modeloDe,compuestoPor,unidades});
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    return this._http
    .post(ModeloService.ENDPOINT.replace(':id', ''), body, { headers })
      .map((r) => r.json());
  }

  remove(id: string):Observable<any> {
    return this._http
    .delete(ModeloService.ENDPOINT.replace(':id', id));
  }
}
