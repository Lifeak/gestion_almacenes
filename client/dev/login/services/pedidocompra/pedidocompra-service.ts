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

export class Pedidocompra {
  constructor(
    public _id:string,
    public fechapedido:Date, 
    public almacen:string, 
    public proveedor:string, 
    public productos :[{
        modelo:string,
        udsPedidas:number,
        udsPendientes:number,
        entregas:Array<Object>
    }]) { }
}

@Injectable()
export class ComprasService {
  static ENDPOINT: string = '/api/pedidocompra/:id';
  static ENDPOINT2: string = '/api/pedido/modelos';
  static ENDPOINT3: string = '/api/pedid/almacen';
  static ENDPOINT4: string = '/api/ped/proveedor';

  gotoIndex(){
    return this._http
      .get(ComprasService.ENDPOINT.replace(':id', ''))
      .map((r) => r.json());
  }

  constructor(@Inject(Http) private _http: Http) {

  }

  getAll():Observable<any> {
    return this._http
    .get(ComprasService.ENDPOINT.replace(':id', ''))
               .map((r) => r.json());
  }
  
  getPedidoCompraID(id:string){
    return this._http
    .get(ComprasService.ENDPOINT.replace(':id', id))
               .map((r) => r.json());
  }

  getModelos(): Observable<any> {
    return this._http
      .get(ComprasService.ENDPOINT2)
        .map((r) => r.json());
  }
  getProveedores(): Observable<any> {
    return this._http
      .get(ComprasService.ENDPOINT4)
        .map((r) => r.json());
  }
  getAlmacenes(): Observable<any> {
    return this._http
      .get(ComprasService.ENDPOINT3)
        .map((r) => r.json());
  }

  add(fechapedido:Date,almacen:string, proveedor:string, productos:Object):Observable<any> {
    let body = JSON.stringify({fechapedido,almacen,proveedor,productos});
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    return this._http
    .post(ComprasService.ENDPOINT.replace(':id', ''), body, { headers })
               .map((r) => r.json());
  }

  remove(id: string):Observable<any> {
    return this._http
    .delete(ComprasService.ENDPOINT.replace(':id', id));
  }
}
