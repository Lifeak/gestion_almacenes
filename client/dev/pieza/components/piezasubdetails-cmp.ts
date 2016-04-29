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
import {LoginService} from '../../login/services/login-service';


@Component({
  templateUrl: 'client/dev/modelo/templates/detailss.html',
  styleUrls: ['client/dev/modelo/styles/cliente.css']
})


export class ModeloSubDetailsCmp implements OnInit {
  @Input() modelo: Modelo;
  modeloForm: ControlGroup;

  constructor( @Inject(FormBuilder) fb: FormBuilder, private _router: Router, private _routeParams: RouteParams, private _modeloService: ModeloService, @Inject(LoginService) private _loginService: LoginService) {
    this.modeloForm = fb.group({
      "nombre": ["", Validators.required],
      "refinterna": ["", Validators.required],
      "caracteristicas": ["", Validators.required],
      "modeloDe": ["", Validators.required],
      "compuestoPor": [""],
      "unidades": [""]
    });
  }
  

  ngOnInit() {
    let name = this._routeParams.get('nombre');
    
    //alert("al subdetails le llega:  "+name);
    this._modeloService
    .getModeloName(name)
    .subscribe((modelo) => {
    this.modelo = modelo;
    });
  }

  gotoIndex(){
    let clienteName = this.modelo ? this.modelo.nombre : null;
    //this._router.navigate(['/ListModelos']);
    window.history.back();
  }

  private _getAll():void {
    this._modeloService
        .getAll()
        .subscribe((modelos) => {
          this.modelo = modelos;
        });
  }

  buscar(nombre){
      //alert("buscamos este nombre "+nombre);
      this._router.navigate(['DetailsSubModelo', { nombre: nombre }]);
  }
/*
  edit(modelo: Modelo){
    let id = this._routeParams.get('id');
    //alert("el id del modelo que vamos a editar es " + id);
    this._modeloService
      .add(modelo.nombre,modelo.refinterna,modelo.caracteristicas,modelo.modeloDe,modelo.compuestoPor,modelo.unidades)
      .subscribe((m) => {
          (<Control>this.modeloForm.controls['nombre']).updateValue("");
          (<Control>this.modeloForm.controls['refinterna']).updateValue("");
          (<Control>this.modeloForm.controls['caracteristicas']).updateValue("");
          (<Control>this.modeloForm.controls['modeloDe']).updateValue("");
          (<Control>this.modeloForm.controls['compuestoPor']).updateValue("");
          (<Control>this.modeloForm.controls['unidades']).updateValue("");

    });

    this._modeloService
      .remove(id)
      .subscribe(() => {
        return this.modelo;

      });
    this.gotoIndex();

  }
  delete(modelo: Modelo) {
    let id = this._routeParams.get('id');
    this._modeloService
      .remove(id)
      .subscribe(() => {
      return this.modelo;

      });
    this.gotoIndex();

  }*/

}
