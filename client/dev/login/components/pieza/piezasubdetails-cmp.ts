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


import {Pieza,PiezaService} from '../services/pieza-service';
import {isLogged, isLoggedinAdmin, isLoggedinEncargado} from '../../login/services/isloggedin';

import {Modelo} from '../../modelo/services/modelo-service';


@Component({
  templateUrl: 'client/dev/pieza/templates/detailss.html',
  styleUrls: ['client/dev/pieza/styles/cliente.css']
})

  @CanActivate(() => isLogged())
export class PiezaSubDetailsCmp implements OnInit {
  @Input() pieza: Pieza;
  piezaForm: ControlGroup;
  modelos: Modelo[] = [];
  components: Array<string>;

  constructor( @Inject(FormBuilder) fb: FormBuilder, private _router: Router, private _routeParams: RouteParams, private _piezaService: PiezaService) {
    this.piezaForm = fb.group({
      "_id": ["", Validators.required],
      "modelo": ["", Validators.required],
      "estado": ["", Validators.required],
      "lote": ["", Validators.required],
      "caracteristicas": [""],
      "almacen": ["",Validators.required],
      "almacenOrigen": ["",Validators.required],
      "vendido":["",Validators.required],
      "compuestoPor":[""],
      "precio":[""]
    });
    this.components = [];
  }
  

  ngOnInit() {
    let id = this._routeParams.get('_id');
    this._piezaService
    .getPiezaId(id)
    .subscribe((pieza) => {
      this.pieza = pieza;    
      this.components = this.pieza.compuestoPor;
    });
  
    this._piezaService
    .getModelos()
    .subscribe((modelos) => {
      this.modelos = modelos;
    });
  }

  gotoIndex(){
    this._router.navigate(['/ListPiezas']);
  }

  goBack(){
    window.history.back();
  }

  private _getAll():void {
    this._piezaService
        .getAll()
        .subscribe((piezas) => {
      this.pieza = piezas;
        });
  }

  buscar(numserie: string) {
      this._router.navigate(['DetailsSubPieza', { _id: numserie }]);
  }

  edit(pieza: Pieza) {
    let id = this._routeParams.get('_id');
    if (pieza.precio == null) {
          this._piezaService
        .remove(id)
        .subscribe(() => {
          return this.pieza;
        });

          var compuestoPor: Array<string> = this.components;
          this._piezaService
        .add(pieza._id, pieza.modelo, pieza.estado, pieza.lote, pieza.caracterisiticas, pieza.almacen, pieza.almacenOrigen, pieza.vendido, pieza.compuestoPor, pieza.precio)
        .subscribe((m) => {
          (<Control>this.piezaForm.controls['_id']).updateValue("");
          (<Control>this.piezaForm.controls['modelo']).updateValue("");
          (<Control>this.piezaForm.controls['estado']).updateValue("");
          (<Control>this.piezaForm.controls['lote']).updateValue("");
          (<Control>this.piezaForm.controls['caracteristicas']).updateValue("");
          (<Control>this.piezaForm.controls['almacen']).updateValue("");
          (<Control>this.piezaForm.controls['almacenOrigen']).updateValue("");
          (<Control>this.piezaForm.controls['vendido']).updateValue("");
          (<Control>this.piezaForm.controls['precio']).updateValue("");

        });
        //  this.gotoIndex();
    } else if (pieza.precio.toString().indexOf(',') != -1) {
      alert("Error.La pieza no se puede modificar ya que el precio es incorrecto. Utiliza el . para los decimales.");
    } else {
      this._piezaService
        .remove(id)
        .subscribe(() => {
          return this.pieza;
        });

      var compuestoPor: Array<string> = this.components;
      this._piezaService
        .add(pieza._id, pieza.modelo, pieza.estado, pieza.lote, pieza.caracterisiticas, pieza.almacen, pieza.almacenOrigen, pieza.vendido, pieza.compuestoPor, pieza.precio)
        .subscribe((m) => {
          (<Control>this.piezaForm.controls['_id']).updateValue("");
          (<Control>this.piezaForm.controls['modelo']).updateValue("");
          (<Control>this.piezaForm.controls['estado']).updateValue("");
          (<Control>this.piezaForm.controls['lote']).updateValue("");
          (<Control>this.piezaForm.controls['caracteristicas']).updateValue("");
          (<Control>this.piezaForm.controls['almacen']).updateValue("");
          (<Control>this.piezaForm.controls['almacenOrigen']).updateValue("");
          (<Control>this.piezaForm.controls['vendido']).updateValue("");
          (<Control>this.piezaForm.controls['precio']).updateValue("");

        });
      //this.gotoIndex();
    }
  }



  plus(data: FormData): void {
      var nombre: string = this.piezaForm.controls['compuestoPor'].value;
      this.components.push(nombre);
      (<Control>this.piezaForm.controls['compuestoPor']).updateValue("");

  }

  minus(nombre: string): void {
      this.components.splice(this.components.indexOf(nombre), 1);
  }

}
