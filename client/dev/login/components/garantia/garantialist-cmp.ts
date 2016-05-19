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


import {Garantia, GarantiaService} from '../services/garantia-service';
import {isLogged, isLoggedinAdmin, isLoggedinEncargado} from '../../login/services/isloggedin';


@Component({
  templateUrl: 'client/dev/garantia/templates/list.html',
  styleUrls: ['client/dev/garantia/styles/cliente.css'],
  directives:[ROUTER_DIRECTIVES],
  providers: [GarantiaService]
})

  @CanActivate(() => isLogged())
export class GarantiaListCmp implements OnInit {
  garantias: Garantia[] = [];
  private _selectedId: string;


  constructor(private _garantiaService: GarantiaService, private _router: Router, routeParams: RouteParams) {
    this._selectedId = routeParams.get('id');
  }

  ngOnInit() {
    this._getAll();
  }

  private _getAll():void {
    this._garantiaService
        .getAll()
        .subscribe((garantias) => {
          this.garantias = garantias;
        });
  
  }
  isSelected(garantia: Garantia) {
    return garantia._id === this._selectedId;
  }
  onSelect(garantia: Garantia) {
    this._router.navigate(['DetailsGarantia', { id: garantia._id }]);
  }
}
