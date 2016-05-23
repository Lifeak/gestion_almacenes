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

@Component({
  templateUrl: 'client/dev/garantia/templates/create.html'
})

  @CanActivate(() => isLogged())
export class GarantiaCreateCmp{
  @Input() garantia: Garantia;
  garantiaForm: ControlGroup;

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
}
