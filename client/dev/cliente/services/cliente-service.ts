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

export class ClienteService {
  static ENDPOINT: string = '/api/cliente/:id';

  constructor(@Inject(Http) private _http: Http) {

  }

  getAll():Observable<any> {
    return this._http
    .get(ClienteService.ENDPOINT.replace(':id', ''))
               .map((r) => r.json());
  }

  add(message:string):Observable<any> {
    let _messageStringified = JSON.stringify({clienteMessage: message});

    let headers = new Headers();

    headers.append('Content-Type', 'application/json');

    return this._http
    .post(ClienteService.ENDPOINT.replace(':id', ''), _messageStringified, { headers })
               .map((r) => r.json());
  }

  remove(id: string):Observable<any> {
    return this._http
    .delete(ClienteService.ENDPOINT.replace(':id', id));
  }
}
