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

import {ProveedorService,Proveedor} from '../services/proveedor-service';
import {LoginService} from '../../login/services/login-service';

import {ProveedorListCmp} from './proveedorlist-cmp';
import {ProveedorDetailsCmp} from './proveedordetails-cmp';
import {ProveedorCreateCmp} from './proveedorcreate-cmp';
import {isLogged, isLoggedinAdmin, isLoggedinEncargado} from '../../login/services/isloggedin';


@Component({
  selector: 'proveedor-cmp',
  templateUrl: 'client/dev/proveedor/templates/index.html',
  providers: [ProveedorService, LoginService, ROUTER_PROVIDERS], // importante poner ROUTE_PROVIDERS
  directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    
  { path: '/ListProveedores', name: 'ListProveedores', component: ProveedorListCmp},
  { path: '/Create', name: 'CreateProveedor', component: ProveedorCreateCmp },
  { path: '/Details', name: 'DetailsProveedor', component: ProveedorDetailsCmp}
])

  @CanActivate(() => isLogged())
export class ProveedorCmp /*implements OnInit*/ {
  proveedores: Proveedor[] = [];
  proveedorForm: ControlGroup;
  private _selectedId: string;
  token: string;


  constructor( @Inject(FormBuilder) fb: FormBuilder, @Inject(ProveedorService) private _proveedorService: ProveedorService, @Inject(LoginService) private _loginService: LoginService, private router: Router) {
    this.proveedorForm = fb.group({
    "nombre": ["", Validators.required],
    "direccion": ["", Validators.required],
    "ciudad": ["", Validators.required],
    "pais": ["", Validators.required],
    "telefono": ["", Validators.required],
    "valoracion": [""],
    "pieza": [""],
    "refexterna": [""],
    "coste1": [""],
    "coste2": [""],
    "val": [""]
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
      this.router.navigate(['/ListProveedores']);
    }
  }

  private _getAll():void {
    this._proveedorService
        .getAll()
        .subscribe((proveedores) => {
          this.proveedores = proveedores;
        });
  }

  isSelected(proveedor: Proveedor) {
    return proveedor._id === this._selectedId;
 }
  onSelect(proveedor: Proveedor) {
    this.router.navigate(['DetailsProveedor', { id: proveedor._id }]);
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

  almacen() {
    window.location.replace("http://localhost:3000/#/almacen");
  }

  admin() {
    window.location.replace("http://localhost:3000/#/admin");
  }

}
