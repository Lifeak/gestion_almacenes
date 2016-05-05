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
  Router
} from 'angular2/router';


import {Proveedor, ProveedorService} from '../services/proveedor-service';

@Component({
  templateUrl: 'client/dev/proveedor/templates/create.html',
  styleUrls: ['client/dev/proveedor/styles/cliente.css']
})


export class ProveedorCreateCmp{
  @Input() proveedor: Proveedor;
  proveedorForm: ControlGroup;

  constructor(@Inject(FormBuilder) fb: FormBuilder,private _router: Router, private _routeParams: RouteParams, private _proveedorService: ProveedorService){
    this.proveedorForm = fb.group({
      "nombre": ["", Validators.required],
      "direccion": ["", Validators.required],
      "ciudad": ["", Validators.required],
      "pais": ["", Validators.required],
      "telefono": ["", Validators.required],
      "valoracion": ["", Validators.required],
      "material": ["", Validators.required]
    });
  }
  
  gotoIndex(){
    this._router.navigate(['/ListProveedores']);

  }

  goBack(){
    window.history.back();
  }
/*
  save(datos: FormData){
      alert("entramos a guardar");
      var user: string = this.userForm.controls['user'].value;
      var pass: string = this.userForm.controls['pass'].value;
      var passs: string = this.userForm.controls['passs'].value;
      var nombre: string = this.userForm.controls['nombre'].value;
      var apellido: string = this.userForm.controls['apellido'].value;
      var tipo: string = this.userForm.controls['tipo'].value;
      if (pass == passs && pass.length>3) {

          this._userService
              .add(user, pass, nombre, apellido, tipo)
              .subscribe((m) => {
          (<Control>this.userForm.controls['user']).updateValue("");
          (<Control>this.userForm.controls['pass']).updateValue("");
          (<Control>this.userForm.controls['nombre']).updateValue("");
          (<Control>this.userForm.controls['apellido']).updateValue("");
          (<Control>this.userForm.controls['tipo']).updateValue("");
              });

          this.gotoIndex();

      }else{
          alert("Error, pass no valid. Try again.")
      }
  }

  */

}
