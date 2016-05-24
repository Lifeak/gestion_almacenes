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

import {LoginService} from '../../services/login-service';
import {Pieza,PiezaService} from '../../services/pieza/pieza-service';
import {Modelo} from '../../services/modelo/modelo-service';
import {isLogged, isLoggedinAdmin, isLoggedinEncargado} from '../../services/isloggedin';


@Component({
  templateUrl: 'client/dev/pieza/templates/create.html'
})

  @CanActivate(() => isLogged())
export class PiezaCreateCmp implements OnInit{
  @Input() pieza: Pieza;
  modelos: Modelo[]=[];
  piezaForm: ControlGroup;
  components: Array<string>;
  
  constructor(@Inject(FormBuilder) fb: FormBuilder,private router: Router, private _routeParams: RouteParams, private _piezaService: PiezaService, private _loginService: LoginService){
    this.piezaForm = fb.group({
      "_id": ["", Validators.required],
      "modelo": ["", Validators.required],
      "estado": ["",Validators.required],
      "lote": ["", Validators.required],
      "caracteristicas": [""],
      "almacen": ["",Validators.required],
      "almacenOrigen": ["", Validators.required],
      "vendido": ["", Validators.required],
      "compuestoPor": [""],
      "precio": [""]
    });
     this.components = [];
  }

  ngOnInit(){
   this._piezaService
    .getModelos()
    .subscribe((modelos) => {
    this.modelos = modelos; 
    });
   
  }
  
  gotoIndex(){
    this.router.navigate(['/ListPiezas']);

  }

  goBack(){
    window.history.back();
  }

  save(datos: FormData){
      var _id: string = this.piezaForm.controls['_id'].value;
      var modelo: string = this.piezaForm.controls['modelo'].value;
      var estado: string = this.piezaForm.controls['estado'].value;
      var lote: string = this.piezaForm.controls['lote'].value;
      var caracteristicas = this.piezaForm.controls['caracteristicas'].value;
      var almacen: string = this.piezaForm.controls['almacen'].value;
      var almacenOrigen: string = this.piezaForm.controls['almacenOrigen'].value;
      var vendido: boolean = this.piezaForm.controls['vendido'].value;
      var compuestoPor: Array<string> = this.components;
      var precio:number = this.piezaForm.controls['precio'].value;

      this._piezaService
          .add(_id,modelo,estado,lote,caracteristicas,almacen,almacenOrigen,vendido,compuestoPor,precio)
          .subscribe((m) => {
        (<Control>this.piezaForm.controls['_id']).updateValue("");
        (<Control>this.piezaForm.controls['modelo']).updateValue("");
        (<Control>this.piezaForm.controls['estado']).updateValue("");
        (<Control>this.piezaForm.controls['lote']).updateValue("");
        (<Control>this.piezaForm.controls['caracteristicas']).updateValue("");
        (<Control>this.piezaForm.controls['almacen']).updateValue("");
        (<Control>this.piezaForm.controls['almacenOrigen']).updateValue("");
        (<Control>this.piezaForm.controls['vendido']).updateValue("");
        (<Control>this.piezaForm.controls['precio']).updateValue("");
          });


      this.gotoIndex();

  }

  plus(data: FormData): void {
      var nombre: string = this.piezaForm.controls['compuestoPor'].value; 
      this.components.push(nombre);
      (<Control>this.piezaForm.controls['compuestoPor']).updateValue("");

  }

  minus(nombre: string): void {
      this.components.splice(this.components.indexOf(nombre), 1);
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
    this.router.navigate(['/ListUsuarios']);
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