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

import {isLogged, isLoggedinAdmin, isLoggedinEncargado} from '../../services/isloggedin';
import {Reparacion, ReparacionService} from '../../services/reparaciones/reparaciones-service';
import {LoginService} from '../../services/login-service';
import {UserService} from '../../services/user/user-service';

@Component({
  templateUrl: 'client/dev/reparaciones/templates/details.html',
  providers:[UserService, ReparacionService, LoginService]
})

  @CanActivate(() => isLoggedinAdmin())
export class ReparacionDetailsCmp implements OnInit {
  @Input() reparacion: Reparacion;
  reparacionForm: ControlGroup;
  token: string;
  public profile: string;
  public myDate: Date;

  constructor( @Inject(FormBuilder) fb: FormBuilder, private router: Router, private _routeParams: RouteParams, private _reparacionService: ReparacionService, @Inject(LoginService) private _loginService: LoginService, private _userService: UserService) {
    this.reparacionForm = fb.group({
      "numincidencia": ["", Validators.required],
      "idproducto": ["", Validators.required],
      "estado": ["", Validators.required],
      "fechacambio": ["", Validators.required],
      "observaciones": ["", Validators.required]
    });
  }
  

  ngOnInit() {
    let id = this._routeParams.get('id');
    this.myDate = null;
    this._reparacionService
    .getReparacionId(id)
    .subscribe((reparacion) => {
      this.reparacion = reparacion;
      if(this.reparacion.fechacambio!=null)
        this.myDate = this.reparacion.fechacambio;
    });
  }

  gotoIndex(){
    this.router.navigate(['/ListReparaciones']);
  }


  edit(reparacion: Reparacion){
    if(reparacion.fechacambio==null){
      reparacion.fechacambio = this.myDate;
    }
    this._reparacionService
      .add(reparacion.numincidencia,reparacion.idproducto,reparacion.estado,reparacion.fechacambio,reparacion.observaciones)
      .subscribe((m) => {
          
          (<Control>this.reparacionForm.controls['numincidencia']).updateValue("");
          (<Control>this.reparacionForm.controls['idproducto']).updateValue("");
          (<Control>this.reparacionForm.controls['estado']).updateValue("");
          (<Control>this.reparacionForm.controls['fechacambio']).updateValue("");
          (<Control>this.reparacionForm.controls['observaciones']).updateValue("");
    });

    this._reparacionService
      .remove(reparacion._id)
      .subscribe(() => {
        return this.reparacion;

      });
    this.gotoIndex();

  }

  delete(reparacion: Reparacion) {
    this._reparacionService
      .remove(reparacion._id)
      .subscribe(() => {
        return this.reparacion;

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
      localStorage.clear();
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
