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


import {Devolucion,DevolucionService} from '../../services/devolucion/devolucion-service';
import {isLogged, isLoggedinAdmin, isLoggedinEncargado} from '../../services/isloggedin';
import {LoginService} from '../../services/login-service';
import {UserService} from '../../services/user/user-service';

@Component({
  templateUrl: 'client/dev/devolucion/templates/list.html',
  directives:[ROUTER_DIRECTIVES],
  providers: [DevolucionService, LoginService, UserService]
})

  @CanActivate(() => isLogged())
export class DevolucionListCmp implements OnInit {
  devolucion: Devolucion[] = [];
  private _selectedId: string;
  public token: string;
  public profile: string;


  constructor(private _devolucionService: DevolucionService, private _loginService: LoginService, private _userService: UserService, private router: Router, routeParams: RouteParams) {
    this._selectedId = routeParams.get('id');
  }

  ngOnInit() {
    this._getAllPopulate();
  }


  private _getAll():void {
    this._devolucionService
        .getAll()
        .subscribe((devolucion) => {
         this.devolucion = devolucion;        
        });
  }

  private _getAllPopulate():void {
    this._devolucionService
        .getAllPopulate()
        .subscribe((devolucion) => {
         this.devolucion = devolucion; 
         //alert("el listado de devoluciones son "+JSON.stringify(this.devolucion));
        
        });
  }

  isSelected(devolucion:Devolucion){
    return devolucion._id === this._selectedId;
  }

  onSelect(devolucion:Devolucion){
    this.router.navigate(['DetailsDevolucion',{id: devolucion._id}]);
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

  logout() {
    this._loginService.logout();
    this.router.navigate(['/Login']);
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
}
