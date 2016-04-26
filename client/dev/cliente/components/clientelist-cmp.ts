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


import {Cliente, ClienteService} from '../services/cliente-service';

@Component({
  selector: 'ListUsuarios',
  templateUrl: 'client/dev/cliente/templates/list.html',
  styleUrls: ['client/dev/cliente/styles/cliente.css'],
  directives:[ROUTER_DIRECTIVES],
  providers: [ClienteService]
})

export class ClienteListCmp implements OnInit {
  clientes: Cliente[] = [];
  private _selectedId: string;


  constructor(private _clienteService: ClienteService, private _router: Router, routeParams: RouteParams) {
    this._selectedId = routeParams.get('id');
  }

  ngOnInit() {
    this._getAll();
  }

  private _getAll():void {
    this._clienteService
        .getAll()
        .subscribe((clientes) => {
          this.clientes = clientes;
        });
  }
  isSelected(cliente:Cliente){
    return cliente._id === this._selectedId;
  }
  onSelect(cliente:Cliente){
    this._router.navigate(['DetailsCliente',{id: cliente._id}]);
  }
}
