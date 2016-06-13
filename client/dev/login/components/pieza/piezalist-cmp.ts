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
import {Pieza,PiezaService} from '../../services/pieza/pieza-service';
import {UserService} from '../../services/user/user-service';
import {isLogged, isLoggedinAdmin, isLoggedinEncargado} from '../../services/isloggedin';

@Component({
  templateUrl: 'client/dev/pieza/templates/list.html',
  directives:[ROUTER_DIRECTIVES],
  providers: [PiezaService, LoginService, UserService]
})

  @CanActivate(() => isLogged())
export class PiezaListCmp implements OnInit {
  piezas: Pieza[] = [];
  private _selectedId: string;
  public token: string;
  public profile: string;


  constructor(private _piezaService: PiezaService, private _loginService: LoginService, private _userService: UserService, private router: Router, routeParams: RouteParams) {
    this._selectedId = routeParams.get('id');
  }

  ngOnInit() {
    this._getAll();
  }

  private _getAll():void {
    this._piezaService
        .getAll()
        .subscribe((piezas) => {
          this.piezas = piezas;
        });
  }
  isSelected(pieza:Pieza){
    return pieza._id === this._selectedId;
  }
  onSelect(pieza:Pieza){
    this.router.navigate(['DetailsPieza',{id: pieza._id}]);
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
