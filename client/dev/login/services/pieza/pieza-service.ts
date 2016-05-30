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

export class Pieza {
  constructor(
    public _id:string,
    public modelo: string,
    public estado: string,
    public lote: string,
    public caracterisiticas: string,
    public almacen: string,
    public almacenOrigen: string,
    public vendido: boolean,
    public compuestoPor: Array<string>,
    public precio:number) { }
}


export class PiezaService {
  static ENDPOINT: string = '/api/pieza/:id';
  static ENDPOINT2: string = '/api/pieza/details/:nombre';
  static ENDPOINT3: string = '/api/p/modelos';

  constructor(@Inject(Http) private _http: Http) {

  }

  getAll():Observable<any> {
    return this._http
    .get(PiezaService.ENDPOINT.replace(':id', ''))
               .map((r) => r.json());
  }

  gotoIndex() {
    return this._http
    .get(PiezaService.ENDPOINT.replace(':id', ''))
      .map((r) => r.json());
  }

  getPiezaId(id: string) {
    return this._http
      .get(PiezaService.ENDPOINT.replace(':id', id))
    .map((r) =>  r.json());
  }

  getModelos(): Observable<any> {
    return this._http
      .get(PiezaService.ENDPOINT3)
        .map((r) => r.json());
  }

  getPiezaName(nombre: string) {
    return this._http
      .get(PiezaService.ENDPOINT2.replace(':nombre', nombre))
      .map((r) => r.json());
  }


  add(_id:string,modelo:string,estado:string,lote:string,caracteristicas:string,almacen:string,almacenOrigen:string,vendido:boolean,compuestoPor:Array<string>,precio:number):Observable<any> {
    let body = JSON.stringify({_id,modelo,estado,lote,caracteristicas,almacen,almacenOrigen,vendido,compuestoPor,precio});
    //alert("body" + body);
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    return this._http
    .post(PiezaService.ENDPOINT.replace(':id', ''), body, { headers })
      .map((r) => r.json());
  }

  remove(id: string):Observable<any> {
    return this._http
    .delete(PiezaService.ENDPOINT.replace(':id', id));
  }
}
