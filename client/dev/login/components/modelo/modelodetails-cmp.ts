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
  templateUrl: 'client/dev/modelo/templates/details.html',
  providers: [UserService, LoginService,ModeloService]
})

  @CanActivate(() => isLogged())
export class ModeloDetailsCmp implements OnInit {
  @Input() modelo: Modelo;
  modeloForm: ControlGroup;
  modelos: Modelo[] = [];
  components = [];
  uds: Array<number> = [];
  public token: string;
  public profile: string;

  constructor( @Inject(FormBuilder) fb: FormBuilder, private router: Router, private _routeParams: RouteParams,private _userService: UserService, private _modeloService: ModeloService, @Inject(LoginService) private _loginService: LoginService) {
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
    //alert("ya estoy en los detalless");
    let id = this._routeParams.get('id');
    this._modeloService
    .getModeloId(id)
    .subscribe((modelo) => {
    this.modelo = modelo;
    this.components = this.modelo.compuestoPor;
    this.uds = this.modelo.unidades;
    });

    this._modeloService
      .getAll()
      .subscribe((modelos) => {
        this.modelos = modelos;
      });
  }

  gotoIndex(){
    this.router.navigate(['/ListModelos']);
  }

  private _getAll():void {
    this._modeloService
        .getAll()
        .subscribe((modelos) => {
          this.modelo = modelos;
        });
  }

  buscar(nombre){
      //alert("buscamos este nombre "+nombre);
      this.router.navigate(['/DetailsSubModelo', { nombre: nombre }]);
  }

  edit(modelo: Modelo){
    let id = this._routeParams.get('id');

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
  delete(modelo: Modelo) {
    let id = this._routeParams.get('id');
    this._modeloService
      .remove(id)
      .subscribe(() => {
      return this.modelo;

      });
    this.gotoIndex();

  }

  plus(data: FormData): void {

      var nombre: string = this.modeloForm.controls['compuestoPor'].value;
     // alert("entramos a plus con nombre " + nombre);
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
      // alert("1en u tenemos " + u);
      if (u == "undefined") {
        let e = localStorage.key(0);
        //alert("2en u tenemos " + u);
        this.getProfile(e);
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
        //alert("en el get, el id es " +this.profile);
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
