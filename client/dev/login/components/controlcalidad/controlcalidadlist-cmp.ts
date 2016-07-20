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
import {ControlCalidad,ControlService} from '../../services/controlcalidad/controlcalidad-service';
import {isLogged, isLoggedinAdmin, isLoggedinEncargado} from '../../services/isloggedin';


@Component({
  templateUrl: 'client/dev/controlcalidad/templates/list.html',
  directives:[ROUTER_DIRECTIVES],
  providers: [ControlService, LoginService, UserService]
})

@CanActivate(() => isLogged())
export class ControlListCmp implements OnInit {
  controles: ControlCalidad[] = [];
  private _selectedId: string;
  public token: string;
  public profile: string;


  constructor(private _controlService: ControlService, private _userService: UserService, private _loginService: LoginService, private router: Router, routeParams: RouteParams) {
    this._selectedId = routeParams.get('id');
  }

  ngOnInit() {
    this._getAll();
  }

  private _getAll():void {
    this._controlService
        .getAll()
        .subscribe((controles) => {
          this.controles = controles;
        });
  
  }
  isSelected(control:ControlCalidad){
    return control._id === this._selectedId;
  }
  onSelect(control:ControlCalidad){
    this.router.navigate(['DetailsControlCalidad',{id: control._id}]);
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

  galmacenes() {
      this.router.navigate(['/ListAlmacenes']);
  }

  ggarantias() {
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
  gclientes() {
    this.router.navigate(['/ListClientes']);
  }

  greparaciones(){
    this.router.navigate(['/ListReparaciones']);
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
