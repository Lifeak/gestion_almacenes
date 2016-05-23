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


import {Producto,ProductoService} from '../../services/producto/producto-service';
import {LoginService} from '../../services/login-service';
import {isLogged, isLoggedinAdmin, isLoggedinEncargado} from '../../services/isloggedin';


@Component({
  templateUrl: 'client/dev/producto/templates/detailss.html'
})

@CanActivate(() => isLogged())
export class ProductoSubDetailsCmp implements OnInit {
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
      "compuestoPor":["", Validators.required],
      "precio":[""]
    });
  }
  

  ngOnInit() {
    this._productoService
    .getProductoName(name)
    .subscribe((producto) => {
    this.producto = producto;
    });
  }

  gotoIndex(){
    let productoName = this.producto ? this.producto._id : null;
    window.history.back();
  }

  private _getAll():void {
    this._productoService
        .getAll()
        .subscribe((productos) => {
      this.producto = productos;
        });
  }

  buscar(nombre){
      //alert("buscamos este nombre "+nombre);
      this._router.navigate(['DetailsSubProducto', { nombre: nombre }]);
  }


}
