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
  RouteParams, 
  RouteConfig,
  CanActivate,
  ROUTER_DIRECTIVES
} from 'angular2/router';


import {User, UserService} from '../../services/user/user-service';
import {isLogged, isLoggedinAdmin, isLoggedinEncargado} from '../../services/isloggedin';
import {LoginService} from '../../services/login-service';


@Component({
  templateUrl: 'client/dev/user/templates/list.html',
  directives:[ROUTER_DIRECTIVES],
  providers: [UserService, LoginService]
})

@CanActivate(() => isLoggedinAdmin())
export class UserListCmp implements OnInit {
  users: User[] = [];
  private _selectedId: string;
  public token: string;
  public profile: string;

  constructor(private _userService: UserService, private _loginService: LoginService,public router: Router, routeParams: RouteParams) {
    this._selectedId = routeParams.get('id');
  }

  ngOnInit() {
    this._getAll();
  }

  private _getAll():void {
    this._userService
        .getAll()
        .subscribe((users) => {
          this.users = users;
        });
  }
  isSelected(user:User){
    return user._id === this._selectedId;
  }
  onSelect(user:User){
    this.router.navigate(['/DetailsUsuario',{id: user._id}]);
  }

  nuevousuario() {
    this.router.navigate(['/CreateUsuario']);
  }
  compras() {
    this.router.navigate(['/Compras']);
  }

  ventas() {
    this.router.navigate(['/Ventas']);
  }

  almacen() {
    this.router.navigate(['/Almacen']);
  }

  admin() {
    this.router.navigate(['/Admin']);
  }
  logout() {
      this._loginService.logout();
      this.router.navigate(['/Login']);
  }

  gusuarios() {
    if (localStorage.getItem(this.token) == "encargado") {
      let u = localStorage.key(1);
      if (u == "undefined") {
        let o = localStorage.key(0);
        this.getProfile(o);
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
  public getPerfil(){
    let u = localStorage.key(1);
      if (u == "undefined") {
      let o = localStorage.key(0);
      this.getProfile(o);
      } else {
      this.getProfile(u);
      }
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
   gventas(){
     this.router.navigate(['/ListVentas']);
   }
   gdevoluciones(){
     this.router.navigate(['/ListDevoluciones']);
   }
   ggarantiasp(){
     this.router.navigate(['/ListGarantiaP']);
   }
   gsegsalidas(){
     this.router.navigate(['/ListSegSalidas']);
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
  
}
