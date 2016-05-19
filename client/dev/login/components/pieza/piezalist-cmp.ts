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
import {Pieza,PiezaService} from '../../services/pieza/pieza-service';

import {isLogged, isLoggedinAdmin, isLoggedinEncargado} from '../../services/isloggedin';

@Component({
  selector: 'ListPiezas',
  templateUrl: 'client/dev/pieza/templates/list.html',
  directives:[ROUTER_DIRECTIVES],
  providers: [PiezaService]
})

  @CanActivate(() => isLogged())
export class PiezaListCmp implements OnInit {
  piezas: Pieza[] = [];
  private _selectedId: string;


  constructor(private _piezaService: PiezaService, private _router: Router, routeParams: RouteParams) {
    this._selectedId = routeParams.get('id');
  }

  ngOnInit() {
    this._getAll();
  }

  private _getAll():void {
    this._piezaService
        .getAll()
        .subscribe((piezas) => {
          this.piezas = piezas;
        });
  }
  isSelected(pieza:Pieza){
    return pieza._id === this._selectedId;
  }
  onSelect(pieza:Pieza){
    this._router.navigate(['DetailsPieza',{id: pieza._id}]);
  }
}
