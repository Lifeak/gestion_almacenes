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

export class Proveedor {
  constructor(
    public _id:string,
    public nombre:string, 
    public direccion:string, 
    public ciudad:string, 
    public pais:string, 
    public telefono:string, 
    public valoracion:string,
    public materiales :{
        pieza:string,
        refexterna:string,
        coste1:number,
        coste2:number,
        val:string
    }){}
}



@Injectable()
export class ProveedorService {
  static ENDPOINT: string = '/api/proveedor/:id';
  
  gotoIndex(){
    return this._http
      .get(ProveedorService.ENDPOINT.replace(':id', ''))
      .map((r) => r.json());
  }

  constructor(@Inject(Http) private _http: Http) {

  }

  getAll():Observable<any> {
    return this._http
    .get(ProveedorService.ENDPOINT.replace(':id', ''))
               .map((r) => r.json());
  }

  getProveedorId(id: string) {
    return this._http
    .get(ProveedorService.ENDPOINT.replace(':id', id))
    .map((r) => r.json());
  } 

  add(nombre:string, direccion:string, ciudad: string, pais:string, telefono:string, valoracion:string, materiales: Object):Observable<any> {

    let body = JSON.stringify({nombre, direccion,ciudad,pais,telefono,valoracion, materiales});
    alert("body" + body);
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    return this._http
    .post(ProveedorService.ENDPOINT.replace(':id', ''), body, { headers })
               .map((r) => r.json());
  }

  remove(id: string):Observable<any> {
    return this._http
    .delete(ProveedorService.ENDPOINT.replace(':id', id));
  }
}
