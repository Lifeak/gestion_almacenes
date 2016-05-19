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


import {ProductoService,Producto} from '../services/producto-service';
import {Modelo} from '../../modelo/services/modelo-service';
import {isLogged, isLoggedinAdmin, isLoggedinEncargado} from '../../login/services/isloggedin';


@Component({
  templateUrl: 'client/dev/producto/templates/create.html',
  styleUrls: ['client/dev/producto/styles/cliente.css']
})


  @CanActivate(() => isLogged())
export class ProductoCreateCmp implements OnInit{
  @Input() producto: Producto;
  modelos: Modelo[]=[];
  productoForm: ControlGroup;
  components: Array<string>;
  
  constructor(@Inject(FormBuilder) fb: FormBuilder,private _router: Router, private _routeParams: RouteParams, private _productoService: ProductoService){
    this.productoForm = fb.group({
      "_id": ["", Validators.required],
      "nombre": ["", Validators.required],
      "modelo": ["", Validators.required],
      "estado": ["",Validators.required],
      "caracteristicas": [""],
      "almacen": ["",Validators.required],
      "vendido": ["", Validators.required],
      "carcasa": ["",Validators.required],
      "columna": ["",Validators.required],
      "precio": [""]
    });
     this.components = [];
      
  }

  ngOnInit(){
   this._productoService
    .getModelos()
    .subscribe((modelos) => {
    this.modelos = modelos; 
    });
   
  }
  
  gotoIndex(){
    this._router.navigate(['/ListProductos']);

  }

  goBack(){
    window.history.back();
  }

  save(datos: FormData){
      
      var _id: string = this.productoForm.controls['_id'].value;
      var nombre: string = this.productoForm.controls['nombre'].value;
      var modelo: string = this.productoForm.controls['modelo'].value;
      var estado: string = this.productoForm.controls['estado'].value;
      var caracteristicas = this.productoForm.controls['caracteristicas'].value;
      var almacen: string = this.productoForm.controls['almacen'].value;
      var vendido: boolean = this.productoForm.controls['vendido'].value;
      var carcasa: string = this.productoForm.controls['carcasa'].value;
      var columna: string = this.productoForm.controls['columna'].value;
      this.components.push(carcasa);
      this.components.push(columna);
      var compuestoPor: Array<string> = this.components;
      var precio: number = this.productoForm.controls['precio'].value;
      if(precio.toString().indexOf(',')!=-1){
        alert("El producto no se añadirá ya que el precio es incorrecto. Utiliza el . para los decimales.");
      }else{
        this._productoService
          .add(_id,nombre,modelo,estado,caracteristicas,almacen,vendido,compuestoPor,precio)
          .subscribe((m) => {
        (<Control>this.productoForm.controls['_id']).updateValue("");
        (<Control>this.productoForm.controls['nombre']).updateValue("");
        (<Control>this.productoForm.controls['modelo']).updateValue("");
        (<Control>this.productoForm.controls['estado']).updateValue("");        
        (<Control>this.productoForm.controls['caracteristicas']).updateValue("");
        (<Control>this.productoForm.controls['almacen']).updateValue("");
        (<Control>this.productoForm.controls['vendido']).updateValue("");
        (<Control>this.productoForm.controls['carcasa']).updateValue("");
        (<Control>this.productoForm.controls['columna']).updateValue("");
        (<Control>this.productoForm.controls['precio']).updateValue("");
          });


      this.gotoIndex();
      }

      

  }

  /*comprobar():boolean{
    //let precioaux = precio.toString(); 
    var precio: string = this.productoForm.controls['precio'].value;
    if (precio.indexOf(',') != -1 || precio == "")
      return true;
    else return false;
  }*/

}
