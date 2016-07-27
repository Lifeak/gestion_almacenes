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
import {Reparacion, ReparacionService} from '../../services/reparaciones/reparaciones-service';
import {isLogged, isLoggedinAdmin, isLoggedinEncargado} from '../../services/isloggedin';

@Component({
  templateUrl: 'client/dev/reparaciones/templates/create.html',
  providers:[LoginService, ReparacionService, UserService]
})

@CanActivate(() => isLoggedinAdmin())
export class ReparacionCreateCmp{
  @Input() reparacion: Reparacion;
  reparacionForm: ControlGroup;
  public token: string;
  public profile: string;

  constructor(@Inject(FormBuilder) fb: FormBuilder,private router: Router, private _routeParams: RouteParams,private _loginService: LoginService, private _reparacionService: ReparacionService, private _userService: UserService){
    this.reparacionForm = fb.group({
      "numincidencia": ["", Validators.required],
      "idproducto": ["", Validators.required],
      "estado": ["", Validators.required],
      "fechacambio": [""],
      "observaciones": [""]
    });
  }
  
  gotoIndex(){
    this.router.navigate(['/ListReparaciones']);

  }

  save(datos: FormData){
      var numincidencia: string = this.reparacionForm.controls['numincidencia'].value;
      var idproducto: string = this.reparacionForm.controls['idproducto'].value;
      var estado: string = this.reparacionForm.controls['estado'].value;
      var fechacambio: Date = this.reparacionForm.controls['fechacambio'].value;
      var observaciones: string = this.reparacionForm.controls['observaciones'].value;

       this._reparacionService
              .add(numincidencia,idproducto,estado,fechacambio,observaciones)
              .subscribe((m) => {
          (<Control>this.reparacionForm.controls['numincidencia']).updateValue("");
          (<Control>this.reparacionForm.controls['idproducto']).updateValue("");
          (<Control>this.reparacionForm.controls['estado']).updateValue("");
          (<Control>this.reparacionForm.controls['fechacambio']).updateValue("");
          (<Control>this.reparacionForm.controls['observaciones']).updateValue("");
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
