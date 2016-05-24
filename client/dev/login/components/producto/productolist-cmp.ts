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
import {LoginService} from '../../services/login-service';
import {Producto,ProductoService} from '../../services/producto/producto-service';

@Component({
  selector: 'ListProductos',
  templateUrl: 'client/dev/producto/templates/list.html',
  directives:[ROUTER_DIRECTIVES],
  providers: [ProductoService]
})

  @CanActivate(() => isLogged())
export class ProductoListCmp implements OnInit {
  productos: Producto[] = [];
  private _selectedId: string;


  constructor(private _productoService: ProductoService, private _loginService: LoginService,private router: Router, routeParams: RouteParams) {
    this._selectedId = routeParams.get('id');
  }

  ngOnInit() {
    this._getAll();
  }

  private _getAll():void {
    this._productoService
        .getAll()
        .subscribe((productos) => {
          this.productos = productos;
        });
  }
  isSelected(producto:Producto){
    return producto._id === this._selectedId;
  }
  onSelect(producto:Producto){
    this.router.navigate(['DetailsProducto',{id: producto._id}]);
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
