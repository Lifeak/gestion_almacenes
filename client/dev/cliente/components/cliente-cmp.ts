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
  ROUTER_PROVIDERS,
  CanActivate,
  ROUTER_DIRECTIVES
} from 'angular2/router';

import {
  bootstrap
} from 'angular2/platform/browser';

import {ClienteService} from '../services/cliente-service';
import {LoginService} from '../../login/services/login-service';

import {ClienteListCmp} from './clientelist-cmp';
import {ClienteDetailsCmp} from './clientedetails-cmp';
import {ClienteCreateCmp} from './clientecreate-cmp';
import {isLogged, isLoggedinAdmin, isLoggedinEncargado} from '../../login/services/isloggedin';

type Cliente = {
  _id: string;
  nombre: string;
  direccion: string;
  ciudad: string;
  pais: string;
  telefono1: string;
  telefono2: string;
  puestoTrabajo: string;
  email: string;
  detalles: string;
}

@Component({
  selector:'cliente-cmp',
  templateUrl: 'client/dev/cliente/templates/index.html',
  styleUrls: ['client/dev/cliente/styles/cliente.css'],
  providers: [ClienteService, LoginService, ROUTER_PROVIDERS],
  directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([

  { path: '/Clientes', name: 'ListClientes', component:ClienteListCmp },
  { path: '/Create', name: 'CreateCliente', component: ClienteCreateCmp },
  { path: '/Details', name: 'DetailsCliente', component: ClienteDetailsCmp }
])


export class ClienteCmp implements OnInit {
  clientes: Cliente[] = [];
  clienteForm: ControlGroup;
  private _selectedId: string;

  constructor( @Inject(FormBuilder) fb: FormBuilder, @Inject(ClienteService) private _clienteService: ClienteService, @Inject(LoginService) private _loginService: LoginService, private router: Router) {
    this.clienteForm = fb.group({
      "_id": ["", Validators.required],
      "nombre": ["", Validators.required],
      "direccion": ["", Validators.required],
      "ciudad": ["", Validators.required],
      "pais": ["", Validators.required],
      "telefono1": ["", Validators.required],
      "telefono2": ["", Validators.required],
      "puestoTrabajo": ["", Validators.required],
      "email": ["", Validators.required],
      "detalles": ["", Validators.required]
    });
  }

  ngOnInit() {
    this._getAll();
    this.router.navigate(['/ListClientes']);
  }

  private _getAll(): void {
    this._clienteService
      .getAll()
      .subscribe((clientes) => {
        this.clientes = clientes;
      });
  }

  isSelected(cliente: Cliente) {
    return cliente._id === this._selectedId;
  }
  onSelect(cliente: Cliente) {
    this.router.navigate(['DetailsCliente', { id: cliente._id }]);
  }

  add(_id:string, nombre:string,direccion:string,ciudad:string,pais:string,telefono1:string,telefono2:string,puestoTrabajo:string,email:string,detalles:string): void {
    this._clienteService
      .add(_id,nombre,direccion,ciudad,pais,telefono1,telefono2,puestoTrabajo,email,detalles)
      .subscribe((m) => {
        this.clientes.push(m);
        (<Control>this.clienteForm.controls['_id']).updateValue("");
        (<Control>this.clienteForm.controls['nombre']).updateValue("");
        (<Control>this.clienteForm.controls['direccion']).updateValue("");
        (<Control>this.clienteForm.controls['ciudad']).updateValue("");
        (<Control>this.clienteForm.controls['pais']).updateValue("");
        (<Control>this.clienteForm.controls['telefono1']).updateValue("");
        (<Control>this.clienteForm.controls['telefono2']).updateValue("");
        (<Control>this.clienteForm.controls['puestoTrabajo']).updateValue("");
        (<Control>this.clienteForm.controls['email']).updateValue("");
        (<Control>this.clienteForm.controls['detalles']).updateValue("");

      });
  }

  remove(id: string): void {
    this._clienteService
      .remove(id)
      .subscribe(() => {
        this.clientes.forEach((t, i) => {
          if (t._id === id)
            return this.clientes.splice(i, 1);
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

  almacen() {
    window.location.replace("http://localhost:3000/#/almacen");
  }

  admin() {
    window.location.replace("http://localhost:3000/#/admin");
  }

  }
