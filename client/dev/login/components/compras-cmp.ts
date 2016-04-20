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
  //selector: 'home-cmp',
  templateUrl: 'client/dev/login/templates/compras.html',
  //styleUrls: ['client/dev/cliente/styles/cliente.css'],
  providers: [LoginService/*, ROUTER_PROVIDERS, provide(AuthHttp, { useFactory: (http) => { return new AuthHttp(new AuthConfig(), http); }, deps: [Http] })*/]
})

@CanActivate(() => isLogged())
export class ComprasCmp {
  title: string = "Compras";
  logadmin: boolean = false;


  constructor( @Inject(LoginService) private _loginService: LoginService, private router: Router) {
      this.logadmin = isLoggedinAdmin();
      alert("logadmin es  " + this.logadmin);
  }


}
