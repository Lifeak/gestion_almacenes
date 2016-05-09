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
  mat: Array<Object> = [];
  cuenta: Array<string> = [];

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
      "coste1": [""],
      "coste2":[""],
      "val":[""]
    });
  }
  
  gotoIndex(){
    this._router.navigate(['/ListProveedores']);

  }

  goBack(){
    window.history.back();
  }

  plus (datos: FormData){
    var pieza: string = this.proveedorForm.controls['pieza'].value;
    var refexterna: string = this.proveedorForm.controls['refexterna'].value;
    var coste1: number = this.proveedorForm.controls['coste1'].value;
    var coste2: number = this.proveedorForm.controls['coste2'].value;
    var val: string = this.proveedorForm.controls['val'].value;
    if (pieza == "" || refexterna == "" || coste1.toString() == "") {
      alert("Debes rellenar todos los campos sobre la pieza a añadir");
    } else {
      (<Control>this.proveedorForm.controls['pieza']).updateValue("");
      (<Control>this.proveedorForm.controls['refexterna']).updateValue("");
      (<Control>this.proveedorForm.controls['coste1']).updateValue("");
      (<Control>this.proveedorForm.controls['coste2']).updateValue("");
      (<Control>this.proveedorForm.controls['val']).updateValue("");
      this.cuenta.push(pieza);
      var m: Object = { pieza, refexterna, coste1, coste2, val};
      alert("añadimos el material " + JSON.stringify(m));
      this.mat.push(m);
      m = [];
  }
}

  minus(pos:number) {

    this.mat.splice(pos, 1);
    this.cuenta.splice(pos, 1);
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
      var coste2: number = this.proveedorForm.controls['coste2'].value;
      var val: string = this.proveedorForm.controls['val'].value;
      var materiales = this.mat;


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
