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

  constructor(@Inject(FormBuilder) fb: FormBuilder,private _router: Router, private _routeParams: RouteParams, private _modeloService: ModeloService){
    this.modeloForm = fb.group({
      "nombre": ["", Validators.required],
      "refinterna": ["", Validators.required],
      "caracteristicas": ["", Validators.required],
      "modeloDe": ["", Validators.required],
      "compuestoPor": ["", Validators.required],
      "unidades": ["", Validators.required],
    });
  }
  
  gotoIndex(){
    this._router.navigate(['/ListModelos']);

  }

  goBack(){
    window.history.back();
  }

  save(datos: FormData){
      var nombre: string = this.modeloForm.controls['nombre'].value;
      var refinterna: string = this.modeloForm.controls['refinterna'].value;
      var caracteristicas: string = this.modeloForm.controls['caracteristicas'].value;
      var modeloDe: string = this.modeloForm.controls['modeloDe'].value;
      var compuestoPor: Array<string> = this.modeloForm.controls['compuestoPor'].value;
      var unidades: Array<number> = this.modeloForm.controls['unidades'].value;

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
