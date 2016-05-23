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
  CanActivate
} from 'angular2/router';

import {
  Http,
  Headers
} from 'angular2/http';

import {LoginService} from '../services/login-service';
import {isLogged, isLoggedinAdmin, isLoggedinEncargado} from '../services/isloggedin';


@Component({
  templateUrl: 'client/dev/login/templates/almacen.html',
  providers: [LoginService]
})

@CanActivate(() => isLogged())
export class AlmacenCmp {
  title: string = "Almacen";
  logadmin: boolean = false;


  constructor( @Inject(LoginService) private _loginService: LoginService, private router: Router) {
      this.logadmin = isLoggedinAdmin();
  }

  logout(){
    this._loginService.logout();
    this.router.navigate(['/Login']);
    this.logadmin = false;
  }
  
  compras(){
    this.router.navigate(['/Compras']);
  }

   ventas(){
    this.router.navigate(['/Ventas']);
  }

   almacen(){
    this.router.navigate(['/Almacen']);
  }

   admin(){
    this.router.navigate(['/Admin']);
  }
}
