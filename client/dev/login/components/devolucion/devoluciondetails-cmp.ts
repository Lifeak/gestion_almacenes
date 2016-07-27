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
  ROUTER_DIRECTIVES,
  Router
} from 'angular2/router';

import {isLogged, isLoggedinAdmin, isLoggedinEncargado} from '../../services/isloggedin';
import {Devolucion,DevolucionService} from '../../services/devolucion/devolucion-service';
import {LoginService} from '../../services/login-service';
import {UserService} from '../../services/user/user-service';
import {Venta} from '../../services/ventas/ventas-service';


@Component({
  templateUrl: 'client/dev/devolucion/templates/details.html',
  directives:[ROUTER_DIRECTIVES],
  providers: [LoginService, UserService, DevolucionService]

})

  @CanActivate(() => isLogged())
export class DevolucionDetailsCmp implements OnInit {
  @Input() devolucion: Devolucion;
  @Input() vent: Venta;
  devolucionForm: ControlGroup;
  public token: string;
  public profile: string;
  modelos: Array<string>=[];
  numeros: Array<string>=[];
  prod: Array<Object>=[];

  constructor( @Inject(FormBuilder) fb: FormBuilder, private router: Router, private _routeParams: RouteParams, private _userService: UserService, private _devolucionService: DevolucionService, @Inject(LoginService) private _loginService: LoginService) {
    this.devolucionForm = fb.group({
      "idventa": ["", Validators.required],
      "tipoDevolucion": ["", Validators.required],
      "fechaEntrada": ["", Validators.required],
      "modelo": [""],
      "numserie": [""],
      "devuelto": [""]
    });
  }
  

  ngOnInit() {
    this.numeros=[];
    this.prod=[];
    this.modelos=[];
    let id = this._routeParams.get('id');
    this._devolucionService
    .getDevolucionID(id)
    .subscribe((devolucion) => {
      this.devolucion = devolucion;
      this.prod = this.devolucion.devuelto;
      for (var i = 0; i < this.devolucion.idventa.lineaventa.length; i++) {
        this.modelos.push(this.devolucion.idventa.lineaventa[i].modelo);
        for (var k = 0; k < this.devolucion.idventa.lineaventa[i].numSerie.length; k++) {
              this.numeros.push(this.devolucion.idventa.lineaventa[i].numSerie[k]);
           } 
      }
      /*for (var i = 0; i < this.devolucion.devuelto.length; i++) {
        alert("this.numeros:"+this.numeros.toString());
        alert(JSON.stringify(this.devolucion.devuelto[i]));
        var pos1:number = JSON.stringify(this.devolucion.devuelto[i]).search('"modelo:""');
        alert(pos1);
        if (this.numeros.indexOf(this.devolucion.devuelto[i].numSerie)>0)
            this.numeros.splice(this.numeros.indexOf(this.devolucion.devuelto[i].numSerie,1)); 
        
        
      }*/
    });

  }

  public gotoIndex(){
    this.router.navigate(['/ListDevoluciones']);
  }
  
  private _getAll():void {
    this._devolucionService
        .getAll()
        .subscribe((devolucion) => {
          this.devolucion = devolucion;
        });

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

  //Esta función guarda los cambios que se hayan realizado en una devolución
  edit(devolucion:Devolucion){
    let id = this._routeParams.get('id');
   var devuelto = this.prod;
      if(this.prod.length==0){
          alert("Debes añadir los materiales del pedido.");
      }else{
          this._devolucionService
              .add(devolucion.idventa._id,devolucion.tipoDevolucion,devolucion.fechaEntrada,devuelto)
              .subscribe((m) => {
          (<Control>this.devolucionForm.controls['idventa']).updateValue("");
          (<Control>this.devolucionForm.controls['tipoDevolucion']).updateValue("");
          (<Control>this.devolucionForm.controls['fechaEntrada']).updateValue("");
          });
      }

    this._devolucionService
    .remove(id)
    .subscribe(() => {
      return this.devolucion;
    });
    this.router.navigate(['/ListDevoluciones']);
  }

  delete(devolucion: Devolucion) {
    this._devolucionService
      .remove(devolucion._id)
      .subscribe(() => {
        return this.devolucion;

      });
    this.router.navigate(['/ListDevoluciones']);

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

   ggarantias() {
     this.router.navigate(['/ListGarantias']);
   }
   galmacenes() {
     this.router.navigate(['/ListAlmacenes']);
   }
   gclientes() {
     this.router.navigate(['/ListClientes']);
   }
   gventas(){
     this.router.navigate(['/ListVentas']);
   }
   gdevoluciones(){
     this.router.navigate(['/ListDevoluciones']);
   }
   ggarantiasp(){
     this.router.navigate(['/ListGarantiaP']);
   }
   gsegsalidas(){
     this.router.navigate(['/ListSegSalidas']);
   }
   gcontrolcalidad(){
     this.router.navigate(['/ListControlCalidad']);
   }
   greparaciones(){
     this.router.navigate(['/ListReparaciones']);
   }
   gpedidocompras(){
     this.router.navigate(['/ListCompras']);
   }
  gtransportes(){
    this.router.navigate(['/ListTransportes']);
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
 

}
