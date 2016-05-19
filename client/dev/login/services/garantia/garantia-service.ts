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

export class Garantia {
  constructor(public _id:string, public tiempo: number){}
}


@Injectable()
export class GarantiaService {
  static ENDPOINT: string = '/api/garantia/:id';
  
  gotoIndex(){
    return this._http
    .get(GarantiaService.ENDPOINT.replace(':id', ''))
      .map((r) => r.json());
  }

  constructor(@Inject(Http) private _http: Http) {

  }

  getAll():Observable<any> {
    return this._http
    .get(GarantiaService.ENDPOINT.replace(':id', ''))
               .map((r) => r.json());
  }

  getGarantiaId(id: string) {
    return this._http
    .get(GarantiaService.ENDPOINT.replace(':id', id))
    .map((r) => r.json());
  } 

  add(_id:string, tiempo:number):Observable<any> {

    let body = JSON.stringify({_id, tiempo});
    alert("body" + body);
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    return this._http
    .post(GarantiaService.ENDPOINT.replace(':id', ''), body, { headers })
               .map((r) => r.json());
  }

  remove(id: string):Observable<any> {
    return this._http
    .delete(GarantiaService.ENDPOINT.replace(':id', id));
  }
}
