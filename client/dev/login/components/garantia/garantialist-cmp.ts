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
import {Garantia, GarantiaService} from '../../services/garantia/garantia-service';
import {isLogged, isLoggedinAdmin, isLoggedinEncargado} from '../../services/isloggedin';


@Component({
  templateUrl: 'client/dev/garantia/templates/list.html',
  directives:[ROUTER_DIRECTIVES],
  providers: [GarantiaService]
})

  @CanActivate(() => isLogged())
export class GarantiaListCmp implements OnInit {
  garantias: Garantia[] = [];
  private _selectedId: string;


  constructor(private _garantiaService: GarantiaService, private _loginService: LoginService, private router: Router, routeParams: RouteParams) {
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
    this.router.navigate(['DetailsGarantia', { id: garantia._id }]);
  }


  compras() {
    this.router.navigate(['/Compras']);
  }

  ventas() {
    this.router.navigate(['/Ventas']);
  }

  almacen() {
    this.router.navigate(['/Almacen']);
  }

  admin() {
    this.router.navigate(['/Admin']);
  }
  logout() {
      this._loginService.logout();
      this.router.navigate(['/Login']);
  }

  almacenes() {
      this.router.navigate(['/ListAlmacenes']);
  }

  usuarios() {
    this.router.navigate(['/ListUsuarios']);
  }
}
