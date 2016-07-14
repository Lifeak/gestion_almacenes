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
import {Devolucion,DevolucionService} from '../../services/devolucion/devolucion-service';
import {UserService} from '../../services/user/user-service';
import {Modelo} from '../../services/modelo/modelo-service';
import {Venta} from '../../services/ventas/ventas-service';

@Component({
  templateUrl: 'client/dev/devolucion/templates/create.html',
  providers:[LoginService, UserService, DevolucionService]
})

  @CanActivate(() => isLogged())
export class DevolucionCreateCmp{
  @Input() devolucion: Devolucion;
  devolucionForm: ControlGroup;
  modelos: Array<string>=[];
  numeros: Array<string>=[];
  venta: Venta[]=[];
  prod: Array<Object> = [];
  oidventa: string;
  public token: string;
  public profile: string;

  constructor(@Inject(FormBuilder) fb: FormBuilder,private router: Router, private _loginService: LoginService, private _userService: UserService, private _routeParams: RouteParams, private _devolucionService: DevolucionService){
    this.devolucionForm = fb.group({
      "idventa": ["", Validators.required],
      "tipoDevolucion": ["", Validators.required],
      "fechaEntrada": ["", Validators.required],
      "devolucion": [""],
      "modelo": [""],
      "numserie":[""],
      "numPedido":[""],
      "fechaSalida":[""],
      "cliente":[""]
     });
  }

  ngOnInit(){
      this._devolucionService
      .getVentas()
      .subscribe((venta) => {
      this.venta = venta;
     });
    
  }
  
  gotoIndex(){
    this.router.navigate(['/ListDevoluciones']);
  }

  goBack(){
    window.history.back();
  }

  pedido(event: Event){
    this.modelos=[];
    this.numeros=[];
    this.prod=[];
    const value:string = (<HTMLSelectElement>event.srcElement).value;
    this.oidventa=value;
    for (var i = 0; i < this.venta.length; i++) {
      if(this.venta[i]._id==value){
        for (var j = 0; j < this.venta[i].lineaventa.length; j++) {
          this.modelos.push(this.venta[i].lineaventa[j].modelo);
          for (var k = 0; k < this.venta[i].lineaventa[j].numSerie.length; k++) {
              this.numeros.push(this.venta[i].lineaventa[j].numSerie[k]);
           }                    
        }
      }
    }
  }

  guardalinea(datos: FormData){
    var modelo: string = this.devolucionForm.controls['modelo'].value;
    var numserie: string = this.devolucionForm.controls['numserie'].value;
    if(modelo=="" || numserie==""){
      alert("Debes rellenar los campos");
    }else{
      var m: Object = {modelo, numserie};
      this.prod.push(m);
      this.numeros.splice(this.numeros.indexOf(numserie),1);
      (<Control>this.devolucionForm.controls['modelo']).updateValue("");
      (<Control>this.devolucionForm.controls['numserie']).updateValue("");
    }
    
  }

  eliminalinea(lin:Object) {
    let pos = this.prod.indexOf(lin); 
    this.prod.splice(pos, 1);
  }

  save(datos: FormData){
      var idventa: string = this.devolucionForm.controls['idventa'].value; 
      var tipoDevolucion: string = this.devolucionForm.controls['tipoDevolucion'].value;
      var fechaEntrada: Date = this.devolucionForm.controls['fechaEntrada'].value;
      var devuelto = this.prod;
      if(this.prod.length==0){
          alert("Debes añadir los materiales del pedido.");
      }else{
          this._devolucionService
              .add(idventa,tipoDevolucion,fechaEntrada,devuelto)
              .subscribe((m) => {
          (<Control>this.devolucionForm.controls['idventa']).updateValue("");
          (<Control>this.devolucionForm.controls['tipoDevolucion']).updateValue("");
          (<Control>this.devolucionForm.controls['fechaEntrada']).updateValue("");
          });
          this.gotoIndex();    
      }
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
