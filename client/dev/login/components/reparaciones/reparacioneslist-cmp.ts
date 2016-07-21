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

import {LoginService} from '../../services/login-service';
import {UserService} from '../../services/user/user-service';
import {Reparacion,ReparacionService} from '../../services/reparaciones/reparaciones-service';
import {isLogged, isLoggedinAdmin, isLoggedinEncargado} from '../../services/isloggedin';


@Component({
  templateUrl: 'client/dev/reparaciones/templates/list.html',
  directives:[ROUTER_DIRECTIVES],
  providers: [ReparacionService, LoginService, UserService]
})

@CanActivate(() => isLogged())
export class ReparacionListCmp implements OnInit {
  reparacions: Reparacion[] = [];
  private _selectedId: string;
  public token: string;
  public profile: string;


  constructor(private _reparacionService: ReparacionService, private _userService: UserService, private _loginService: LoginService, private router: Router, routeParams: RouteParams) {
    this._selectedId = routeParams.get('id');
  }

  ngOnInit() {
    this._getAll();
  }

  private _getAll():void {
    this._reparacionService
        .getAll()
        .subscribe((reparaciones) => {
          this.reparacions = reparaciones;
        });
  
  }
  isSelected(reparacion:Reparacion){
    return reparacion._id === this._selectedId;
  }
  onSelect(reparacion:Reparacion){
    this.router.navigate(['DetailsReparacion',{id: reparacion._id}]);
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

  logout() {
      this._loginService.logout();
      this.router.navigate(['/Login']);
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

  

}
