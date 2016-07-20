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

export class Garantiapieza {
  constructor(
    public _id: string,
    public idp: string,
    public fingarantia:Date 
) { }
}

@Injectable()
export class GarantiapService {
  static ENDPOINT: string = '/api/gpieza/:id';


  gotoIndex(){
    return this._http
      .get(GarantiapService.ENDPOINT.replace(':id', ''))
      .map((r) => r.json());
  }

  constructor(@Inject(Http) private _http: Http) {

  }

  getAll():Observable<any> {
    return this._http
    .get(GarantiapService.ENDPOINT.replace(':id', ''))
               .map((r) => r.json());
  }
  
  getGarantiapiezaID(id:string){
    return this._http
    .get(GarantiapService.ENDPOINT.replace(':id', id))
               .map((r) => r.json());
  }
 
  add(idp:string, fingarantia:Date):Observable<any> {
    let body = JSON.stringify({idp, fingarantia});
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http
    .post(GarantiapService.ENDPOINT.replace(':id', ''), body, { headers })
               .map((r) => r.json());
  }

  remove(id: string):Observable<any> {
    return this._http
    .delete(GarantiapService.ENDPOINT.replace(':id', id));
  }
}
