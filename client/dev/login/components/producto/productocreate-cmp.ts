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


import {ProductoService,Producto} from '../../services/producto/producto-service';
import {Modelo} from '../../services/modelo/modelo-service';
import {isLogged, isLoggedinAdmin, isLoggedinEncargado} from '../../services/isloggedin';
import {LoginService} from '../../services/login-service';
import {UserService} from '../../services/user/user-service';


@Component({
  templateUrl: 'client/dev/producto/templates/create.html',
  providers:[UserService, LoginService, ProductoService]
})


  @CanActivate(() => isLogged())
export class ProductoCreateCmp implements OnInit{
  @Input() producto: Producto;
  modelos: Modelo[]=[];
  productoForm: ControlGroup;
  components: Array<string>;
  public token: string;
  public profile: string;
  
  constructor(@Inject(FormBuilder) fb: FormBuilder,private router: Router, private _routeParams: RouteParams, private _userService: UserService, private _productoService: ProductoService, private _loginService: LoginService){
    this.productoForm = fb.group({
      "_id": ["", Validators.required],
      "nombre": ["", Validators.required],
      "modelo": ["", Validators.required],
      "estado": ["",Validators.required],
      "caracteristicas": [""],
      "almacen": ["",Validators.required],
      "vendido": ["", Validators.required],
      "carcasa": ["",Validators.required],
      "columna": ["",Validators.required],
      "precio": [""]
    });
     this.components = [];
      
  }

  ngOnInit(){
   this._productoService
    .getModelos()
    .subscribe((modelos) => {
    this.modelos = modelos; 
    });
   
  }
  
  gotoIndex(){
    this.router.navigate(['/ListProductos']);

  }

  goBack(){
    window.history.back();
  }

  save(datos: FormData){
      
      var _id: string = this.productoForm.controls['_id'].value;
      var nombre: string = this.productoForm.controls['nombre'].value;
      var modelo: string = this.productoForm.controls['modelo'].value;
      var estado: string = this.productoForm.controls['estado'].value;
      var caracteristicas = this.productoForm.controls['caracteristicas'].value;
      var almacen: string = this.productoForm.controls['almacen'].value;
      var vendido: boolean = this.productoForm.controls['vendido'].value;
      var carcasa: string = this.productoForm.controls['carcasa'].value;
      var columna: string = this.productoForm.controls['columna'].value;
      this.components.push(carcasa);
      this.components.push(columna);
      var compuestoPor: Array<string> = this.components;
      var precio: number = this.productoForm.controls['precio'].value;
      if(precio.toString().indexOf(',')!=-1){
        alert("El producto no se añadirá ya que el precio es incorrecto. Utiliza el . para los decimales.");
      }else{
        this._productoService
          .add(_id,nombre,modelo,estado,caracteristicas,almacen,vendido,compuestoPor,precio)
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
