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
import {Garantiapieza, GarantiapService} from '../../services/garantiapieza/garantiapieza-service';
import {LoginService} from '../../services/login-service';
import {UserService} from '../../services/user/user-service';


@Component({
  templateUrl: 'client/dev/garantiapieza/templates/details.html',
  directives:[ROUTER_DIRECTIVES],
  providers: [LoginService, UserService, GarantiapService]

})

  @CanActivate(() => isLogged())
export class GarantiapDetailsCmp implements OnInit {
  @Input() garantiap: Garantiapieza;
  garantiapForm: ControlGroup;
  public token: string;
  public profile: string;
  public myDate: Date;

  constructor( @Inject(FormBuilder) fb: FormBuilder, private router: Router, private _routeParams: RouteParams, private _userService: UserService, private _garantiapService: GarantiapService, @Inject(LoginService) private _loginService: LoginService) {
    this.garantiapForm = fb.group({
      "idp": ["", Validators.required],
      "fingarantia": ["", Validators.required]
    });
  }
  

  ngOnInit() {
    let id = this._routeParams.get('id');
    this._garantiapService
    .getGarantiapiezaID(id)
    .subscribe((devolucion) => {
      this.garantiap = devolucion;
      this.myDate = this.garantiap.fingarantia;
    });
  }

  public gotoIndex(){
    this.router.navigate(['/ListGarantiaP']);
  }
  
  private _getAll():void {
    this._garantiapService
        .getAll()
        .subscribe((garantia) => {
          this.garantiap = garantia;
        });
  }

  edit(garantiap:Garantiapieza){
    var fingarantia = <Control>this.garantiapForm.controls['idp'].value;
    if(fingarantia==null){
      garantiap.fingarantia=this.myDate;
    }
    this._garantiapService
        .add(garantiap.idp, garantiap.fingarantia)
        .subscribe((m) => {
    (<Control>this.garantiapForm.controls['idp']).updateValue("");
    (<Control>this.garantiapForm.controls['fingarantia']).updateValue("");
    });      

    this._garantiapService
    .remove(garantiap._id)
    .subscribe(() => {
      return this.garantiap;
    });
    this.router.navigate(['/ListGarantiaP']);
  }

  delete(garantiap: Garantiapieza) {
    this._garantiapService
      .remove(garantiap._id)
      .subscribe(() => {
        return this.garantiap;

      });
    this.router.navigate(['/ListGarantiaP']);

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
