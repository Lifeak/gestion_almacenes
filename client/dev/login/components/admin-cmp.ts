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
    localStorage.clear();
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

  gusuarios() {
    if (localStorage.getItem(this.token) == "encargado") {
      let u = localStorage.key(1);
      if (u == "undefined") {
        let e = localStorage.key(0);
        this.getProfile(e);
      }else{
        this.getProfile(u);
      }
      
    } else {
          this.router.navigate(['/ListUsuarios']);
    }
  }
  public getProfile(name: string) {
    this._userService
      .getProfile(name)
      .subscribe((user) => {
        this.profile = user[0]._id;
        this.router.navigate(['Perfil', { id: this.profile }]);
      });
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
  ggarantias() {
    this.router.navigate(['/ListGarantias']);
  }
  galmacenes() {
    this.router.navigate(['/ListAlmacenes']);
  }
  gclientes() {
    this.router.navigate(['/ListClientes']);
  }
  gcontrolcalidad(){
    this.router.navigate(['/ListControlCalidad']);
  }
  greparaciones(){
    this.router.navigate(['/ListReparaciones']);
  }
  gpedidocompras(){
    this.router.navigate(['/ListCompras']);
  }
  gventas(){
    this.router.navigate(['/ListVentas']);
  }
  gdevoluciones(){
    this.router.navigate(['/ListDevoluciones']);
  }
  gsegsalidas(){
    this.router.navigate(['/ListSegSalidas']);
  }
  ggarantiasp(){
    this.router.navigate(['/ListGarantiaP']);
  }

}
