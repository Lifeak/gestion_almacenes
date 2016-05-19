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
CanActivate,
ROUTER_DIRECTIVES
} from 'angular2/router';

import {isLogged, isLoggedinAdmin, isLoggedinEncargado} from '../../services/isloggedin';
import {Cliente, ClienteService} from '../../services/cliente/cliente-service';
import {LoginService} from '../../services/login-service';

@Component({
  selector: 'ListUsuarios',
  templateUrl: 'client/dev/cliente/templates/list.html',
  directives:[ROUTER_DIRECTIVES],
  providers: [ClienteService]
})

  @CanActivate(() => isLogged())
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
