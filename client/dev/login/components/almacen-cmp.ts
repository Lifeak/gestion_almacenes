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
  templateUrl: 'client/dev/login/templates/almacen.html',
  providers: [LoginService, UserService]
})

@CanActivate(() => isLogged())
export class AlmacenCmp {
  title: string = "Almacen";
  logadmin: boolean = false;
  token: string;
  public profile: string;


  constructor( @Inject(LoginService) private _loginService: LoginService, private _userService: UserService, private router: Router) {
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

   gusuarios() {
     if (localStorage.getItem(this.token) == "encargado") {
       let u = localStorage.key(1);
       if (u == "undefined") {
         let e = localStorage.key(0);
         this.getProfile(e);
       } else {
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

}
