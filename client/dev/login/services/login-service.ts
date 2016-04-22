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
  RouteConfig, 
  Router,
  ROUTER_DIRECTIVES,
  CanActivate
}from'angular2/router';

import {User, UserService} from '../../user/services/user-service';


@Injectable()
export class LoginService {
  static ENDPOINT: string = '/auth/login';
  token: string;
  private loggedIn = false;


  constructor( @Inject(Http) private _http: Http) {
      this.loggedIn = !!localStorage.getItem(this.token);
     
  }

// La función de login consiste en la comprobación de credenciales a partir de un usuario y contraseña dados.
  login(user:string,pass:string):Observable<any>{
    let datos = JSON.stringify({ user, pass });
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
      return this._http
        .post(LoginService.ENDPOINT, datos, { headers })
        .map((res: any) => {
            let data = res.json();
            let dato = JSON.stringify(data);
            let u = dato.search("\"user\":\"" + user + "\"");
            let p = dato.search("\"pass\":\"" + pass + "\"");
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

  // Función que se ejecuta para salir de nuestra aplicación. Elimina el token del tipo de usuario
  // y además, pone a falso el atributo loggedIn.
  logout(){
    localStorage.removeItem(this.token);
    this.loggedIn = false;

  }

// Función que devuelve dos valores, el primero booleano, true si el usuario se ha logueado y false en caso contrario.
// El segundo parametro nos devuelve el tipo de usuario de la aplicación.
  isLoggedIn(){
    return [this.loggedIn, localStorage.getItem(this.token)];
  }
}

