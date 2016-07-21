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


import {Producto,ProductoService} from '../../services/producto/producto-service';
import {LoginService} from '../../services/login-service';
import {isLogged, isLoggedinAdmin, isLoggedinEncargado} from '../../services/isloggedin';
import {UserService} from '../../services/user/user-service';


@Component({
  templateUrl: 'client/dev/producto/templates/details.html',
  providers: [UserService, LoginService,ProductoService]
})

@CanActivate(() => isLogged())
export class ProductoDetailsCmp implements OnInit {
  @Input() producto: Producto;
  productoForm: ControlGroup;
  public token: string;
  public profile: string;

  constructor( @Inject(FormBuilder) fb: FormBuilder, private router: Router, private _routeParams: RouteParams, private _userService: UserService, private _productoService: ProductoService, @Inject(LoginService) private _loginService: LoginService) {
    this.productoForm = fb.group({
      "_id": ["", Validators.required],
      "nombre": ["", Validators.required],
      "modelo": ["", Validators.required],
      "estado": ["", Validators.required],      
      "caracteristicas": [""],
      "almacen": ["",Validators.required],
      "vendido":["",Validators.required],
      "carcasa":["",Validators.required],
      "columna":["",Validators.required],
      "precio":[""]
    });
  }
  

  ngOnInit() {
    let id = this._routeParams.get('id');
    this._productoService
    .getProductoId(id)
    .subscribe((producto) => {
    this.producto = producto;
    });
  }

  gotoIndex(){
    let productoId = this.producto ? this.producto._id : null;
    this.router.navigate(['/ListProductos']);
  }

  private _getAll():void {
    this._productoService
        .getAll()
        .subscribe((productos) => {
          this.producto = productos;
        });
  }

  buscar(nombre:string){
      this.router.navigate(['DetailsSubPieza', { _id: nombre }]);
  }

  edit(producto: Producto){
    let id = this._routeParams.get('id');
      if (producto.precio.toString().indexOf(',') != -1) {
        alert("Error.El producto no se puede modificar ya que el precio es incorrecto. Utiliza el . para los decimales.");

      }else{
        this._productoService
          .remove(id)
          .subscribe(() => {
            return this.producto;

          });

        this._productoService
          .add(producto._id, producto.nombre, producto.modelo, producto.estado, producto.caracteristicas, producto.almacen, producto.vendido, producto.compuestoPor, producto.precio)
          .subscribe((m) => {
            (<Control>this.productoForm.controls['_id']).updateValue("");
            (<Control>this.productoForm.controls['nombre']).updateValue("");
            (<Control>this.productoForm.controls['modelo']).updateValue("");
            (<Control>this.productoForm.controls['estado']).updateValue("");
            (<Control>this.productoForm.controls['caracteristicas']).updateValue("");
            (<Control>this.productoForm.controls['almacen']).updateValue("");
            (<Control>this.productoForm.controls['vendido']).updateValue("");
            (<Control>this.productoForm.controls['carcasa']).updateValue("");
            (<Control>this.productoForm.controls['columna']).updateValue("");
            (<Control>this.productoForm.controls['precio']).updateValue("");

          });
        this.gotoIndex();
    }
  }

  delete(producto: Producto) {
    let id = this._routeParams.get('id');
    this._productoService
      .remove(id)
      .subscribe(() => {
      return this.producto;
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
