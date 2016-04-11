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
  ROUTER_DIRECTIVES,
  RouteConfig,
  RouteParams
} from 'angular2/router';

import {LoginService} from '../services/login-service';
import {App} from '../app';
import {HomeCmp} from './home-cmp';

@Component({
  //selector: 'login-cmp',
 // template:`<h2>Estamos en el login</h2>`,
  templateUrl: 'client/dev/login/templates/login.html',
  styleUrls: ['client/dev/cliente/styles/cliente.css'],
  //directives: [ROUTER_DIRECTIVES],
  providers: [LoginService, ROUTER_PROVIDERS]
})
/*
@RouteConfig([
 // { path:'/', name:'Login', component: LoginCmp, useAsDefault:true },
  { path:'/home', name:'Home', component: HomeCmp}
])*/

export class LoginCmp {
  title: string = "Login";
  loginForm: ControlGroup;
  error: boolean = false;


  constructor(@Inject(FormBuilder) fb:FormBuilder, @Inject(LoginService) private _loginService: LoginService, private router: Router) {
    this.loginForm = fb.group({
      "user": ["", Validators.required],
      "pass": ["", Validators.required]
    });
  }

  login(form: FormData) {
      var user: string = this.loginForm.controls['user'].value;
      var pass: string = this.loginForm.controls['pass'].value;

      this._loginService.login(user, pass)
      .subscribe(
      //(token: any) => this.router.navigate(['./Home']),
      //() => { this.error = true; }
      () => { 

      this.router.navigate(['Home']);
    }
      );
  }
      
}
