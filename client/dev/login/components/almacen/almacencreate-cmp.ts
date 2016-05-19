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
import {AlmacenService, Almacen} from '../../services/almacen/almacen-service';
import {isLogged, isLoggedinAdmin, isLoggedinEncargado} from '../../services/isloggedin';

@Component({
  templateUrl: 'client/dev/almacen/templates/create.html'
})

@CanActivate(() => isLoggedinAdmin())
export class AlmacenCreateCmp{
  @Input() almacen: Almacen;
  almacenForm: ControlGroup;

  constructor(@Inject(FormBuilder) fb: FormBuilder,private _router: Router, private _routeParams: RouteParams, private _almacenService: AlmacenService){
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
    this._router.navigate(['/ListAlmacen']);

  }

  goBack(){
    window.history.back();
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

  

}
