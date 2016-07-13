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
  Router
} from 'angular2/router';

import {isLogged, isLoggedinAdmin, isLoggedinEncargado} from '../../services/isloggedin';
import {Venta, VentasService} from '../../services/ventas/ventas-service';
import {LoginService} from '../../services/login-service';
import {UserService} from '../../services/user/user-service';


@Component({
  templateUrl: 'client/dev/ventas/templates/details.html',
  providers:[UserService, LoginService, VentasService]
})

  @CanActivate(() => isLogged())
export class VentaDetailsCmp implements OnInit {
  @Input() venta: Venta;
  ventaForm: ControlGroup;
  public token: string;
  public profile: string;
  aux:Object;

  constructor( @Inject(FormBuilder) fb: FormBuilder, private router: Router, private _routeParams: RouteParams, private _ventaService: VentasService,private _userService: UserService, @Inject(LoginService) private _loginService: LoginService) {
    this.ventaForm = fb.group({
      "_id": ["", Validators.required]
    });
  }
  

  ngOnInit() {
    let id = this._routeParams.get('id');
    this._ventaService
    .getVentaId(id)
    .subscribe((venta) => {
      this.venta = venta;      
    });
  }

  gotoIndex(){
    this.router.navigate(['/ListVentas']);
  }

  private _getAll():void {
    this._ventaService
        .getAll()
        .subscribe((venta) => {
          this.venta = venta;
        });
  }
  
  edit(venta: Venta){
     this._ventaService
      .add(venta.cliente,venta.direccionEnvio,venta.ciudad,venta.pais,venta.numPedido,venta.fechaSalida,venta.finGarantia,venta.transporte,venta.agente,venta.observaciones,venta.lineaventa)
      .subscribe((m) => {          
          (<Control>this.ventaForm.controls['observaciones']).updateValue("");
    });

    this._ventaService
      .remove(venta._id)
      .subscribe(() => {
        return this.venta;

      });
    this.gotoIndex();

  }

  delete(venta: Venta) {
    this._ventaService
      .remove(venta._id)
      .subscribe(() => {
      return this.venta;

      });
    this.gotoIndex();

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

  ggarantias() {
    this.router.navigate(['/ListGarantias']);
  }
  galmacenes() {
    this.router.navigate(['/ListAlmacenes']);
  }
  gclientes() {
    this.router.navigate(['/ListClientes']);
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
