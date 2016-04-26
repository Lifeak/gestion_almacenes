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
  templateUrl: 'client/dev/modelo/templates/details.html',
  styleUrls: ['client/dev/modelo/styles/cliente.css']
})


export class ModeloDetailsCmp implements OnInit {
  @Input() modelo: Modelo;
  modeloForm: ControlGroup;

  constructor( @Inject(FormBuilder) fb: FormBuilder, private _router: Router, private _routeParams: RouteParams, private _modeloService: ModeloService, @Inject(LoginService) private _loginService: LoginService) {
    this.modeloForm = fb.group({
      "nombre": ["", Validators.required],
      "refinterna": ["", Validators.required],
      "caracteristicas": ["", Validators.required],
      "modeloDe": ["", Validators.required],
      "compuestoPor": ["", Validators.required],
      "unidades": ["", Validators.required]
    });
  }
  

  ngOnInit() {
    let id = this._routeParams.get('id');
    //alert(id);
    this._modeloService
    .getModeloId(id)
    .subscribe((modelo) => {
    this.modelo = modelo;
    });
  }

  gotoIndex(){
   // let clienteId = this.modelo ? this.modelo._id : null;
    this._router.navigate(['/ListModelos']);
  }
  private _getAll():void {
    this._modeloService
        .getAll()
        .subscribe((modelos) => {
          this.modelo = modelos;
        });
  }
  edit(modelo: Modelo){
    let id = this._routeParams.get('id');
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

  }

}
