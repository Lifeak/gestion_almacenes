import {
  Component,
  Inject,
  OnInit,
  provide
} from 'angular2/core';

import {
  Validators,
  FormBuilder,
  ControlGroup,
  Control
} from 'angular2/common';

import {
  Router,
  ROUTER_PROVIDERS,
  ROUTER_DIRECTIVES,
  RouteConfig,
  RouterOutlet,
  CanActivate
} from 'angular2/router';

import {
  Http,
  Headers
} from 'angular2/http';

import {LoginService} from '../services/login-service';
import {isLogged, isLoggedinAdmin, isLoggedinEncargado} from '../services/isloggedin';
import {ComprasCmp} from './compras-cmp';

@Component({
  templateUrl: 'client/dev/login/templates/welcome.html',
  providers: [LoginService/*, ROUTER_PROVIDERS, provide(AuthHttp, { useFactory: (http) => { return new AuthHttp(new AuthConfig(), http); }, deps: [Http] })*/]
})


@CanActivate(() => isLogged())
export class HomeCmp {
  title: string = "Home";
  logadmin: boolean = false;


  constructor( @Inject(LoginService) private _loginService: LoginService, private router: Router) {
      this.logadmin = isLoggedinAdmin();
      alert("logadmin es  " + this.logadmin);
  }

  logout(){
    this._loginService.logout();
    this.router.navigate(['/Login']);
    this.logadmin = false;
  }
  
  compras(){
    alert("compras");
    this.router.navigate(['/Compras']);
  }

   ventas(){
    alert("ventas");
    this.router.navigate(['/Ventas']);
  }

   almacen(){
    alert("almacen");
    this.router.navigate(['/Almacen']);
  }

   admin(){
    alert("admin");
    this.router.navigate(['/Admin']);
  }

}
