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

export class Reparacion {
  constructor(
    public _id: string,
    public numincidencia: string,
    public idproducto: string,
    public estado: string,
    public fechacambio: Date,
    public observaciones: string
    ){}
}


@Injectable()
export class ReparacionService {
  static ENDPOINT: string = '/api/reparacion/:id';
  
  gotoIndex(){
    return this._http
      .get(ReparacionService.ENDPOINT.replace(':id', ''))
      .map((r) => r.json());
  }

  constructor(@Inject(Http) private _http: Http) {

  }

  getAll():Observable<any> {
    return this._http
              .get(ReparacionService.ENDPOINT.replace(':id', ''))
               .map((r) => r.json());
  }

  getReparacionId(id: string) {
    return this._http
    .get(ReparacionService.ENDPOINT.replace(':id', id))
    .map((r) => r.json());
  } 

  add(numincidencia:string, idproducto:string, estado:string, fechacambio:Date, observaciones:string):Observable<any> {

    let body = JSON.stringify({numincidencia, idproducto, estado, fechacambio, observaciones});
    alert("la peticion es-->"+body);
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    return this._http
    .post(ReparacionService.ENDPOINT.replace(':id', ''), body, { headers })
               .map((r) => r.json());
  }

  remove(id: string):Observable<any> {
    return this._http
    .delete(ReparacionService.ENDPOINT.replace(':id', id));
  }
}
