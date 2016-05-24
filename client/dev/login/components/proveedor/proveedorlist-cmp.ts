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


import {Proveedor,ProveedorService} from '../../services/proveedor/proveedor-service';
import {isLogged, isLoggedinAdmin, isLoggedinEncargado} from '../../services/isloggedin';
import {LoginService} from '../../services/login-service';


@Component({
  selector: 'ListProveedores',
  templateUrl: 'client/dev/proveedor/templates/list.html',
  directives:[ROUTER_DIRECTIVES],
  providers: [ProveedorService]
})

  @CanActivate(() => isLogged())
export class ProveedorListCmp implements OnInit {
  proveedors: Proveedor[] = [];
  private _selectedId: string;


  constructor(private _proveedorService: ProveedorService, private _loginService: LoginService, private router: Router, routeParams: RouteParams) {
    this._selectedId = routeParams.get('id');
  }

  ngOnInit() {
    this._getAll();
  }

  private _getAll():void {
    this._proveedorService
        .getAll()
        .subscribe((proveedores) => {
          this.proveedors = proveedores;
          //alert("proveedores son"+this.proveedors[1].nombre);
        });
  }
  isSelected(proveedor:Proveedor){
    return proveedor._id === this._selectedId;
  }
  onSelect(proveedor:Proveedor){
    this.router.navigate(['DetailsProveedor',{id: proveedor._id}]);
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
