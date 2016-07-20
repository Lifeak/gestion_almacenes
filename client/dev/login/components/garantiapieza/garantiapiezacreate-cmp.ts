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
import {Garantiapieza, GarantiapService} from '../../services/garantiapieza/garantiapieza-service';
import {UserService} from '../../services/user/user-service';


@Component({
  templateUrl: 'client/dev/garantiapieza/templates/create.html',
  providers:[LoginService, UserService, GarantiapService]
})

  @CanActivate(() => isLogged())
export class GarantiapCreateCmp{
  @Input() garantiap: Garantiapieza;
  garantiapForm: ControlGroup;
  garantiasp: Garantiapieza[]=[];
  public token: string;
  public profile: string;

  constructor(@Inject(FormBuilder) fb: FormBuilder,private router: Router, private _loginService: LoginService, private _userService: UserService, private _routeParams: RouteParams, private _garantiapService: GarantiapService){
    this.garantiapForm = fb.group({
      "idp": ["", Validators.required],
      "fingarantia": ["", Validators.required]
     });
  }

  gotoIndex(){
    this.router.navigate(['/ListGarantiaP']);
  }

  goBack(){
    window.history.back();
  }

  save(datos: FormData){
      var idp: string = this.garantiapForm.controls['idp'].value; 
      var fingarantia: Date = this.garantiapForm.controls['fingarantia'].value;
      this._garantiapService
          .add(idp, fingarantia)
          .subscribe((m) => {
      (<Control>this.garantiapForm.controls['idp']).updateValue("");
      (<Control>this.garantiapForm.controls['fingarantia']).updateValue("");
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
