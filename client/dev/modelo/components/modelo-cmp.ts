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

import {ModeloService} from '../services/modelo-service';
import {LoginService} from '../../login/services/login-service';

import {ModeloListCmp} from './modelolist-cmp';
import {ModeloDetailsCmp} from './modelodetails-cmp';
import {ModeloCreateCmp} from './modelocreate-cmp';
import {isLogged, isLoggedinAdmin, isLoggedinEncargado} from '../../login/services/isloggedin';

type Modelo = {
  nombre: string;
  refinterna: string;
  caracteristicas: string;
  modeloDe: string;
  compuestoPor: Array<string>;
  unidades: Array<number>;
  _id: string;
}

@Component({
  selector:'modelo-cmp',
  templateUrl: 'client/dev/modelo/templates/index.html',
  styleUrls: ['client/dev/modelo/styles/cliente.css'],
  providers: [ModeloService, LoginService, ROUTER_PROVIDERS],
  directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([

  { path: '/Modelos', name: 'ListModelos', component:ModeloListCmp },
  { path: '/Create', name: 'CreateModelo', component: ModeloCreateCmp },
  { path: '/Details', name: 'DetailsModelo', component: ModeloDetailsCmp }
])


export class ModeloCmp implements OnInit {
  modelos: Modelo[] = [];
  modeloForm: ControlGroup;
  private _selectedId: string;

  constructor( @Inject(FormBuilder) fb: FormBuilder, @Inject(ModeloService) private _modeloService: ModeloService, @Inject(LoginService) private _loginService: LoginService, private router: Router) {
    this.modeloForm = fb.group({
      "nombre": ["", Validators.required],
      "refinterna": ["", Validators.required],
      "caracteristicas": ["", Validators.required],
      "modeloDe": ["", Validators.required],
      "compuestoPor": ["", Validators.required],
      "unidades": ["", Validators.required],

    });
  }

  ngOnInit() {
    this._getAll();
    this.router.navigate(['/ListModelos']);
  }

  private _getAll(): void {
    this._modeloService
      .getAll()
      .subscribe((modelos) => {
      this.modelos = modelos;
      });
  }

  isSelected(modelo: Modelo) {
    return modelo._id === this._selectedId;
  }
  onSelect(modelo: Modelo) {
    this.router.navigate(['DetailsModelo', { id: modelo._id }]);
  }

  add(nombre:string,refinterna:string,caracteristicas:string,modeloDe:string,compuestoPor:Array<string>,unidades:Array<number>): void {
    this._modeloService
      .add(nombre,refinterna,caracteristicas,modeloDe,compuestoPor,unidades)
      .subscribe((m) => {
        this.modelos.push(m);
        (<Control>this.modeloForm.controls['nombre']).updateValue("");
        (<Control>this.modeloForm.controls['refinterna']).updateValue("");
        (<Control>this.modeloForm.controls['caracteristicas']).updateValue("");
        (<Control>this.modeloForm.controls['modeloDe']).updateValue("");
        (<Control>this.modeloForm.controls['compuestoPor']).updateValue("");
        (<Control>this.modeloForm.controls['unidades']).updateValue("");

      });
  }

  remove(id: string): void {
    this._modeloService
      .remove(id)
      .subscribe(() => {
        this.modelos.forEach((t, i) => {
          if (t._id === id)
            return this.modelos.splice(i, 1);
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
