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
import {SegSalida, SegundaSalidaService} from '../../services/segundasalida/segundasalida-service';
import {LoginService} from '../../services/login-service';
import {UserService} from '../../services/user/user-service';
import {Venta} from '../../services/ventas/ventas-service';


@Component({
  templateUrl: 'client/dev/segundasalida/templates/details.html',
  directives:[ROUTER_DIRECTIVES],
  providers: [LoginService, UserService, SegundaSalidaService]

})

  @CanActivate(() => isLogged())
export class SegundaSalidaDetailsCmp implements OnInit {
  @Input() segsalida: SegSalida;
  @Input() vent: Venta;
  segsalidaForm: ControlGroup;
  public token: string;
  public profile: string;
  public myDate: Date;
  modelos: Array<string>=[];
  prod: Array<Object>=[];
  series: Array<string>=[];

  constructor( @Inject(FormBuilder) fb: FormBuilder, private router: Router, private _routeParams: RouteParams, private _userService: UserService, private _segsalidaService: SegundaSalidaService, @Inject(LoginService) private _loginService: LoginService) {
    this.segsalidaForm = fb.group({
      "idventa": ["", Validators.required],
      "fechaSegSalida": ["", Validators.required],
      "finGarantia": [""],
      "observaciones":[""],
      "modelo": [""],
      "unidades":[""],
      "numserie": [""],
      "salidas": [""]
    });
  }
  

 ngOnInit() {
   let id = this._routeParams.get('id');
    this._segsalidaService
    .getSegSalidaID(id)
    .subscribe((segsalida) =>{
      this.segsalida = segsalida;
      this.myDate = this.segsalida.fechaSegSalida;
      this.prod = this.segsalida.salidas;
      for (var i = 0; i < this.segsalida.idventa.lineaventa.length; i++) {
        this.modelos.push(this.segsalida.idventa.lineaventa[i].modelo);
      }
    })
  }

  public gotoIndex(){
    this.router.navigate(['/ListSegSalidas']);
  }
  

  guardalinea(datos: FormData){
    var modelo: string = this.segsalidaForm.controls['modelo'].value;
    var unidades: number = this.segsalidaForm.controls['unidades'].value;
    var numserie: Array<string> = this.series;
    if(modelo=="" || unidades!=this.series.length){
      alert("Debes rellenar los campos");
    }else{
          var m: Object = {modelo, unidades, numserie};
          this.prod.push(m);
          (<Control>this.segsalidaForm.controls['modelo']).updateValue("");
          (<Control>this.segsalidaForm.controls['unidades']).updateValue("");
          this.series=[];
    }
    
  }

  eliminalinea(lin:Object) {
    let pos = this.prod.indexOf(lin); 
    this.prod.splice(pos, 1);
  }

   // Añade los numeros de serie a una lista
  mas(numserie: string){
    if (numserie!=""){
        this.series.push(numserie);
        (<Control>this.segsalidaForm.controls['numserie']).updateValue("");
    }else{
      alert("Debes rellenar los numeros de serie")
    }
  }

  // Elimina un numero de serie de la lista
  menos(numserie:string){
      let pos = this.series.indexOf(numserie);
      this.series.splice(pos,1);
  }

  //Esta función guarda los cambios que se hayan realizado en una salida por avería
  edit(segsalida:SegSalida){
    let id = this._routeParams.get('id');
      if(this.prod.length==0){
          alert("Debes añadir los materiales del pedido.");
      }else{
        if(segsalida.fechaSegSalida == null){
          segsalida.fechaSegSalida = this.myDate;
        }
          this._segsalidaService
              .add(segsalida.idventa._id, segsalida.fechaSegSalida, segsalida.finGarantia, segsalida.observaciones, this.prod)
              .subscribe((m) => {
          (<Control>this.segsalidaForm.controls['fechaSegSalida']).updateValue("");
          });
      }

    this.delete(segsalida);
    this.gotoIndex();
  }

  delete(segsalida:SegSalida) {
    this._segsalidaService
      .remove(segsalida._id)
      .subscribe(() => {
        return this.segsalida;

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
