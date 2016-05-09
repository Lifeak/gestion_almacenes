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


import {Proveedor,ProveedorService} from '../services/proveedor-service';



@Component({
  selector: 'ListProveedores',
  templateUrl: 'client/dev/proveedor/templates/list.html',
  styleUrls: ['client/dev/proveedor/styles/cliente.css'],
  directives:[ROUTER_DIRECTIVES],
  providers: [ProveedorService]
})

export class ProveedorListCmp implements OnInit {
  proveedors: Proveedor[] = [];
  private _selectedId: string;


  constructor(private _proveedorService: ProveedorService, private _router: Router, routeParams: RouteParams) {
    this._selectedId = routeParams.get('id');
  }

  ngOnInit() {
    this._getAll();
  }

  private _getAll():void {
    this._proveedorService
        .getAll()
        .subscribe((proveedores) => {
          this.proveedors = proveedores;
          //alert("proveedores son"+this.proveedors[1].nombre);
        });
  }
  isSelected(proveedor:Proveedor){
    return proveedor._id === this._selectedId;
  }
  onSelect(proveedor:Proveedor){
    this._router.navigate(['DetailsProveedor',{id: proveedor._id}]);
  }
}
