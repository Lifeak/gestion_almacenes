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

import {AlmacenService} from '../services/almacen-service';
import {LoginService} from '../../login/services/login-service';

import {AlmacenListCmp} from './almacenlist-cmp';
import {AlmacenDetailsCmp} from './almacendetails-cmp';
import {AlmacenCreateCmp} from './almacencreate-cmp';
import {isLogged, isLoggedinAdmin, isLoggedinEncargado} from '../../login/services/isloggedin';

type Almacen = {
  nombre: string;
  direccion: string;
  ciudad: string;
  pais: string;
  telefono: string;
  encargado: string;
  _id: string;
}

@Component({
  selector: 'almacen-cmp',
  templateUrl: 'client/dev/almacen/templates/index.html',
  providers: [AlmacenService, LoginService, ROUTER_PROVIDERS], // importante poner ROUTE_PROVIDERS
  directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    
  { path: '/ListAlmacen', name: 'ListAlmacen', component: AlmacenListCmp},
  { path: '/Create', name: 'CreateAlmacen', component: AlmacenCreateCmp },
  { path: '/Details', name: 'DetailsAlmacen', component: AlmacenDetailsCmp}
])

@CanActivate(() => isLogged())
export class AlmacenCmp implements OnInit {
  almacens: Almacen[] = [];
  almacenForm: ControlGroup;
  private _selectedId: string;
  token: string;


  constructor( @Inject(FormBuilder) fb: FormBuilder, @Inject(AlmacenService) private _almacenService: AlmacenService, @Inject(LoginService) private _loginService: LoginService, private router: Router) {
    this.almacenForm = fb.group({
      "nombre": ["", Validators.required],
      "direccion": ["", Validators.required],
      "ciudad": ["", Validators.required],
      "pais": ["", Validators.required],
      "telefono": ["", Validators.required],
      "encargado": ["", Validators.required]
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
      this.router.navigate(['/ListAlmacen']);
    }
  }

  private _getAll():void {
    this._almacenService
        .getAll()
        .subscribe((almacens) => {
          this.almacens = almacens;
          //alert("almacen tiene todo esto  " + this.almacens);
        });
  }

  isSelected(almacen: Almacen) {
    return almacen._id === this._selectedId;
  }
  onSelect(almacen: Almacen) {
    this.router.navigate(['DetailsAlmacen', { id: almacen._id }]);
  }

  add(nombre:string, direccion: string, ciudad:string, pais:string, telefono:string, encargado:string):void {
    this._almacenService
        .add(nombre,direccion,ciudad,pais,telefono,encargado)
        .subscribe((m) => {
          this.almacens.push(m);
          (<Control>this.almacenForm.controls['nombre']).updateValue("");
          (<Control>this.almacenForm.controls['direccion']).updateValue("");
          (<Control>this.almacenForm.controls['ciudad']).updateValue("");
          (<Control>this.almacenForm.controls['pais']).updateValue("");
          (<Control>this.almacenForm.controls['telefono']).updateValue("");
          (<Control>this.almacenForm.controls['encargado']).updateValue("");
        });
  }

  remove(id:string):void {
    this._almacenService
      .remove(id)
      .subscribe(() => {
      this.almacens.forEach((t, i) => {
          if (t._id === id)
        return this.almacens.splice(i, 1);
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
