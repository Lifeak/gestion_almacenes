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
  token: string;
  //user: string;

  constructor(@Inject(Http) private _http: Http) {
      this.token = localStorage.getItem('jwt');
      //this.user = this.token && jwt_decode(this.token);
  }

  login(user:string,pass:string):Observable<any>{
    let datos = JSON.stringify({ user, pass });
  alert("user y pass");
  alert(datos);
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
      return this._http
        .post(LoginService.ENDPOINT, datos, { headers })
        .map((res: any) => {
            let data = res.json();
            let dato = res
            if(data.isEmpty()){
        alert("existe");
                  this.token = data.token;
                  localStorage.setItem('jwt', this.token);
                }else{
        alert("no existeee");
                }
        });
  }

  logout(){/*
    return this._http
    .get(LoginService.ENDPOINT, {
      headers: new Headers({
        'x-security-token': this.token
      })
    })
    .map((res: any) => {
      this.token = undefined;
      localStorage.removeItem('token');
    });*/
    localStorage.removeItem('jwt');
    //this.router.parent.navigateByUrl('/login');

  }


}

