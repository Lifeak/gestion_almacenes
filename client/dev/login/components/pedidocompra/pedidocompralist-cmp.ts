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


import {Pedidocompra,ComprasService} from '../../services/pedidocompra/pedidocompra-service';
import {isLogged, isLoggedinAdmin, isLoggedinEncargado} from '../../services/isloggedin';
import {LoginService} from '../../services/login-service';
import {UserService} from '../../services/user/user-service';

@Component({
  templateUrl: 'client/dev/pedidocompra/templates/list.html',
  directives:[ROUTER_DIRECTIVES],
  providers: [ComprasService, LoginService, UserService]
})

  @CanActivate(() => isLogged())
export class ComprasListCmp implements OnInit {
  pedidocompras: Pedidocompra[] = [];
  completo: boolean[] = [];
  private _selectedId: string;
  public token: string;
  public profile: string;


  constructor(private _comprasService: ComprasService, private _loginService: LoginService, private _userService: UserService, private router: Router, routeParams: RouteParams) {
    this._selectedId = routeParams.get('id');
  }

  ngOnInit() {
    this._getAll();
  }

  private _getAll():void {
    this._comprasService
        .getAll()
        .subscribe((pedidos) => {
         this.pedidocompras = pedidos;
         //Buscamos dentro de cada pedido, si todos los productos pedidos han llegado en su totalidad a nuestros
         //almacenes. En tal caso, completo será true. Si alguno o ningun producto ha llegado será false.
          for (var i = 0; i < this.pedidocompras.length; i++) {
            this.completo[i]=true;
            for(var j = 0; j < this.pedidocompras[i].productos.length; j++){              
              if(this.pedidocompras[i].productos[j].udsPendientes>0){
                this.completo[i]=false;   
              }
            }
          } 
          
        });
  }

  isSelected(pedidocompra:Pedidocompra){
    return pedidocompra._id === this._selectedId;
  }

  onSelect(pedidocompra:Pedidocompra){
    this.router.navigate(['DetailsCompra',{id: pedidocompra._id}]);
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

  gpedidocompra(){
    this.router.navigate(['/ListCompras']);
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
