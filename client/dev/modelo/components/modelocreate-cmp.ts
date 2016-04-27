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


import {ModeloService, Modelo} from '../services/modelo-service';


@Component({
  templateUrl: 'client/dev/modelo/templates/create.html',
  styleUrls: ['client/dev/modelo/styles/cliente.css']
})


export class ModeloCreateCmp{
  @Input() modelo: Modelo;
  modeloForm: ControlGroup;
  components = ['Carcasa', 'Columna'];
  componentsMAp = {
    Carcasa: false,
    Columna: false
  };
  componentsChecked = [];
  uds:Array<number> = [];

  constructor(@Inject(FormBuilder) fb: FormBuilder,private _router: Router, private _routeParams: RouteParams, private _modeloService: ModeloService){
    this.modeloForm = fb.group({
      "nombre": ["", Validators.required],
      "refinterna": ["", Validators.required],
      "caracteristicas": ["", Validators.required],
      "modeloDe": ["", Validators.required],
      "compuestoPor": ["", Validators.required],
      "unidades": ["", Validators.required],
    });
    this.componentsChecked = [];
    this.uds = [];

  }
  
  gotoIndex(){
    this._router.navigate(['/ListModelos']);

  }

  goBack(){
    window.history.back();
  }

  setOption(comp){
    var a: boolean = false;
    var ie: number = -1;
    alert("el componente es "+comp);
    for (var i = 0; i <= this.componentsChecked.length; ++i) {
    alert("hola");
    if (this.componentsChecked[i] != comp){
      a = false;
    }

    else{
      a = true;
      ie = i;
      alert("i " + ie);
      alert("detectada copia");
    }
    

    }
    if (a == false) {
    if (this.componentsChecked.indexOf(comp) == -1) {
      this.componentsChecked.push(comp);
      if (this.uds.length > 0) {
        this.uds.push(this.uds[this.uds.length - 1]);
        alert("setOption   uds " + this.uds.toString());
      }
    }
  }
    
  }

  setUds(datos:FormData) {
    var u:number = this.modeloForm.controls['unidades'].value;
    alert("las unidades son " + u);
    if (this.uds.length == this.componentsChecked.length) {
      alert("setUDs   long de uds " + this.uds.length);
      alert("setUDS   long de components " + this.componentsChecked.length);
      this.uds.pop();
      //this.uds[this.uds.length] = this.uds.push(u);
      this.uds.push(u);
    } else
      this.uds.push(u);
  }

  save(datos: FormData){

      var nombre: string = this.modeloForm.controls['nombre'].value;
      var refinterna: string = this.modeloForm.controls['refinterna'].value;
      var caracteristicas: string = this.modeloForm.controls['caracteristicas'].value;
      var modeloDe: string = this.modeloForm.controls['modeloDe'].value;
      var compuestoPor: Array<string> = this.componentsChecked;
      var unidades: Array<number> = this.uds;

      this._modeloService
          .add(nombre,refinterna,caracteristicas,modeloDe,compuestoPor,unidades)
          .subscribe((m) => {
        (<Control>this.modeloForm.controls['nombre']).updateValue("");
        (<Control>this.modeloForm.controls['refinterna']).updateValue("");
        (<Control>this.modeloForm.controls['caracteristicas']).updateValue("");
        (<Control>this.modeloForm.controls['modeloDe']).updateValue("");
        (<Control>this.modeloForm.controls['compuestoPor']).updateValue("");
        (<Control>this.modeloForm.controls['unidades']).updateValue("");
          });


      this.gotoIndex();

  }

  

}
