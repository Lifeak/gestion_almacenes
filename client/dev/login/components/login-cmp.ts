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
  Http,
  Headers
} from 'angular2/http';

import {LoginService} from '../services/login-service';
import {App} from '../app';

@Component({
  templateUrl: 'client/dev/login/templates/login.html',
  providers: [LoginService]
})


export class LoginCmp {
  loginForm: ControlGroup;
  error: boolean = false;


  constructor(@Inject(FormBuilder) fb:FormBuilder, @Inject(LoginService) private _loginService: LoginService, private router: Router) {
    this.loginForm = fb.group({
      "user": ["", Validators.required],
      "pass": ["", Validators.required]
    });
    localStorage.clear();
  }

// La función login, recibe un formulario del cual extraemos usuario y contraseña, se lo mandamos al service, el cual hace sus comprobaciones
// y en función del tipo de usuario que seas, podrás acceder a un sitio u otro.
  login(form: FormData) {
      var user: string = this.loginForm.controls['user'].value;
      var pass: string = this.loginForm.controls['pass'].value;

      this._loginService.login(user, pass)
      .subscribe(
        () => {
        let resultado = this._loginService.isLoggedIn();
        if (resultado[0] == true && resultado[1]=="admin") {
          this.gotoMenu();
        } else if (resultado[0] == true && resultado[1] == "encargado") {
            this.gotoMenu();
        }else{
          //alert("Usuario y pass incorrectos.");
          window.location.reload();

        }
        
        
      });
   }
// Función que nos permite navegar al menú de la aplicación.
  gotoMenu() {
    this.router.navigate(['/Almacen']);
  }


}
