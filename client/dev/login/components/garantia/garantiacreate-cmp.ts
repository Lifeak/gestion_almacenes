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

import {LoginService} from '../../services/login-service';
import {isLogged, isLoggedinAdmin, isLoggedinEncargado} from '../../services/isloggedin';
import {Garantia,GarantiaService} from '../../services/garantia/garantia-service';
import {UserService} from '../../services/user/user-service';

@Component({
  templateUrl: 'client/dev/garantia/templates/create.html',
  providers:[LoginService,UserService, GarantiaService]
})

  @CanActivate(() => isLogged())
export class GarantiaCreateCmp{
  @Input() garantia: Garantia;
  garantiaForm: ControlGroup;
  public token: string;
  public profile: string;

  constructor(@Inject(FormBuilder) fb: FormBuilder,private router: Router, private _routeParams: RouteParams, private _garantiaService: GarantiaService, private _loginService: LoginService){
    this.garantiaForm = fb.group({
      "_id": ["", Validators.required],
      "tiempo": ["", Validators.required]
    });
  }
  
  gotoIndex(){
    let garantiaId = this.garantia ? this.garantia._id : null;
    this.router.navigate(['/ListGarantias']);

  }

  goBack(){
    window.history.back();
  }

  save(datos: FormData){
      var _id: string = this.garantiaForm.controls['_id'].value;
      var tiempo: number = this.garantiaForm.controls['tiempo'].value;
       this._garantiaService
              .add(_id,tiempo)
              .subscribe((m) => {
          (<Control>this.garantiaForm.controls['_id']).updateValue("");
          (<Control>this.garantiaForm.controls['tiempo']).updateValue("");

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

  almacenes() {
      this.router.navigate(['/ListAlmacenes']);
  }
  usuarios() {
    this.router.navigate(['/ListUsuarios']);
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
  galmacenes() {
    this.router.navigate(['/ListAlmacenes']);
  }
  gclientes() {
    this.router.navigate(['/ListClientes']);
  }
  gusuarios() {
    if (localStorage.getItem(this.token) == "encargado") {
      let u = localStorage.key(1);
      // alert("1en u tenemos " + u);
      if (u == "undefined") {
        let e = localStorage.key(0);
        //alert("2en u tenemos " + u);
        this.getProfile(e);
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
        //alert("en el get, el id es " +this.profile);
      });
  }
}
