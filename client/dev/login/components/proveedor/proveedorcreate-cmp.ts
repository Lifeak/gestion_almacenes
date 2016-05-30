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
import {LoginService} from '../../services/login-service';
import {Proveedor, ProveedorService} from '../../services/proveedor/proveedor-service';
import {UserService} from '../../services/user/user-service';

@Component({
  templateUrl: 'client/dev/proveedor/templates/create.html',
  providers:[LoginService, UserService, ProveedorService]
})

  @CanActivate(() => isLogged())
export class ProveedorCreateCmp{
  @Input() proveedor: Proveedor;
  proveedorForm: ControlGroup;
  mat: Array<Object> = [];
  cuenta: Array<string> = [];
  public token: string;
  public profile: string;

  constructor(@Inject(FormBuilder) fb: FormBuilder,private router: Router, private _loginService: LoginService, private _userService: UserService, private _routeParams: RouteParams, private _proveedorService: ProveedorService){
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
      "coste2":[""],
      "val":[""]
    });
  }
  
  gotoIndex(){
    this.router.navigate(['/ListProveedores']);

  }

  goBack(){
    window.history.back();
  }

  plus (datos: FormData){
    var pieza: string = this.proveedorForm.controls['pieza'].value;
    var refexterna: string = this.proveedorForm.controls['refexterna'].value;
    var coste1: number = this.proveedorForm.controls['coste1'].value;
    var coste2: number = this.proveedorForm.controls['coste2'].value;
    var val: string = this.proveedorForm.controls['val'].value;
    
    if (pieza == "" || refexterna == "" || coste1.toString() == "") {
      alert("Debes rellenar todos los campos sobre la pieza a añadir");
    } else {
      (<Control>this.proveedorForm.controls['pieza']).updateValue("");
      (<Control>this.proveedorForm.controls['refexterna']).updateValue("");
      (<Control>this.proveedorForm.controls['coste1']).updateValue("");
      (<Control>this.proveedorForm.controls['coste2']).updateValue("");
      (<Control>this.proveedorForm.controls['val']).updateValue("");
      this.cuenta.push(pieza);
      var m: Object = { pieza, refexterna, coste1, coste2, val};
      //alert("añadimos el material " + JSON.stringify(m));
      this.mat.push(m);
      m = [];
  }
}

  minus(pos:number) {

    this.mat.splice(pos, 1);
    this.cuenta.splice(pos, 1);
  }

  save(datos: FormData){
      alert("entramos a guardar el proveedor");
      var nombre: string = this.proveedorForm.controls['nombre'].value;
      var direccion: string = this.proveedorForm.controls['direccion'].value;
      var ciudad: string = this.proveedorForm.controls['ciudad'].value;
      var pais: string = this.proveedorForm.controls['pais'].value;
      var telefono: string = this.proveedorForm.controls['telefono'].value;
      var valoracion: string = this.proveedorForm.controls['valoracion'].value;
      var pieza: string = this.proveedorForm.controls['pieza'].value;
      var refexterna: string = this.proveedorForm.controls['refexterna'].value;
      var coste1: number = this.proveedorForm.controls['coste1'].value; 
      var coste2: number = this.proveedorForm.controls['coste2'].value;
      var val: string = this.proveedorForm.controls['val'].value;
      var materiales = this.mat;


          this._proveedorService
              .add(nombre,direccion,ciudad,pais,telefono,valoracion,materiales)
              .subscribe((m) => {
          (<Control>this.proveedorForm.controls['nombre']).updateValue("");
          (<Control>this.proveedorForm.controls['direccion']).updateValue("");
          (<Control>this.proveedorForm.controls['ciudad']).updateValue("");
          (<Control>this.proveedorForm.controls['pais']).updateValue("");
          (<Control>this.proveedorForm.controls['telefono']).updateValue("");
          (<Control>this.proveedorForm.controls['valoracion']).updateValue("");
          (<Control>this.proveedorForm.controls['pieza']).updateValue("");
          (<Control>this.proveedorForm.controls['refexterna']).updateValue("");
          (<Control>this.proveedorForm.controls['coste1']).updateValue("");
          });
          this.gotoIndex();
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
