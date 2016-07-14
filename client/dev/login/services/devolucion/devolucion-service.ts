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

export class Devolucion {
  constructor(
    public _id: string,
    public idventa: string,
    public tipoDevolucion:string, 
    public fechaEntrada:Date, 
    public devuelto :[{
        modelo:string,
        numSerie:string
    }]) { }
}

@Injectable()
export class DevolucionService {
  static ENDPOINT: string = '/api/devolucion/:id';
  static ENDPOINT2: string = '/api/dm/modelos';
  static ENDPOINT3: string = '/api/dv/ventas';
  static ENDPOINT4: string = '/api/devpop/populate';

  gotoIndex(){
    return this._http
      .get(DevolucionService.ENDPOINT.replace(':id', ''))
      .map((r) => r.json());
  }

  constructor(@Inject(Http) private _http: Http) {

  }

  getAll():Observable<any> {
    return this._http
    .get(DevolucionService.ENDPOINT.replace(':id', ''))
               .map((r) => r.json());
  }

  getAllPopulate():Observable<any>{
    return this._http
    .get(DevolucionService.ENDPOINT4.replace(':id', ''))
               .map((r) => r.json());
  }
  
  getDevolucionID(id:string){
    return this._http
    .get(DevolucionService.ENDPOINT.replace(':id', id))
               .map((r) => r.json());
  }

  getModelos(): Observable<any> {
    return this._http
      .get(DevolucionService.ENDPOINT2)
        .map((r) => r.json());
  }

  getVentas(): Observable<any> {
    return this._http
      .get(DevolucionService.ENDPOINT3)
        .map((r) => r.json());
  }
 
  add(idventa:string, tipoDevolucion:string, fechaEntrada:Date, devuelto:Object):Observable<any> {
    let body = JSON.stringify({idventa,tipoDevolucion,fechaEntrada,devuelto});
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    return this._http
    .post(DevolucionService.ENDPOINT.replace(':id', ''), body, { headers })
               .map((r) => r.json());
  }

  remove(id: string):Observable<any> {
    return this._http
    .delete(DevolucionService.ENDPOINT.replace(':id', id));
  }
}
