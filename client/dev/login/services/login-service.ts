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
import {User, UserService} from '../../user/services/user-service';


@Injectable()
export class LoginService {
  static ENDPOINT: string = '/auth/login';
  

  constructor(@Inject(Http) private _http: Http) {

  }

  login(user:string,pass:string):Observable<any>{
    let datos = JSON.stringify({ user, pass });
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this._http
    .post(LoginService.ENDPOINT, datos, { headers })
    .map((r) => r.json());

  }

}
