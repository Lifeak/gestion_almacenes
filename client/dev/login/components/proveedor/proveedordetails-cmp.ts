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
import {Proveedor, ProveedorService} from '../../services/proveedor/proveedor-service';
import {LoginService} from '../../services/login-service';
import {UserService} from '../../services/user/user-service';

@Component({
  templateUrl: 'client/dev/proveedor/templates/details.html',
  providers: [LoginService, UserService, ProveedorService]
})

  @CanActivate(() => isLogged())
export class ProveedorDetailsCmp implements OnInit {
  @Input() proveedor: Proveedor;
  proveedorForm: ControlGroup;
  mat: Array<Object>=[];
  index: number = null;
  indexpieza: string = "";
  public token: string;
  public profile: string;

  constructor( @Inject(FormBuilder) fb: FormBuilder, private router: Router, private _routeParams: RouteParams, private _userService: UserService, private _proveedorService: ProveedorService, @Inject(LoginService) private _loginService: LoginService) {
    this.proveedorForm = fb.group({
      "nombre": ["", Validators.required],
      "direccion": ["", Validators.required],
      "ciudad": ["", Validators.required],
      "pais": ["", Validators.required],
      "telefono": ["", Validators.required],
      "valoracion": ["", Validators.required],
      "pieza": [""],
      "refexterna": [""],
      "coste1": [""],
      "coste2":[""],
      "val":[""]
    });
  }
  

  ngOnInit() {
    let id = this._routeParams.get('id');
    this._proveedorService
    .getProveedorId(id)
    .subscribe((proveedor) => {
      this.proveedor = proveedor;
      alert("details "+JSON.stringify(this.proveedor));
      this.mat = this.proveedor.materiales;
    });

  }

  gotoIndex(){
    this.router.navigate(['/ListProveedores']);
  }
  
  private _getAll():void {
    this._proveedorService
        .getAll()
        .subscribe((proveedores) => {
          this.proveedor = proveedores;
        });

  }

  plus(datos: FormData) {
    var pieza: string = this.proveedorForm.controls['pieza'].value;
    var refexterna: string = this.proveedorForm.controls['refexterna'].value;
    var coste1: number = this.proveedorForm.controls['coste1'].value;
    var coste2: number = this.proveedorForm.controls['coste2'].value;
    var val: string = this.proveedorForm.controls['val'].value;
    var busqueda = "pieza:" + '"' + this.indexpieza + '"';
    if (pieza == "" || refexterna == "" || coste1.toString() == "") {
      alert("Debes rellenar todos los campos sobre la pieza a añadir");
    } else {
      (<Control>this.proveedorForm.controls['pieza']).updateValue("");
      (<Control>this.proveedorForm.controls['refexterna']).updateValue("");
      (<Control>this.proveedorForm.controls['coste1']).updateValue("");
      (<Control>this.proveedorForm.controls['coste2']).updateValue("");
      (<Control>this.proveedorForm.controls['val']).updateValue("");
      var nuevo: Object = { pieza, refexterna, coste1, coste2, val };
      this.mat.push(nuevo);
      alert("añadimos el material " + JSON.stringify(nuevo));
      nuevo = [];
      if (this.indexpieza != "") {
          if (this.mat.toString().search(busqueda))
              this.mat.splice(this.index, 1);
          this.index = null;
          this.indexpieza = "";
      }
    }
  }

  minus(material: number) {
    alert("eliminamos el numero " + material);
    this.mat.splice(material, 1);
  }

  editarmat(material:number,pieza:string,refexterna:string,coste1:string,coste2:number,val:string){
    this.index = material;
    this.indexpieza = pieza;
    (<Control>this.proveedorForm.controls['pieza']).updateValue(pieza);
    (<Control>this.proveedorForm.controls['refexterna']).updateValue(refexterna);
    (<Control>this.proveedorForm.controls['coste1']).updateValue(coste1);
    (<Control>this.proveedorForm.controls['coste2']).updateValue(coste2);
    (<Control>this.proveedorForm.controls['val']).updateValue(val);
  }

  backedit(){
    (<Control>this.proveedorForm.controls['pieza']).updateValue("");
    (<Control>this.proveedorForm.controls['refexterna']).updateValue("");
    (<Control>this.proveedorForm.controls['coste1']).updateValue("");
    (<Control>this.proveedorForm.controls['coste2']).updateValue("");
    (<Control>this.proveedorForm.controls['val']).updateValue("");

  }

  edit(proveedor: Proveedor){
    var materiales = this.mat;
    this._proveedorService
      .add(proveedor.nombre, proveedor.direccion, proveedor.ciudad, proveedor.pais, proveedor.telefono, proveedor.valoracion, materiales)
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
          (<Control>this.proveedorForm.controls['coste2']).updateValue("");
          (<Control>this.proveedorForm.controls['val']).updateValue("");
    });

    this._proveedorService
      .remove(proveedor._id)
      .subscribe(() => {
        return this.proveedor;

      });
    this.gotoIndex();

  }

  delete(proveedor: Proveedor) {
    this._proveedorService
      .remove(proveedor._id)
      .subscribe(() => {
        return this.proveedor;

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
