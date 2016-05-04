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


export class ModeloCreateCmp implements OnInit{
  @Input() modelo: Modelo;
  modeloForm: ControlGroup;
  modelos: Modelo[] = [];  
  components = [];
  uds:Array<number> = [];

  constructor(@Inject(FormBuilder) fb: FormBuilder,private _router: Router, private _routeParams: RouteParams, private _modeloService: ModeloService){
    this.modeloForm = fb.group({
      "nombre": ["", Validators.required],
      "refinterna": ["", Validators.required],
      "caracteristicas": ["", Validators.required],
      "modeloDe": ["", Validators.required],
      "compuestoPor": [""],
      "unidades": [""],
    });
  }
  
  ngOnInit(){
    this._modeloService
      .getAll()
      .subscribe((modelos) => {
        this.modelos = modelos;
      });
  }

  gotoIndex(){
    this._router.navigate(['/ListModelos']);

  }

  goBack(){
    window.history.back();
  }

  plus(data: FormData): void {
      var nombre: string = this.modeloForm.controls['compuestoPor'].value;
      this.components.push(nombre);
      (<Control>this.modeloForm.controls['compuestoPor']).updateValue("");
      var unidades: number = this.modeloForm.controls['unidades'].value;
      this.uds.push(unidades);
      (<Control>this.modeloForm.controls['unidades']).updateValue("");

  }

  minus(nombre: string): void {
      this.components.splice(this.components.indexOf(nombre), 1);
      this.uds.splice(this.components.indexOf(nombre), 1);
  }

  save(datos: FormData){

      var nombre: string = this.modeloForm.controls['nombre'].value;
      var refinterna: string = this.modeloForm.controls['refinterna'].value;
      var caracteristicas: string = this.modeloForm.controls['caracteristicas'].value;
      var modeloDe: string = this.modeloForm.controls['modeloDe'].value;
      var compuestoPor: Array<string> = this.components;
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
