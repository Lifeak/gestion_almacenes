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
import {Modelo} from '../../modelo/services/modelo-service';


@Component({
  templateUrl: 'client/dev/pieza/templates/create.html',
  styleUrls: ['client/dev/pieza/styles/cliente.css']
})


export class PiezaCreateCmp implements OnInit{
  @Input() pieza: Pieza;
  modelos: Modelo[]=[];
  piezaForm: ControlGroup;
  components: Array<string>;
  
  constructor(@Inject(FormBuilder) fb: FormBuilder,private _router: Router, private _routeParams: RouteParams, private _piezaService: PiezaService){
    this.piezaForm = fb.group({
      "_id": ["", Validators.required],
      "modelo": ["", Validators.required],
      "estado": ["",Validators.required],
      "lote": ["", Validators.required],
      "caracteristicas": [""],
      "almacen": ["",Validators.required],
      "almacenOrigen": ["", Validators.required],
      "vendido": ["", Validators.required],
      "compuestoPor": [""],
      "precio": [""]
    });
     this.components = [];
      //this.modelos = [];
  }

  ngOnInit(){
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

  save(datos: FormData){
      this.components = [];
      var _id: string = this.piezaForm.controls['_id'].value;
      var modelo: string = this.piezaForm.controls['modelo'].value;
      var estado: string = this.piezaForm.controls['estado'].value;
      var lote: string = this.piezaForm.controls['lote'].value;
      var caracteristicas = this.piezaForm.controls['caracteristicas'].value;
      var almacen: string = this.piezaForm.controls['almacen'].value;
      var almacenOrigen: string = this.piezaForm.controls['almacenOrigen'].value;
      var vendido: boolean = this.piezaForm.controls['vendido'].value;
      var compuestoPor: Array<string> = this.components;
      var precio:number = this.piezaForm.controls['precio'].value;

      this._piezaService
          .add(_id,modelo,estado,lote,caracteristicas,almacen,almacenOrigen,vendido,compuestoPor,precio)
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


      this.gotoIndex();

  }

  

}
