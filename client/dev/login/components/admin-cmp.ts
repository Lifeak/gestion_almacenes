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
import {UserService} from '../services/user/user-service';
import {isLogged, isLoggedinAdmin, isLoggedinEncargado} from '../services/isloggedin';



@Component({
  templateUrl: 'client/dev/login/templates/admin.html',
  providers: [LoginService, UserService]
})

@CanActivate(() => isLogged())
export class AdminCmp {
  title: string = "Admin";
  logadmin: boolean = false;
  token: string;
  public profile: string;


  constructor( @Inject(LoginService) private _loginService: LoginService, private _userService : UserService, public router: Router) {
    this.logadmin = isLoggedinAdmin();
    this.router = router;
  }

  logout() {
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

  goalmacen() {
    this.router.navigate(['/Almacen']);
  }

  admin() {
    this.router.navigate(['/Admin']);
  }

  usuarios() {
    if (localStorage.getItem(this.token) == "encargado") {
      //alert("soy un encargadillo");
      let u = localStorage.key(1);
      //alert("en u tenemos " + u);
      this.getProfile(u);

    } else{          
          this.router.navigate(['/ListUsuarios']);
    }
  }
  public getProfile(name: string) {
    this._userService
      .getProfile(name)
      .subscribe((user) => {
        this.profile = user[0]._id;
        this.router.navigate(['Perfil', { id: this.profile }]);
        //alert("en el get, el id es " +this.profile);
      });
  }

  garantias(){
    this.router.navigate(['/ListGarantias']);
  }

  gproductos() {
    this.router.navigate(['/ListProductos']);
  }
  gpiezas() {
    this.router.navigate(['/ListPiezas']);
  }
  gmodelos() {
    this.router.navigate(['/ListModelos']);
  }
  gproveedores() {
    this.router.navigate(['/ListProveedores']);
  }
  gusuarios() {
    this.router.navigate(['/ListUsuarios']);
  }
  ggarantias() {
    this.router.navigate(['/ListGarantias']);
  }
  galmacenes() {
    this.router.navigate(['/ListAlmacenes']);
  }
  gclientes() {
    this.router.navigate(['/ListClientes']);
  }

}
