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
  CanActivate
} from 'angular2/router';

import {
  Http,
  Headers
} from 'angular2/http';

import {LoginService} from '../services/login-service';
import {isLogged, isLoggedinAdmin, isLoggedinEncargado} from '../services/isloggedin';



@Component({
  templateUrl: 'client/dev/login/templates/admin.html',
  providers: [LoginService/*, ROUTER_PROVIDERS*/]
  //directives: [ROUTER_DIRECTIVES]
})

@CanActivate(() => isLogged())
export class AdminCmp {
  title: string = "Admin";
  logadmin: boolean = false;


  constructor( @Inject(LoginService) private _loginService: LoginService, public router: Router) {
    this.logadmin = isLoggedinAdmin();
    this.router = router;
  }

  logout() {
    alert("logoutt");
    this._loginService.logout();
    this.router.navigate(['/Login']);
    this.logadmin = false;
  }

  compras() {
    this.router.navigate(['/Compras']);
  }

  ventas() {
    this.router.navigate(['/Ventas']);
  }

  almacen() {
    this.router.navigate(['/Almacen']);
  }

  admin() {
    this.router.navigate(['/Admin']);
  }

  usuarios() {
    this.router.navigate(['/ListUsuarios']);
  }

  garantias(){
    this.router.navigate(['/ListGarantias']);
  }

  almacenes() {
    this.router.navigate(['/ListAlmacenes']);
  }

}
