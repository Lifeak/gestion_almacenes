import {
  Component,
  Input,
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
  RouteParams,
  CanActivate,
  ROUTER_DIRECTIVES,
  Router
} from 'angular2/router';

import {isLogged, isLoggedinAdmin, isLoggedinEncargado} from '../../services/isloggedin';
import {Pedidocompra, ComprasService} from '../../services/pedidocompra/pedidocompra-service';
import {LoginService} from '../../services/login-service';
import {UserService} from '../../services/user/user-service';


@Component({
  templateUrl: 'client/dev/pedidocompra/templates/details.html',
  directives:[ROUTER_DIRECTIVES],
  providers: [LoginService, UserService, ComprasService]

})

  @CanActivate(() => isLogged())
export class CompraDetailsCmp implements OnInit {
  @Input() pedidocompras: Pedidocompra;
  pedidocompraForm: ControlGroup;
  mat: Array<Object>=[];
  entregas: Array<Object>=[];
  pedidas:number;
  pendientes:number;
  selectModelo:string;
  public token: string;
  public profile: string;

  constructor( @Inject(FormBuilder) fb: FormBuilder, private router: Router, private _routeParams: RouteParams, private _userService: UserService, private _comprasService: ComprasService, @Inject(LoginService) private _loginService: LoginService) {
    this.pedidocompraForm = fb.group({
      "modelo": ["", Validators.required],
      "udsPedidas": ["", Validators.required],
      "udsPendientes": [""],
      "udsEntregadas": [""],
      "fechaEntrega": [""],
      "albaran": [""]
    });
  }
  

  ngOnInit() {
    let id = this._routeParams.get('id');
    this._comprasService
    .getPedidoCompraID(id)
    .subscribe((pedido) => {
      this.pedidocompras = pedido;
      this.mat = this.pedidocompras.productos;
    });

  }

  public gotoIndex(){
    this.router.navigate(['/ListCompras']);
  }
  
  private _getAll():void {
    this._comprasService
        .getAll()
        .subscribe((pedidos) => {
          this.pedidocompras = pedidos;
        });

  }

  // Nos permite añadir entregas de un modelo en concreto de un pedido de compra en particular
  plus(datos: FormData, modelo: string, pedidocompra: Pedidocompra) {
    var fechaEntrega: Date = this.pedidocompraForm.controls['fechaEntrega'].value;
    var albaran: string = this.pedidocompraForm.controls['albaran'].value;
    var udsEntregadas: number = this.pedidocompraForm.controls['udsEntregadas'].value;
    if (fechaEntrega == null || albaran == "" || udsEntregadas.toString() == "") {
      alert("Debes rellenar todos los campos sobre la entrega.");
    } else {
      (<Control>this.pedidocompraForm.controls['fechaEntrega']).updateValue("");
      (<Control>this.pedidocompraForm.controls['albaran']).updateValue("");
      (<Control>this.pedidocompraForm.controls['udsEntregadas']).updateValue("");
     var nuevo: Object = {udsEntregadas, fechaEntrega, albaran};

      for (var i = 0; i < pedidocompra.productos.length; i++) {
        if (pedidocompra.productos[i].modelo==modelo){
          pedidocompra.productos[i].udsPendientes=pedidocompra.productos[i].udsPendientes-udsEntregadas;
          pedidocompra.productos[i].entregas.push(nuevo);
        }
      }
    }
    
  }

  // Nos ofrece el listado de entregas de un producto concreto de un pedido de compra en particular
  searchentregas(pedidocompra:Pedidocompra, modelo:string){
    for (var i = 0; i < pedidocompra.productos.length; i++) {
        if (pedidocompra.productos[i].modelo==modelo){
          this.selectModelo = modelo;
          this.pedidas = pedidocompra.productos[i].udsPedidas;
          this.pendientes = pedidocompra.productos[i].udsPendientes;
          this.entregas = [];
          this.entregas = pedidocompra.productos[i].entregas; 
        }
      }

  }

  //Esta función guarda los cambios que se hayan realizado en un pedido
  save(pedidocompra:Pedidocompra){
    let id = this._routeParams.get('id');
    this._comprasService
      .add(pedidocompra.fechapedido,pedidocompra.almacen, pedidocompra.proveedor, pedidocompra.productos)
      .subscribe((m) => {
          (<Control>this.pedidocompraForm.controls['fechaEntrega']).updateValue("");
          (<Control>this.pedidocompraForm.controls['albaran']).updateValue("");
          (<Control>this.pedidocompraForm.controls['udsEntregadas']).updateValue("");

    });

    this._comprasService
    .remove(id)
    .subscribe(() => {
      return this.pedidocompras;
    });
    this.router.navigate(['/ListCompras']);
  }

  delete(pedidocompra: Pedidocompra) {
    this._comprasService
      .remove(pedidocompra._id)
      .subscribe(() => {
        return this.pedidocompras;

      });
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
