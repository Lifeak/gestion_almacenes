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
      "valoracion": [""],
      "pieza": [""],
      "refexterna": [""],
      "coste1": [""]
    });
  }
  
  gotoIndex(){
    this._router.navigate(['/ListProveedores']);

  }

  goBack(){
    window.history.back();
  }

  save(datos: FormData){
      alert("entramos a guardar el proveedor");
      var nombre: string = this.proveedorForm.controls['nombre'].value;
      var direccion: string = this.proveedorForm.controls['direccion'].value;
      var ciudad: string = this.proveedorForm.controls['ciudad'].value;
      var pais: string = this.proveedorForm.controls['pais'].value;
      var telefono: string = this.proveedorForm.controls['telefono'].value;
      var valoracion: string = this.proveedorForm.controls['valoracion'].value;
      var pieza: string = this.proveedorForm.controls['pieza'].value;
      var refexterna: string = this.proveedorForm.controls['refexterna'].value;
      var coste1: number = this.proveedorForm.controls['coste1'].value;
      var materiales: Object = [{pieza, refexterna, coste1}];


          this._proveedorService
              .add(nombre,direccion,ciudad,pais,telefono,valoracion,materiales)
              .subscribe((m) => {
          (<Control>this.proveedorForm.controls['nombre']).updateValue("");
          (<Control>this.proveedorForm.controls['direccion']).updateValue("");
          (<Control>this.proveedorForm.controls['ciudad']).updateValue("");
          (<Control>this.proveedorForm.controls['pais']).updateValue("");
          (<Control>this.proveedorForm.controls['telefono']).updateValue("");
          (<Control>this.proveedorForm.controls['valoracion']).updateValue("");
          (<Control>this.proveedorForm.controls['pieza']).updateValue("");
          (<Control>this.proveedorForm.controls['refexterna']).updateValue("");
          (<Control>this.proveedorForm.controls['coste1']).updateValue("");
          
              });

          this.gotoIndex();


  }

  

}
