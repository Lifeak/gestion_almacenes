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
  Router,
  CanActivate
} from 'angular2/router';

import {LoginService} from '../../services/login-service';
import {UserService} from '../../services/user/user-service';
import {AlmacenService, Almacen} from '../../services/almacen/almacen-service';
import {isLogged, isLoggedinAdmin, isLoggedinEncargado} from '../../services/isloggedin';

@Component({
  templateUrl: 'client/dev/almacen/templates/create.html',
  providers:[LoginService, AlmacenService, UserService]
})

@CanActivate(() => isLoggedinAdmin())
export class AlmacenCreateCmp{
  @Input() almacen: Almacen;
  almacenForm: ControlGroup;
  public token: string;
  public profile: string;

  constructor(@Inject(FormBuilder) fb: FormBuilder,private router: Router, private _routeParams: RouteParams,private _loginService: LoginService, private _almacenService: AlmacenService, private _userService: UserService){
    this.almacenForm = fb.group({
      "nombre": ["", Validators.required],
      "direccion": ["", Validators.required],
      "ciudad": ["", Validators.required],
      "pais": ["", Validators.required],
      "telefono": ["", Validators.required],
      "encargado": ["", Validators.required]
    });
  }
  
  gotoIndex(){
    let userId = this.almacen ? this.almacen._id : null;
    this.router.navigate(['/ListAlmacenes']);

  }

  save(datos: FormData){
      var nombre: string = this.almacenForm.controls['nombre'].value;
      var direccion: string = this.almacenForm.controls['direccion'].value;
      var ciudad: string = this.almacenForm.controls['ciudad'].value;
      var pais: string = this.almacenForm.controls['pais'].value;
      var telefono: string = this.almacenForm.controls['telefono'].value;
      var encargado: string = this.almacenForm.controls['encargado'].value;

       this._almacenService
              .add(nombre,direccion,ciudad,pais,telefono,encargado)
              .subscribe((m) => {
          (<Control>this.almacenForm.controls['nombre']).updateValue("");
          (<Control>this.almacenForm.controls['direccion']).updateValue("");
          (<Control>this.almacenForm.controls['ciudad']).updateValue("");
          (<Control>this.almacenForm.controls['pais']).updateValue("");
          (<Control>this.almacenForm.controls['telefono']).updateValue("");
          (<Control>this.almacenForm.controls['encargado']).updateValue("");
              });

          this.gotoIndex();

  }

  compras() {
    this.router.navigate(['/Compras']);
  }

  ventas() {
    this.router.navigate(['/Ventas']);
  }

  goalmacen() {
    this.router.navigate(['/Almacen']);
  }

  admin() {
    this.router.navigate(['/Admin']);
  }
  logout() {
      this._loginService.logout();
      this.router.navigate(['/Login']);
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

}
