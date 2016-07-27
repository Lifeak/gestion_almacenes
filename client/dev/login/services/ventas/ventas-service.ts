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

export class Venta {
  constructor(
    public _id: string,
    public cliente:string,
    public direccionEnvio:string,
    public ciudad:string,
    public pais: string,
    public numPedido:string,
    public fechaSalida: Date,
    public finGarantia: Date,
    public transporte: string,
    public agente: string,
    public observaciones:string,
    public lineaventa:[{
      modelo: string,
      unidades: number,
      tipoOperacion:string,
      numSerie:Array<string>
    }]) { }
}
export class VentasService {
  static ENDPOINT: string = '/api/venta/:id';
  static ENDPOINT2: string = '/api/pv/modelos';
  static ENDPOINT3: string = '/api/pvgp/garantias';
  static ENDPOINT4: string = '/api/pvt/transporte';

  constructor(@Inject(Http) private _http: Http) {

  }

  getAll():Observable<any> {
    return this._http
    .get(VentasService.ENDPOINT.replace(':id', ''))
               .map((r) => r.json());
  }

  gotoIndex() {
    return this._http
      .get(VentasService.ENDPOINT.replace(':id', ''))
      .map((r) => r.json());
  }

  getVentaId(id: string) {
    return this._http
      .get(VentasService.ENDPOINT.replace(':id', id))
      .map((r) => r.json());
  }

  getModelos(): Observable<any> {
    return this._http
      .get(VentasService.ENDPOINT2)
        .map((r) => r.json());
  }

  getGarantiaPais(): Observable<any> {
    return this._http
      .get(VentasService.ENDPOINT3)
        .map((r) => r.json());
  }

  getTransportes(){
     return this._http
     .get(VentasService.ENDPOINT4)
     .map((r)=>r.json());
  }

  add(cliente:string, direccionEnvio:string, ciudad:string, pais:string, numPedido:string,fechaSalida:Date, finGarantia:Date, transporte:string, agente:string, observaciones:string, lineaventa:Object):Observable<any> {
    let body = JSON.stringify({cliente, direccionEnvio, ciudad, pais, numPedido, fechaSalida, finGarantia, transporte, agente, observaciones, lineaventa});
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http
      .post(VentasService.ENDPOINT.replace(':id', ''), body, { headers })
      .map((r) => r.json());

  }

  remove(id: string):Observable<any> {
    return this._http
    .delete(VentasService.ENDPOINT.replace(':id', id));
  }
}
