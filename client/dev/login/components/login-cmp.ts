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
  RouteParams
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
import {App} from '../app';
import {HomeCmp} from './home-cmp';

@Component({
  //selector: 'login-cmp',
  templateUrl: 'client/dev/login/templates/login.html',
  styleUrls: ['client/dev/cliente/styles/cliente.css'],
  providers: [LoginService/*, ROUTER_PROVIDERS, provide(AuthHttp, { useFactory: (http) => { return new AuthHttp(new AuthConfig(), http);}, deps:[Http]})*/]
})


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
        () => {
        let resultado = this._loginService.isLoggedIn();
        alert("resultado de 0"+resultado[0]);
        alert("resultado de 1" + resultado[1]);
        if (resultado[0] == true && resultado[1]=="admin") {
          alert("como soy un admin, entro");
          this.gotoMenu();
        } else if (resultado[0] == true && resultado[1] == "encargado") {
            alert("como soy encargado, entro");
            this.gotoMenu();
        }else{
          alert("Bye.");
          window.location.reload();

        }
        
        
      });
   }

  gotoMenu() {
    this.router.navigate(['/Home']);
  }


}
/*bootstrap([LoginCmp, provide(AuthHttp, {
    useFactory: (http) => {
    return new AuthHttp(new AuthConfig(), http);
    },
    deps: [Http]
})])*/