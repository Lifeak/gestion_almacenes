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
import {isLogged, isLoggedinAdmin, isLoggedinEncargado} from '../../services/isloggedin';
import {Modelo, ModeloService} from '../../services/modelo/modelo-service';

@Component({
  templateUrl: 'client/dev/modelo/templates/list.html',
  directives:[ROUTER_DIRECTIVES],
  providers: [ModeloService, LoginService]
})

  @CanActivate(() => isLogged())
export class ModeloListCmp implements OnInit {
  modelos: Modelo[] = [];
  private _selectedId: string;


  constructor(private _modeloService: ModeloService, private _loginService: LoginService, public router: Router, routeParams: RouteParams) {
    this._selectedId = routeParams.get('id');
  }

  ngOnInit() {
    this._getAll();
  }

  private _getAll():void {
    this._modeloService
        .getAll()
        .subscribe((modelos) => {
          this.modelos = modelos;
        });
  }
  isSelected(modelo:Modelo){
    return modelo._id === this._selectedId;
  }
  onSelect(modelo:Modelo){
   // alert("vamos a bucar el modelo"+modelo._id + modelo.nombre);
    this.router.navigate(['/DetailsModelo',{id: modelo._id}]);

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
