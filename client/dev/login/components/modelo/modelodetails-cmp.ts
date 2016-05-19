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
  CanActivate,
  Router
} from 'angular2/router';

import {isLogged, isLoggedinAdmin, isLoggedinEncargado} from '../../services/isloggedin';
import {ModeloService, Modelo} from '../../services/modelo/modelo-service';
import {LoginService} from '../../services/login-service';


@Component({
  templateUrl: 'client/dev/modelo/templates/details.html'
})

  @CanActivate(() => isLogged())
export class ModeloDetailsCmp implements OnInit {
  @Input() modelo: Modelo;
  modeloForm: ControlGroup;
  modelos: Modelo[] = [];
  components = [];
  uds: Array<number> = [];

  constructor( @Inject(FormBuilder) fb: FormBuilder, private _router: Router, private _routeParams: RouteParams, private _modeloService: ModeloService, @Inject(LoginService) private _loginService: LoginService) {
    this.modeloForm = fb.group({
      "nombre": ["", Validators.required],
      "refinterna": ["", Validators.required],
      "caracteristicas": [""],
      "modeloDe": ["", Validators.required],
      "compuestoPor": [""],
      "unidades": [""]
    });
  }
  

  ngOnInit() {
    let id = this._routeParams.get('id');
    this._modeloService
    .getModeloId(id)
    .subscribe((modelo) => {
    this.modelo = modelo;
    this.components = this.modelo.compuestoPor;
    this.uds = this.modelo.unidades;
    });

    this._modeloService
      .getAll()
      .subscribe((modelos) => {
        this.modelos = modelos;
      });


  }

  gotoIndex(){
    this._router.navigate(['/ListModelos']);
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

  edit(modelo: Modelo){
    let id = this._routeParams.get('id');

    var compuestoPor: Array<string> = this.components;
    var unidades: Array<number> = this.uds;


    this._modeloService
      .add(modelo.nombre, modelo.refinterna, modelo.caracteristicas, modelo.modeloDe, compuestoPor, unidades)
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

  plus(data: FormData): void {

      var nombre: string = this.modeloForm.controls['compuestoPor'].value;
      alert("entramos a plus con nombre " + nombre);
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
}
