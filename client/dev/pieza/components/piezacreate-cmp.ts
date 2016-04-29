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
  components = ['Junta J003 Blanca (columna pared)',
    'Junta J003 Negra (columna pared)',
    'Junta J004 Blanca (columna carcasa)',
    'Junta J004 Negra (columna carcasa)',
    'Junta J006 Blanca (ranura columna)',
    'Junta J006 Negra (ranura columna)',
    'Junta estanqueidad columna',
    'Mando blanco',
    'Mando negro',
    'Sensor',
    'Cable sensor',
    'Cable plano columna',
    'Anclaje pared-columna',
    'Etiqueta código barras Col LC',
    'Etiqueta código barras Col WM',
    'Etiqueta código barras Col BM',
    'Etiqueta NSerie LC (columna)',
    'Etiqueta NSerie WM (columna)',
    'Etiqueta NSerie BM (columna)',
    'Etiqueta NSerie LC (caja)',
    'Etiqueta NSerie WM (caja)',
    'Etiqueta NSerie BM (caja)',
    'Etiquetas A y B',
    'Plantillas',
    'Bolsa escuadra',
    'Asidero caja',
    'Caja columna',
    'Conformador caja columna',
    'Tornillo 4,8x8mm (negro)',
    'Etiqueta logo',
    'J001 (Motor) Blanca',
    'J002 (Chapa) Negra',
    'J005 (Ranura carcasa) Blanca',
    'J005 (Ranura carcasa) Negra',
    'Motor',
    'Resistencia',
    'Electrónica',
    'Núcleo ferrita',
    'Rodete',
    'Cable alimentación blanco',
    'Cable alimentación negro',
    'Carcasa Blanca',
    'Carcasa Negra',
    'Tapa lateral carcasa blanca',
    'Tapa lateral carcasa negra',
    'Cable conexión',
    'Cable plano carcasa',
    'Tapa trasera carcasa',
    'Rejilla',
    'Tornillo 4,2x16mm negro',
    'Tornillo 3,5x19mm negro&blanco',
    'Tornillo 3,5x9x5mm negro&blanco',
    'Arandela plana ancha',
    'Tuerca autoblocante',
    'Taco',
    'Escarpias pequeñas',
    'Escarpias grandes',
    'Abrazadera cable',
    'Prensaestopas',
    'Antivibración carcasa',
    'Etiqueta código barras Car LC',
    'Etiqueta código barras Car WM',
    'Etiqueta código barras Car BM',
    'Etiqueta especificaciones (caja) LC',
    'Etiqueta especificaciones (caja) WM',
    'Etiqueta especificaciones (caja) BM',
    'Etiqueta NSerie LC (carcasa)',
    'Etiqueta NSerie WM (carcasa)',
    'Etiqueta NSerie BM (carcasa)',
    'Etiqueta especificaciones BM',
    'Etiqueta especificaciones LC',
    'Etiqueta especificaciones WM',
    'Etiquetas modo de uso',
    'Etiquetas packaging',
    'Manual usuario',
    'Asidero caja',
    'Caja carcasa',
    'Caja manual',
    'Caja cable',
    'Twist tie',
    'Bolsa tornillera',
    'Bolsa chapa logo',
    'Columna LC (pieza)',
    'Columna WM (pieza)',
    'Columna BM (pieza)',
    'Columna LC',
    'Columna WM',
    'Columna BM',
    'Carcasa LC',
    'Carcasa WM',
    'Carcasa BM'
];
  
  componentsChecked = [];
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
    this.componentsChecked = [];
    this.uds = [];

  }
  
  gotoIndex(){
    this._router.navigate(['/ListModelos']);

  }

  goBack(){
    window.history.back();
  }

  // Cuando se marca un checkbox, llega la opcion a setOption en la cual se comprueba en primer lugar si ese componente
  // ya estaba en el array, si esto es cierto (parte del else), es porque hemos marcado y desmarcado la casilla y por tanto deberiamos
  // eliminar ese componente del array.
  // Si ese componente no estaba añadido, lo añadimos y asignamos al array de unidades la misma unidad que contenta la posicion del array
  // de unidades. Esto es debido a que puede que no cambiemos las unidades del spin y por tanto no se lanzará el método change que añade
  // las unidades de ese componente al array de unidades.
  setOption(comp){
    alert("el componente es "+comp);
    if (this.componentsChecked.indexOf(comp) == -1) {
      this.componentsChecked.push(comp);
      if (this.uds.length > 0) {
        this.uds.push(this.uds[this.uds.length - 1]);
        alert("setOption   uds " + this.uds.toString());
     
      }
    } else {
      var index = this.componentsChecked.indexOf(comp);
      alert("la copia esta en " + index);
      this.componentsChecked.splice(index, 1); //Elimina el componente del array
      this.uds.splice(index, 1); // Elimina el numero de uds de ese componente en el array de uds
    }
    
  }

  setUds(datos:FormData) {
    var u:number = this.modeloForm.controls['unidades'].value;
    alert("las unidades son " + u);
    if (this.uds.length == this.componentsChecked.length) {
      alert("setUDs   long de uds " + this.uds.length);
      alert("setUDS   long de components " + this.componentsChecked.length);
      this.uds.pop();
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
