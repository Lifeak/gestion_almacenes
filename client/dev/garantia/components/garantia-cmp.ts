import {
  Component,
  Inject,
  provide,
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
import{bootstrap} from 'angular2/platform/browser';

import {GarantiaService} from '../services/garantia-service';
import {LoginService} from '../../login/services/login-service';

import {GarantiaListCmp} from './garantialist-cmp';
import {GarantiaDetailsCmp} from './garantiadetails-cmp';
import {GarantiaCreateCmp} from './garantiacreate-cmp';
import {isLogged, isLoggedinAdmin, isLoggedinEncargado} from '../../login/services/isloggedin';

type Garantia = {
  _id: string;
  tiempo: number;
}

@Component({
  selector: 'garantia-cmp',
  templateUrl: 'client/dev/garantia/templates/index.html',
  providers: [GarantiaService, LoginService, ROUTER_PROVIDERS], // importante poner ROUTE_PROVIDERS
  directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    
    { path: '/ListGarantias', name: 'ListGarantias', component: GarantiaListCmp },
  { path: '/Create', name: 'CreateGarantia', component: GarantiaCreateCmp },
  { path: '/Details', name: 'DetailsGarantia', component: GarantiaDetailsCmp }
])

@CanActivate(() => isLogged())
export class GarantiaCmp implements OnInit {
  garantias: Garantia[] = [];
  garantiaForm: ControlGroup;
  private _selectedId: string;
  token: string;


  constructor( @Inject(FormBuilder) fb: FormBuilder, @Inject(GarantiaService) private _garantiaService: GarantiaService, @Inject(LoginService) private _loginService: LoginService, private router: Router) {
    this.garantiaForm = fb.group({
      "_id": ["", Validators.required],
      "tiempo": ["", Validators.required]
    });
  }

  ngOnInit() {
     if (localStorage.getItem(this.token) != "encargado" && localStorage.getItem(this.token) != "admin") {
        //alert("en user cmp el localstorage es " + localStorage.getItem(this.token));
        localStorage.clear();
        window.location.replace("http://localhost:3000/");
        // window.history.back();
     } else {
      this._getAll();
      this.router.navigate(['/ListGarantias']);
    }
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

  add(_id:string, tiempo:number):void {
    this._garantiaService
        .add(_id,tiempo)
        .subscribe((m) => {
          this.garantias.push(m);
          (<Control>this.garantiaForm.controls['_id']).updateValue("");
          (<Control>this.garantiaForm.controls['tiempo']).updateValue("");

        });
  }

  remove(id:string):void {
    this._garantiaService
      .remove(id)
      .subscribe(() => {
      this.garantias.forEach((t, i) => {
          if (t._id === id)
        return this.garantias.splice(i, 1);
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

  goalmacen() {
    window.location.replace("http://localhost:3000/#/almacen");
  }

  admin() {
    window.location.replace("http://localhost:3000/#/admin");
  }

}
