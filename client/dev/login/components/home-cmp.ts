import {
  Component,
  Inject,
  OnInit
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

import {LoginService} from '../services/login-service';
import {isLoggedin} from '../services/isloggedin';


@Component({
  //selector: 'home-cmp',
  template:`<h1>estamos dentro</h1>
`,
  //templateUrl: 'client/dev/login/templates/dentro.html',
  styleUrls: ['client/dev/cliente/styles/cliente.css'],
  providers: [LoginService, ROUTER_PROVIDERS]
})

//@CanActivate(() => isLoggedin())
export class HomeCmp {
  title: string = "Home";


  constructor( @Inject(LoginService) private _loginService: LoginService, private router: Router) {

  }

  logout(){
    this._loginService.logout();
      //.subscribe(() => this.router.navigate(['../Login']));
    //this.router.navigate(['../Login']);
  }

}
