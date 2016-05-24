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

import {isLogged, isLoggedinAdmin, isLoggedinEncargado} from '../../services/isloggedin';
import {Cliente, ClienteService} from '../../services/cliente/cliente-service';
import {LoginService} from '../../services/login-service';

@Component({
  templateUrl: 'client/dev/cliente/templates/list.html',
  directives:[ROUTER_DIRECTIVES],
  providers: [ClienteService, LoginService]
})

  @CanActivate(() => isLogged())
export class ClienteListCmp implements OnInit {
  clientes: Cliente[] = [];
  private _selectedId: string;


  constructor(private _clienteService: ClienteService, private _loginService: LoginService,private router: Router, routeParams: RouteParams) {
    this._selectedId = routeParams.get('id');
  }

  ngOnInit() {
    this._getAll();
  }

  private _getAll():void {
    this._clienteService
        .getAll()
        .subscribe((clientes) => {
          this.clientes = clientes;
        });
  }
  isSelected(cliente:Cliente){
    return cliente._id === this._selectedId;
  }
  onSelect(cliente:Cliente){
    this.router.navigate(['DetailsCliente',{id: cliente._id}]);
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
