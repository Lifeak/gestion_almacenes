import {
  Component,
  Input,
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
  RouteParams,
  CanActivate,
  Router
} from 'angular2/router';

import {isLogged, isLoggedinAdmin, isLoggedinEncargado} from '../../services/isloggedin';
import {ModeloService, Modelo} from '../../services/modelo/modelo-service';
import {LoginService} from '../../services/login-service';
import {UserService} from '../../services/user/user-service';

@Component({
  templateUrl: 'client/dev/modelo/templates/detailss.html',
  providers:[LoginService, UserService, ModeloService]
})

  @CanActivate(() => isLogged())
export class ModeloSubDetailsCmp implements OnInit {
  @Input() modelo: Modelo;
  modeloForm: ControlGroup;
  modelos: Modelo[] = [];
  components = [];
  uds: Array<number> = [];
  public token: string;
  public profile: string;

  constructor( @Inject(FormBuilder) fb: FormBuilder, private router: Router, private _routeParams: RouteParams, private _userService: UserService, private _modeloService: ModeloService, @Inject(LoginService) private _loginService: LoginService) {
    this.modeloForm = fb.group({
      "nombre": ["", Validators.required],
      "refinterna": ["", Validators.required],
      "caracteristicas": [""],
      "modeloDe": ["", Validators.required],
      "compuestoPor": [""],
      "unidades": [""]
    });
  }
  

  ngOnInit() {
    let name = this._routeParams.get('nombre');
    this._modeloService
    .getModeloName(name)
    .subscribe((modelo) => {
    this.modelo = modelo;
    this.components = this.modelo[0].compuestoPor;
    this.uds = this.modelo[0].unidades;
    });

    this._modeloService
    .getAll()
    .subscribe((modelos) => {
      this.modelos = modelos;
    });
  }

  gotoIndex(){
    window.history.back();
  }

  private _getAll():void {
    this._modeloService
        .getAll()
        .subscribe((modelos) => {
          this.modelo = modelos;
        });
  }

  buscar(nombre){
      this.router.navigate(['DetailsSubModelo', { nombre: nombre }]);
  }
  edit(modelo: Modelo) {
    let id = this._routeParams.get('nombre');

    var compuestoPor: Array<string> = this.components;
    var unidades: Array<number> = this.uds;


    this._modeloService
      .add(modelo.nombre, modelo.refinterna, modelo.caracteristicas, modelo.modeloDe, compuestoPor, unidades)
      .subscribe((m) => {
        (<Control>this.modeloForm.controls['nombre']).updateValue("");
        (<Control>this.modeloForm.controls['refinterna']).updateValue("");
        (<Control>this.modeloForm.controls['caracteristicas']).updateValue("");
        (<Control>this.modeloForm.controls['modeloDe']).updateValue("");
        (<Control>this.modeloForm.controls['compuestoPor']).updateValue("");
        (<Control>this.modeloForm.controls['unidades']).updateValue("");
      });

    this._modeloService
      .remove(id)
      .subscribe(() => {
        return this.modelo;

      });
    this.gotoIndex();

  }

  plus(data: FormData): void {

      var nombre: string = this.modeloForm.controls['compuestoPor'].value;
      //alert("entramos a plus con nombre " + nombre);
      this.components.push(nombre);
      (<Control>this.modeloForm.controls['compuestoPor']).updateValue("");
      var unidades: number = this.modeloForm.controls['unidades'].value;
      this.uds.push(unidades);
      (<Control>this.modeloForm.controls['unidades']).updateValue("");

  }

  minus(nombre: string): void {
      this.components.splice(this.components.indexOf(nombre), 1);
      this.uds.splice(this.components.indexOf(nombre), 1);
  }


  logout() {
    this._loginService.logout();
    this.router.navigate(['/Login']);
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
  gproductos() {
    this.router.navigate(['/ListProductos']);
  }
  gpiezas() {
    this.router.navigate(['/ListPiezas']);
  }
  gmodelos() {
    this.router.navigate(['/ListModelos']);
  }
  gproveedores() {
    this.router.navigate(['/ListProveedores']);
  }
  gusuarios() {
    if (localStorage.getItem(this.token) == "encargado") {
      let u = localStorage.key(1);
      if (u == "undefined") {
        let o = localStorage.key(0);
        this.getProfile(o);
      } else {
        this.getProfile(u);
      }
    } else {
          this.router.navigate(['/ListUsuarios']);
    }
  }
  public getProfile(name: string) {
    this._userService
      .getProfile(name)
      .subscribe((user) => {
        this.profile = user[0]._id;
        this.router.navigate(['Perfil', { id: this.profile }]);
      });
  }
  ggarantias() {
    this.router.navigate(['/ListGarantias']);
  }
  galmacenes() {
    this.router.navigate(['/ListAlmacenes']);
  }
  gclientes() {
    this.router.navigate(['/ListClientes']);
  }


}
