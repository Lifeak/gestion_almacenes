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
import {Venta} from '../ventas/ventas-service';

export class SegSalida {
  constructor(
    public _id: string,
    public idventa: Venta,
    public fechaSegSalida:Date, 
    public finGarantia:Date,
    public observaciones:string, 
    public salidas :[{
        modelo:string,
        unidades: number,
        numserie: Array<string>
    }]) { }
}

@Injectable()
export class SegundaSalidaService {
  static ENDPOINT: string = '/api/segundasalida/:id';
  static ENDPOINT2: string = '/api/sm/modelos';
  static ENDPOINT3: string = '/api/sv/ventas';
  static ENDPOINT4: string = '/api/segpop/populate';

  gotoIndex(){
    return this._http
      .get(SegundaSalidaService.ENDPOINT.replace(':id', ''))
      .map((r) => r.json());
  }

  constructor(@Inject(Http) private _http: Http) {

  }

  getAll():Observable<any> {
    return this._http
    .get(SegundaSalidaService.ENDPOINT.replace(':id', ''))
               .map((r) => r.json());
  }

  getAllPopulate():Observable<any>{
    return this._http
    .get(SegundaSalidaService.ENDPOINT4.replace(':id', ''))
               .map((r) => r.json());
  }
  
  getSegSalidaID(id:string){
    return this._http
    .get(SegundaSalidaService.ENDPOINT.replace(':id', id))
               .map((r) => r.json());
  }

  getModelos(): Observable<any> {
    return this._http
      .get(SegundaSalidaService.ENDPOINT2)
        .map((r) => r.json());
  }

  getVentas(): Observable<any> {
    return this._http
      .get(SegundaSalidaService.ENDPOINT3)
        .map((r) => r.json());
  }

  add(idventa:string, fechaSegSalida:Date, finGarantia:Date, observaciones:string, salidas:Object):Observable<any> {
    let body = JSON.stringify({idventa,fechaSegSalida,finGarantia,observaciones,salidas});
    let headers = new Headers();
    alert("al service llega--->"+body);
    headers.append('Content-Type', 'application/json');
    return this._http
    .post(SegundaSalidaService.ENDPOINT.replace(':id', ''), body, { headers })
               .map((r) => r.json());
  }

  remove(id: string):Observable<any> {
    return this._http
    .delete(SegundaSalidaService.ENDPOINT.replace(':id', id));
  }
}
