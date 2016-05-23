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
import {AlmacenService, Almacen} from '../../services/almacen/almacen-service';
import {LoginService} from '../../services/login-service';

@Component({
  templateUrl: 'client/dev/almacen/templates/details.html'
})

  @CanActivate(() => isLoggedinAdmin())
export class AlmacenDetailsCmp implements OnInit {
  @Input() almacen: Almacen;
  almacenForm: ControlGroup;

  constructor( @Inject(FormBuilder) fb: FormBuilder, private router: Router, private _routeParams: RouteParams, private _almacenService: AlmacenService, @Inject(LoginService) private _loginService: LoginService) {
    this.almacenForm = fb.group({
      "nombre": ["", Validators.required],
      "direcion": ["", Validators.required],
      "ciudad": ["", Validators.required],
      "pais": ["", Validators.required],
      "telefono": ["", Validators.required],
      "encargado":["",Validators.required]
    });
  }
  

  ngOnInit() {
    let id = this._routeParams.get('id');
    this._almacenService
    .getUserId(id)
    .subscribe((almacen) => {
      this.almacen = almacen;
    });
  }

  gotoIndex(){
    let userId = this.almacen ? this.almacen._id : null;
    this.router.navigate(['/ListAlmacenes']);
  }
  private _getAll():void {
    this._almacenService
        .getAll()
        .subscribe((almacen) => {
          this.almacen = almacen;
        });
  }
  edit(almacen: Almacen){

    this._almacenService
      .add(almacen.nombre,almacen.direccion,almacen.ciudad,almacen.pais,almacen.telefono,almacen.encargado)
      .subscribe((m) => {
          //this.user.push(m);
          (<Control>this.almacenForm.controls['nombre']).updateValue("");
          (<Control>this.almacenForm.controls['direccion']).updateValue("");
          (<Control>this.almacenForm.controls['ciudad']).updateValue("");
          (<Control>this.almacenForm.controls['pais']).updateValue("");
          (<Control>this.almacenForm.controls['telefono']).updateValue("");
          (<Control>this.almacenForm.controls['encargado']).updateValue("");
    });

    this._almacenService
      .remove(almacen._id)
      .subscribe(() => {
        return this.almacen;

      });
    this.gotoIndex();

  }
  delete(almacen: Almacen) {
    this._almacenService
      .remove(almacen._id)
      .subscribe(() => {
        return this.almacen;

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

  garantias() {
      this.router.navigate(['/ListGarantias']);
  }

  usuarios() {
    this.router.navigate(['/ListUsuarios']);
  }

}
