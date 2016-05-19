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

export class Producto {
  constructor(
    public _id:string,
    public nombre:string,
    public modelo: string,
    public estado: string,
    public caracteristicas: string,
    public almacen: string,
    public vendido: boolean,
    public compuestoPor: Array<string>,
    public precio:number) { }
}


export class ProductoService {
  static ENDPOINT: string = '/api/producto/:id';
  static ENDPOINT2: string = '/api/producto/details/:nombre';
  static ENDPOINT3: string = '/api/pro/modelos';

  constructor(@Inject(Http) private _http: Http) {

  }

  getAll():Observable<any> {
    return this._http
    .get(ProductoService.ENDPOINT.replace(':id', ''))
               .map((r) => r.json());
  }

  gotoIndex() {
    return this._http
    .get(ProductoService.ENDPOINT.replace(':id', ''))
      .map((r) => r.json());
  }

  getProductoId(id: string) {
    return this._http
    .get(ProductoService.ENDPOINT.replace(':id', id))
    .map((r) =>  r.json());
  }

  getModelos(): Observable<any> {
    return this._http
    .get(ProductoService.ENDPOINT3)
        .map((r) => r.json());
  }

  getProductoName(nombre: string) {
    //alert("al service le llega " + nombre);
    return this._http
    .get(ProductoService.ENDPOINT2.replace(':nombre', nombre))
      .map((r) => r.json());
  }


  add(_id:string,nombre:string,modelo:string,estado:string,caracteristicas:string,almacen:string,vendido:boolean,compuestoPor:Array<string>,precio:number):Observable<any> {
    let body = JSON.stringify({_id,nombre,modelo,estado,caracteristicas,almacen,vendido,compuestoPor,precio});
    alert("body" + body);
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    return this._http
    .post(ProductoService.ENDPOINT.replace(':id', ''), body, { headers })
      .map((r) => r.json());
  }

  remove(id: string):Observable<any> {
    return this._http
    .delete(ProductoService.ENDPOINT.replace(':id', id));
  }
}
