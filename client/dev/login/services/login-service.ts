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

import {
  AuthHttp,
  tokenNotExpired,
  JwtHelper

}from 'angular2-jwt';

import {
  RouteConfig, 
  Router,
  ROUTER_DIRECTIVES,
  CanActivate
}from'angular2/router';

import {User, UserService} from '../../user/services/user-service';
//declare var Auth0Lock;

@Injectable()
export class LoginService {
  static ENDPOINT: string = '/auth/login';
  token: string;
  private loggedIn = false;

  //lock = new Auth0Lock('YOUR_AUTH0_CLIENT_ID', 'YOUR_AUTH0_DOMAIN');
  //jwtHelper: JwtHelper = new JwtHelper();

  constructor( @Inject(Http) private _http: Http) {
      this.loggedIn = !!localStorage.getItem(this.token);
     
  }

  login(user:string,pass:string):Observable<any>{
    let datos = JSON.stringify({ user, pass });
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
      return this._http
        .post(LoginService.ENDPOINT, datos, { headers })
        .map((res: any) => {
            let data = res.json();
            let dato = JSON.stringify(data);
            let usuario = user;
            let u = dato.search("\"user\":\""+ usuario+"\"");
            let pasw = pass;
            let p = dato.search("\"pass\":\"" + pasw + "\"");
            //var creds = "username=" + user + "&pass=" + pass;
            if(u!=-1 && p!=-1){
                  alert("Todo OK.");
                  let cred = dato.search("\"tipo\":\"admin\"");
                  if(cred!=-1){
                      localStorage.setItem(this.token, "admin");
                      alert("es un usuario admin");
                  }else{
                      localStorage.setItem(this.token, "encargado");
                      alert("es un usuario del monton");
                  }
                  this.loggedIn = true;

                }else{
                    alert("Credenciales incorrectas. Try again.");
                    this.loggedIn = false;
                    localStorage.setItem(this.token, "");
                }
        });
  }


  logout(){
    localStorage.removeItem(this.token);
    //localStorage.removeItem('id_token');

  }

  isLoggedIn(){
    return [this.loggedIn, localStorage.getItem(this.token)];
  }/*
  getSecretThing() {
    this.authHttp.get('http://localhost:3001/secured/ping')
      .subscribe(
      data => console.log(data.json()),
      err => console.log(err),
      () => console.log('Complete')
      );
  }

  tokenSubscription() {
    this.authHttp.tokenStream.subscribe(
      data => console.log(data),
      err => console.log(err),
      () => console.log('Complete')
      );
  }

  useJwtHelper() {
    var token = localStorage.getItem('id_token');

    console.log(
      this.jwtHelper.decodeToken(token),
      this.jwtHelper.getTokenExpirationDate(token),
      this.jwtHelper.isTokenExpired(token)
    );
  }*/
}

/*
bootstrap(App, [
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  provide(AuthHttp, {
    useFactory: (http) => {
      return new AuthHttp(new AuthConfig(), http);
    },
    deps: [Http]
  }),
  provide(APP_BASE_HREF, { useValue: '/' })
]);
}
*/
