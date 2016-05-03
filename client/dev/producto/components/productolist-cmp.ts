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
ROUTER_DIRECTIVES
} from 'angular2/router';


import {Producto,ProductoService} from '../services/producto-service';

@Component({
  selector: 'ListProductos',
  templateUrl: 'client/dev/producto/templates/list.html',
  styleUrls: ['client/dev/producto/styles/cliente.css'],
  directives:[ROUTER_DIRECTIVES],
  providers: [ProductoService]
})

export class ProductoListCmp implements OnInit {
  productos: Producto[] = [];
  private _selectedId: string;


  constructor(private _productoService: ProductoService, private _router: Router, routeParams: RouteParams) {
    this._selectedId = routeParams.get('id');
  }

  ngOnInit() {
    this._getAll();
  }

  private _getAll():void {
    this._productoService
        .getAll()
        .subscribe((productos) => {
          this.productos = productos;
        });
  }
  isSelected(producto:Producto){
    return producto._id === this._selectedId;
  }
  onSelect(producto:Producto){
    this._router.navigate(['DetailsProducto',{id: producto._id}]);
  }
}
