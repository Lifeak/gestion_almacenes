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

export class ControlCalidad {
  constructor(
    public _id: string,
    public albaran: string,
    public udsEntregadas:number,
    public udsRevisadas: number,
    public noconformes: number,
    public revisionfin: string,
    public pctnoconf: number,
    public noconformesfin: number,
    public udsConformes: number,
    public LCI: number,
    public LC:number,
    public LCS:number
    ){}
}


@Injectable()
export class ControlService {
  static ENDPOINT: string = '/api/controlcalidad/:id';
  
  gotoIndex(){
    return this._http
      .get(ControlService.ENDPOINT.replace(':id', ''))
      .map((r) => r.json());
  }

  constructor(@Inject(Http) private _http: Http) {

  }

  getAll():Observable<any> {
    return this._http
              .get(ControlService.ENDPOINT.replace(':id', ''))
               .map((r) => r.json());
  }

  getControlId(id: string) {
    return this._http
    .get(ControlService.ENDPOINT.replace(':id', id))
    .map((r) => r.json());
  } 

  add(albaran:string,udsEntregadas:number,udsRevisadas:number,noconformes:number,revisionfin:string,pctnoconf:number,noconformesfin:number,udsConformes:number,LCI:number,LC:number,LCS:number):Observable<any> {

    let body = JSON.stringify({albaran,udsEntregadas,udsRevisadas,noconformes,revisionfin,pctnoconf,noconformesfin,udsConformes,LCI,LC,LCS});
    alert("la peticion es-->"+body);
    let headers = new Headers();

    headers.append('Content-Type', 'application/json');
    return this._http
    .post(ControlService.ENDPOINT.replace(':id', ''), body, { headers })
               .map((r) => r.json());
  }

  remove(id: string):Observable<any> {
    return this._http
    .delete(ControlService.ENDPOINT.replace(':id', id));
  }
}
