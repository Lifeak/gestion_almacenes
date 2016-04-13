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
  AuthHttp,
  tokenNotExpired,
  JwtHelper,
  AuthConfig

}from 'angular2-jwt';
import {
  Http,
  Headers
} from 'angular2/http';

import {LoginService} from '../services/login-service';
import {isLoggedinAdmin} from '../services/isloggedin';


@Component({
  //selector: 'home-cmp',
  template:`<h1>estamos dentro</h1>
  <button (click)="logout()">Logout</button>
`,
  //templateUrl: 'client/dev/login/templates/dentro.html',
  styleUrls: ['client/dev/cliente/styles/cliente.css'],
  providers: [LoginService/*, ROUTER_PROVIDERS, provide(AuthHttp, { useFactory: (http) => { return new AuthHttp(new AuthConfig(), http); }, deps: [Http] })*/]
})

@CanActivate(() => isLoggedinAdmin())
export class HomeCmp {
  title: string = "Home";


  constructor( @Inject(LoginService) private _loginService: LoginService, private router: Router) {

  }

  logout(){
    alert("logoutt");
    this._loginService.logout();
    this.router.navigate(['/Login']);
  }

}
