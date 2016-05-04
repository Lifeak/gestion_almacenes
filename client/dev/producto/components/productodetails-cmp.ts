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


import {Producto,ProductoService} from '../services/producto-service';
import {LoginService} from '../../login/services/login-service';


@Component({
  templateUrl: 'client/dev/producto/templates/details.html',
  styleUrls: ['client/dev/producto/styles/cliente.css']
})


export class ProductoDetailsCmp implements OnInit {
  @Input() producto: Producto;
  productoForm: ControlGroup;

  constructor( @Inject(FormBuilder) fb: FormBuilder, private _router: Router, private _routeParams: RouteParams, private _productoService: ProductoService, @Inject(LoginService) private _loginService: LoginService) {
    this.productoForm = fb.group({
      "_id": ["", Validators.required],
      "nombre": ["", Validators.required],
      "modelo": ["", Validators.required],
      "estado": ["", Validators.required],      
      "caracteristicas": [""],
      "almacen": ["",Validators.required],
      "vendido":["",Validators.required],
      "carcasa":["",Validators.required],
      "columna":["",Validators.required],
      "precio":[""]
    });
  }
  

  ngOnInit() {
    let id = this._routeParams.get('id');
    this._productoService
    .getProductoId(id)
    .subscribe((producto) => {
    this.producto = producto;
    });


  }

  gotoIndex(){
    let productoId = this.producto ? this.producto._id : null;
    this._router.navigate(['/ListProductos']);
  }

  private _getAll():void {
    this._productoService
        .getAll()
        .subscribe((productos) => {
          this.producto = productos;
        });
  }

  buscar(nombre:string){
      //alert("buscamos este nombre "+nombre);
      this._router.navigate(['DetailsSubPieza', { nombre: nombre }]);
  }

  edit(producto: Producto){
    let id = this._routeParams.get('id');
      if (producto.precio.toString().indexOf(',') != -1) {
        alert("Error.El producto no se puede modificar ya que el precio es incorrecto. Utiliza el . para los decimales.");

      }else{
        this._productoService
          .remove(id)
          .subscribe(() => {
            return this.producto;

          });

        this._productoService
          .add(producto._id, producto.nombre, producto.modelo, producto.estado, producto.caracteristicas, producto.almacen, producto.vendido, producto.compuestoPor, producto.precio)
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

  delete(producto: Producto) {
    let id = this._routeParams.get('id');
    this._productoService
      .remove(id)
      .subscribe(() => {
      return this.producto;

      });
    this.gotoIndex();

  }

}
