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

import {LoginService} from '../../services/login-service';
import {isLogged, isLoggedinAdmin, isLoggedinEncargado} from '../../services/isloggedin';
import {Modelo, ModeloService} from '../../services/modelo/modelo-service';

@Component({
  selector: 'ListModelos',
  templateUrl: 'client/dev/modelo/templates/list.html',
  directives:[ROUTER_DIRECTIVES],
  providers: [ModeloService]
})

  @CanActivate(() => isLogged())
export class ModeloListCmp implements OnInit {
  modelos: Modelo[] = [];
  private _selectedId: string;


  constructor(private _modeloService: ModeloService, private _router: Router, routeParams: RouteParams) {
    this._selectedId = routeParams.get('id');
  }

  ngOnInit() {
    this._getAll();
  }

  private _getAll():void {
    this._modeloService
        .getAll()
        .subscribe((modelos) => {
          this.modelos = modelos;
        });
  }
  isSelected(modelo:Modelo){
    return modelo._id === this._selectedId;
  }
  onSelect(modelo:Modelo){
    this._router.navigate(['DetailsModelo',{id: modelo._id}]);
  }
}
