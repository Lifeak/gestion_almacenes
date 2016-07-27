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
import {LoginService} from '../../services/login-service';
import {Pedidocompra, ComprasService} from '../../services/pedidocompra/pedidocompra-service';
import {UserService} from '../../services/user/user-service';
import {Modelo} from '../../services/modelo/modelo-service';
import {Almacen} from '../../services/almacen/almacen-service';
import {Proveedor} from '../../services/proveedor/proveedor-service';

@Component({
  templateUrl: 'client/dev/pedidocompra/templates/create.html',
  providers:[LoginService, UserService, ComprasService]
})

  @CanActivate(() => isLogged())
export class CompraCreateCmp{
  @Input() pedidocompra: Pedidocompra;
  pedidocompraForm: ControlGroup;
  modelos: Modelo[]=[];
  almacens: Almacen[]=[];
  proveedors: Proveedor[]=[];
  prod: Array<Object> = [];
  cuenta: Array<string> = [];
  public token: string;
  public profile: string;

  constructor(@Inject(FormBuilder) fb: FormBuilder,private router: Router, private _loginService: LoginService, private _userService: UserService, private _routeParams: RouteParams, private _comprasService: ComprasService){
    this.pedidocompraForm = fb.group({
      "fechapedido": ["", Validators.required],
      "almacen": ["", Validators.required],
      "proveedor": ["", Validators.required],
      "modelo": [""],
      "udsPedidas": [""]
     });
  }

  ngOnInit(){
   this._comprasService
    .getModelos()
    .subscribe((modelos) => {
    this.modelos = modelos; 
   });
   this._comprasService
    .getProveedores()
    .subscribe((proveedores) => {
    this.proveedors = proveedores; 
   });
    this._comprasService
    .getAlmacenes()
    .subscribe((almacenes) => {
    this.almacens = almacenes; 
   });
  }
  
  gotoIndex(){
    this.router.navigate(['/ListCompras']);
  }

  goBack(){
    window.history.back();
  }

  plus (datos: FormData){
    var modelo: string = this.pedidocompraForm.controls['modelo'].value;
    var udsPedidas: number = this.pedidocompraForm.controls['udsPedidas'].value;
    var udsPendientes:number = udsPedidas;
    if (modelo == "" || udsPedidas <= 0 ) {
      alert("Debes seleccionar el modelo y las unidades correctamente.");
    } else {
      (<Control>this.pedidocompraForm.controls['modelo']).updateValue("");
      (<Control>this.pedidocompraForm.controls['udsPedidas']).updateValue("");

      this.cuenta.push(modelo);
      var m: Object = { modelo, udsPedidas, udsPendientes};
      this.prod.push(m);
      m = [];
  }
}

  minus(pos:number) {
    this.prod.splice(pos, 1);
    this.cuenta.splice(pos, 1);
  }

  save(datos: FormData){
      var fechapedido: Date = this.pedidocompraForm.controls['fechapedido'].value; 
      var almacen: string = this.pedidocompraForm.controls['almacen'].value;
      var proveedor: string = this.pedidocompraForm.controls['proveedor'].value;
      var modelo: string = this.pedidocompraForm.controls['modelo'].value;
      var udsPedidas: number = this.pedidocompraForm.controls['udsPedidas'].value;
      var udsPendientes: number = udsPedidas;
      var productos = this.prod;
      if(this.prod.length==0){
          alert("Debes añadir los materiales del pedido.");
      }else{
          this._comprasService
              .add(fechapedido,almacen,proveedor,productos)
              .subscribe((m) => {
          (<Control>this.pedidocompraForm.controls['fechapedido']).updateValue("");
          (<Control>this.pedidocompraForm.controls['almacen']).updateValue("");
          (<Control>this.pedidocompraForm.controls['proveedor']).updateValue("");
          (<Control>this.pedidocompraForm.controls['modelo']).updateValue("");
          (<Control>this.pedidocompraForm.controls['udsPedidas']).updateValue("");
          });
          this.gotoIndex();    
      }
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
   gtransportes(){
     this.router.navigate(['/ListTransportes']);
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
