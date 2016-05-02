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


import {Pieza,PiezaService} from '../services/pieza-service';
import {LoginService} from '../../login/services/login-service';


@Component({
  templateUrl: 'client/dev/pieza/templates/details.html',
  styleUrls: ['client/dev/pieza/styles/cliente.css']
})


export class PiezaDetailsCmp implements OnInit {
  @Input() pieza: Pieza;
  piezaForm: ControlGroup;

  constructor( @Inject(FormBuilder) fb: FormBuilder, private _router: Router, private _routeParams: RouteParams, private _piezaService: PiezaService, @Inject(LoginService) private _loginService: LoginService) {
    this.piezaForm = fb.group({
      "_id": ["", Validators.required],
      "modelo": ["", Validators.required],
      "estado": ["", Validators.required],
      "lote": ["", Validators.required],
      "caracteristicas": [""],
      "almacen": ["",Validators.required],
      "almacenOrigen":["",Validators.required],
      "vendido":["",Validators.required],
      "compuestoPor":[""],
      "precio":[""]
    });
  }
  

  ngOnInit() {
    let id = this._routeParams.get('id');
    this._piezaService
    .getPiezaId(id)
    .subscribe((pieza) => {
    this.pieza = pieza;
    });


  }

  gotoIndex(){
    let piezaId = this.pieza ? this.pieza._id : null;
    this._router.navigate(['/ListPiezas']);
  }

  private _getAll():void {
    this._piezaService
        .getAll()
        .subscribe((piezas) => {
          this.pieza = piezas;
        });
  }
/*
  buscar(nombre){
      //alert("buscamos este nombre "+nombre);
      this._router.navigate(['DetailsSubModelo', { nombre: nombre }]);
  }
*/
  edit(pieza: Pieza){
    let id = this._routeParams.get('id');
    this._piezaService
      .add(pieza._id,pieza.modelo,pieza.estado,pieza.lote,pieza.caracterisiticas,pieza.almacen,pieza.almacenOrigen,pieza.vendido,pieza.compuestoPor,pieza.precio)
      .subscribe((m) => {
          (<Control>this.piezaForm.controls['_id']).updateValue("");
          (<Control>this.piezaForm.controls['modelo']).updateValue("");
          (<Control>this.piezaForm.controls['estado']).updateValue("");
          (<Control>this.piezaForm.controls['lote']).updateValue("");
          (<Control>this.piezaForm.controls['caracteristicas']).updateValue("");
          (<Control>this.piezaForm.controls['almacen']).updateValue("");
          (<Control>this.piezaForm.controls['almacenOrigen']).updateValue("");
          (<Control>this.piezaForm.controls['vendido']).updateValue("");
          (<Control>this.piezaForm.controls['compuestoPor']).updateValue("");
          (<Control>this.piezaForm.controls['precio']).updateValue("");

    });

    this._piezaService
      .remove(id)
      .subscribe(() => {
        return this.pieza;

      });
    this.gotoIndex();
  }

  delete(pieza: Pieza) {
    let id = this._routeParams.get('id');
    this._piezaService
      .remove(id)
      .subscribe(() => {
      return this.pieza;

      });
    this.gotoIndex();

  }

}
