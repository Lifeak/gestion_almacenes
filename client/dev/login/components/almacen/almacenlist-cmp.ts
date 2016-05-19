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
import {Almacen, AlmacenService} from '../../services/almacen/almacen-service';
import {isLogged, isLoggedinAdmin, isLoggedinEncargado} from '../../services/isloggedin';


@Component({
  templateUrl: 'client/dev/almacen/templates/list.html',
  directives:[ROUTER_DIRECTIVES],
  providers: [AlmacenService]
})

@CanActivate(() => isLogged())
export class AlmacenListCmp implements OnInit {
  almacens: Almacen[] = [];
  private _selectedId: string;


  constructor(private _almacenService: AlmacenService, private _router: Router, routeParams: RouteParams) {
    this._selectedId = routeParams.get('id');
  }

  ngOnInit() {
    this._getAll();
  }

  private _getAll():void {
    this._almacenService
        .getAll()
        .subscribe((almacens) => {
          this.almacens = almacens;
        });
  
  }
  isSelected(almacen:Almacen){
    return almacen._id === this._selectedId;
  }
  onSelect(almacen:Almacen){
    this._router.navigate(['DetailsAlmacen',{id: almacen._id}]);
  }
}
