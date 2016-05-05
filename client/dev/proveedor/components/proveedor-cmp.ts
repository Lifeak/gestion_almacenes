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
  //template: `<h1>holaaaaaaaaaaaaaaa</h1><h1>holaaaaaaaaaaaaaaa</h1><h1>holaaaaaaaaaaaaaaa</h1><h1>holaaaaaaaaaaaaaaa</h1>`,
  providers: [ProveedorService, LoginService, ROUTER_PROVIDERS], // importante poner ROUTE_PROVIDERS
  directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    
  { path: '/ListProveedores', name: 'ListProveedores', component: ProveedorListCmp},
  { path: '/Create', name: 'CreateProveedor', component: ProveedorCreateCmp },
  { path: '/Details', name: 'DetailsProveedor', component: ProveedorDetailsCmp}
])


export class ProveedorCmp /*implements OnInit*/ {
  proveedores: Proveedor[] = [];
  proveedorForm: ControlGroup;
  private _selectedId: string;


  constructor( @Inject(FormBuilder) fb: FormBuilder, @Inject(ProveedorService) private _proveedorService: ProveedorService, @Inject(LoginService) private _loginService: LoginService, private router: Router) {
    this.proveedorForm = fb.group({
      "nombre": ["", Validators.required],
      "direccion": ["", Validators.required],
      "ciudad": ["", Validators.required],
      "pais": ["", Validators.required],
      "telefono": ["", Validators.required],
      "valoracion": ["", Validators.required],
      "material": ["", Validators.required]
    });
  }

  ngOnInit() {
    this._getAll();
    this.router.navigate(['/ListProveedores']);
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

 /*  add():void {
    this._userService
        .add(user, pass, nombre, apellido, tipo)
        .subscribe((m) => {
          this.users.push(m);
          (<Control>this.userForm.controls['user']).updateValue("");
          (<Control>this.userForm.controls['pass']).updateValue("");
          (<Control>this.userForm.controls['nombre']).updateValue("");
          (<Control>this.userForm.controls['apellido']).updateValue("");
          (<Control>this.userForm.controls['tipo']).updateValue("");
        });
  }

  remove(id:string):void {
    this._userService
      .remove(id)
      .subscribe(() => {
        this.users.forEach((t, i) => {
          if (t._id === id)
            return this.users.splice(i, 1);
        });
      })
  }*/

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
