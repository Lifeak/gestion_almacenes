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

import {PiezaService} from '../services/pieza-service';
import {LoginService} from '../../login/services/login-service';

import {PiezaListCmp} from './piezalist-cmp';
import {PiezaDetailsCmp} from './piezadetails-cmp';
import {PiezaSubDetailsCmp} from './piezasubdetails-cmp';
import {PiezaCreateCmp} from './piezacreate-cmp';
import {isLogged, isLoggedinAdmin, isLoggedinEncargado} from '../../login/services/isloggedin';

type Pieza = {
  _id: string;
  modelo: string;
  estado: string;
  lote: string;
  caracterisitcas: string;
  almacen: string;
  almacenOrigen: string;
  vendido: boolean;
  compuestoPor: Array<string>;
  precio: number;
}

@Component({
  selector:'pieza-cmp',
  templateUrl: 'client/dev/pieza/templates/index.html',
  styleUrls: ['client/dev/pieza/styles/cliente.css'],
  providers: [PiezaService, ROUTER_PROVIDERS],
  directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([

  { path: '/Piezas', name: 'ListPiezas', component:PiezaListCmp },
  { path: '/Create', name: 'CreatePieza', component: PiezaCreateCmp },
  { path: '/Details', name: 'DetailsPieza', component: PiezaDetailsCmp },
  { path: '/Detailss', name: 'DetailsSubPieza', component: PiezaSubDetailsCmp }
])

  @CanActivate(() => isLogged())
export class PiezaCmp implements OnInit {
  piezas: Pieza[] = [];
  piezaForm: ControlGroup;
  private _selectedId: string;
  token: string;

  constructor( @Inject(FormBuilder) fb: FormBuilder, @Inject(PiezaService) private _piezaService: PiezaService, @Inject(LoginService) private _loginService: LoginService, private router: Router) {
    this.piezaForm = fb.group({
      "_id": ["", Validators.required],
      "modelo": ["", Validators.required],
      "estado": ["", Validators.required],
      "lote": ["", Validators.required],
      "caracteristicas": [""],
      "almacen": ["", Validators.required],
      "almacenOrigen": ["", Validators.required],
      "vendido": ["", Validators.required],
      "compuestoPor": [""],
      "precio": [""],

    });
  }

  ngOnInit() {
     if (localStorage.getItem(this.token) != "encargado" && localStorage.getItem(this.token) != "admin") {
       // alert("en user cmp el localstorage es " + localStorage.getItem(this.token));
        localStorage.clear();
        window.location.replace("http://localhost:3000/");
        // window.history.back();
     } else {
      this._getAll();
      this.router.navigate(['/ListPiezas']);
    }
  }

  private _getAll(): void {
    this._piezaService
      .getAll()
      .subscribe((piezas) => {
      this.piezas = piezas;
      });
  }

  isSelected(pieza: Pieza) {
    return pieza._id === this._selectedId;
  }
  onSelect(pieza: Pieza) {
    this.router.navigate(['DetailsPieza', { id: pieza._id }]);
  }

  add(_id:string, modelo:string,estado:string,lote:string,caracteristicas:string, almacen:string,almacenOrigen:string,vendido:boolean,compuestoPor:Array<string>,precio:number): void {
    this._piezaService
      .add(_id,modelo,estado,lote,caracteristicas,almacen,almacenOrigen,vendido,compuestoPor,precio)
      .subscribe((m) => {
        this.piezas.push(m);
        (<Control>this.piezaForm.controls['_id']).updateValue("");
        (<Control>this.piezaForm.controls['modelo']).updateValue("");
        (<Control>this.piezaForm.controls['estado']).updateValue("");
        (<Control>this.piezaForm.controls['lote']).updateValue("");
        (<Control>this.piezaForm.controls['caracteristicas']).updateValue("");
        (<Control>this.piezaForm.controls['almacen']).updateValue("");
        (<Control>this.piezaForm.controls['almacenOrigen']).updateValue("");
        (<Control>this.piezaForm.controls['vendido']).updateValue("");
        (<Control>this.piezaForm.controls['compuestoPor']).updateValue("");
        (<Control>this.piezaForm.controls['precio']).updateValue("");

      });
  }

  remove(id: string): void {
    this._piezaService
      .remove(id)
      .subscribe(() => {
        this.piezas.forEach((t, i) => {
          if (t._id === id)
            return this.piezas.splice(i, 1);
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
