import {
  Component,
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
  Router,
  RouteParams,
  RouteConfig,
  ROUTER_PROVIDERS,
  CanActivate,
  ROUTER_DIRECTIVES
} from 'angular2/router';

import {
  bootstrap
} from 'angular2/platform/browser';

import {ProductoService} from '../services/producto-service';
import {LoginService} from '../../login/services/login-service';

import {ProductoListCmp} from './productolist-cmp';
import {ProductoDetailsCmp} from './productodetails-cmp';
import {ProductoSubDetailsCmp} from './productosubdetails-cmp';
import {ProductoCreateCmp} from './productocreate-cmp';
import {isLogged, isLoggedinAdmin, isLoggedinEncargado} from '../../login/services/isloggedin';

type Producto = {
  _id: string;
  nombre: string;
  modelo: string;
  estado: string;
  caracterisitcas: string;
  almacen: string;
  vendido: boolean;
  compuestoPor: Array<string>;
  precio: number;
}

@Component({
  selector:'producto-cmp',
  templateUrl: 'client/dev/producto/templates/index.html',
  styleUrls: ['client/dev/producto/styles/cliente.css'],
  providers: [ProductoService, LoginService, ROUTER_PROVIDERS],
  directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([

  { path: '/Productos', name: 'ListProductos', component:ProductoListCmp },
  { path: '/Create', name: 'CreateProducto', component: ProductoCreateCmp },
  { path: '/Details', name: 'DetailsProducto', component: ProductoDetailsCmp },
  { path: '/Detailss', name: 'DetailsSubProducto', component: ProductoSubDetailsCmp }
])


export class ProductoCmp implements OnInit {
  productos: Producto[] = [];
  productoForm: ControlGroup;
  private _selectedId: string;

  constructor( @Inject(FormBuilder) fb: FormBuilder, @Inject(ProductoService) private _productoService: ProductoService, @Inject(LoginService) private _loginService: LoginService, private router: Router) {
    this.productoForm = fb.group({
      "_id": ["", Validators.required],
      "nombre": ["", Validators.required],
      "modelo": ["", Validators.required],
      "estado": ["", Validators.required],
      "caracteristicas": [""],
      "almacen": ["", Validators.required],
      "vendido": ["", Validators.required],
      "compuestoPor": [""],
      "precio": [""],

    });
  }

  ngOnInit() {
    this._getAll();
    this.router.navigate(['/ListProductos']);
  }

  private _getAll(): void {
    this._productoService
      .getAll()
      .subscribe((productos) => {
      this.productos = productos;
      });
  }

  isSelected(producto: Producto) {
    return producto._id === this._selectedId;
  }
  onSelect(producto: Producto) {
    this.router.navigate(['DetailsProducto', { id: producto._id }]);
  }

  add(_id:string,nombre:string,modelo:string,estado:string,caracteristicas:string, almacen:string,vendido:boolean,compuestoPor:Array<string>,precio:number): void {
    this._productoService
      .add(_id,nombre,modelo,estado,caracteristicas,almacen,vendido,compuestoPor,precio)
      .subscribe((m) => {
        this.productos.push(m);
        (<Control>this.productoForm.controls['_id']).updateValue("");
        (<Control>this.productoForm.controls['nombre']).updateValue("");
        (<Control>this.productoForm.controls['modelo']).updateValue("");
        (<Control>this.productoForm.controls['estado']).updateValue("");
        (<Control>this.productoForm.controls['caracteristicas']).updateValue("");
        (<Control>this.productoForm.controls['almacen']).updateValue("");
        (<Control>this.productoForm.controls['vendido']).updateValue("");
        (<Control>this.productoForm.controls['compuestoPor']).updateValue("");
        (<Control>this.productoForm.controls['precio']).updateValue("");

      });
  }

  remove(id: string): void {
    this._productoService
      .remove(id)
      .subscribe(() => {
        this.productos.forEach((t, i) => {
          if (t._id === id)
            return this.productos.splice(i, 1);
        });
      })
  }

  logout() {
    this._loginService.logout();
    window.location.replace("http://localhost:3000/");

  }

  compras() {
    window.location.replace("http://localhost:3000/#/compras");
  }

  ventas() {
    window.location.replace("http://localhost:3000/#/ventas");
  }

  almacen() {
    window.location.replace("http://localhost:3000/#/almacen");
  }

  admin() {
    window.location.replace("http://localhost:3000/#/admin");
  }

  }
