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
import {SegSalida,SegundaSalidaService} from '../../services/segundasalida/segundasalida-service';
import {UserService} from '../../services/user/user-service';
import {Modelo} from '../../services/modelo/modelo-service';
import {Venta} from '../../services/ventas/ventas-service';
import {GarantiapService} from '../../services/garantiapieza/garantiapieza-service';

@Component({
  templateUrl: 'client/dev/segundasalida/templates/create.html',
  providers:[LoginService, UserService, SegundaSalidaService, GarantiapService]
})

  @CanActivate(() => isLogged())
export class SegundaSalidaCreateCmp{
  @Input() segsalida: SegSalida;
  segsalidaForm: ControlGroup;
  modelos: Array<string>=[];
  venta: Venta[]=[];
  prod: Array<Object> = [];
  series: Array<string>=[];
  oidventa: string;
  long:number=0;
  generagarantia: Array<string>=[]; // Almacenará los numeros de serie de todos los productos vendidos para generar sus garantías
  public token: string;
  public profile: string;

  constructor(@Inject(FormBuilder) fb: FormBuilder,private router: Router, private _loginService: LoginService, private _userService: UserService, private _routeParams: RouteParams, private _segsalidaService: SegundaSalidaService, private _garantiapService: GarantiapService){
    this.segsalidaForm = fb.group({
      "idventa": ["", Validators.required],
      "fechaSegSalida": ["", Validators.required],
      "finGarantia": [""],
      "observaciones":[""],
      "salidas": [""],
      "modelo": [""],
      "unidades":[""],
      "numserie":[""],
      "numPedido":[""],
      "fechaSalida":[""],
      "cliente":[""]
     });
  }

  ngOnInit(){
      this._segsalidaService
      .getVentas()
      .subscribe((venta) => {
      this.venta = venta;
     });
    
  }
  
  gotoIndex(){
    this.router.navigate(['/ListSegSalidas']);
  }

  goBack(){
    window.history.back();
  }

  pedido(event: Event){
    this.modelos=[];
    this.prod=[];
    const value:string = (<HTMLSelectElement>event.srcElement).value;
    this.oidventa=value;
    for (var i = 0; i < this.venta.length; i++) {
      if(this.venta[i]._id==value){
        for (var j = 0; j < this.venta[i].lineaventa.length; j++) {
          this.modelos.push(this.venta[i].lineaventa[j].modelo);                   
        }
      }
    }
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

  guardalinea(datos: FormData){
    var modelo: string = this.segsalidaForm.controls['modelo'].value;
    var unidades: number = this.segsalidaForm.controls['unidades'].value;
    var numserie: Array<string> = this.series;
    if(modelo=="" || unidades==null || this.series.length==0){
      alert("Debes rellenar los campos");
    }else{
      if(unidades!=this.series.length){
        alert("Los números de serie no se corresponden con las unidades.");
      }else{
        // Añadimos los números de serie para generar las garantias
        for (var i = 0; i < this.series.length; i++) {
          this.long=this.long+1;
          this.generagarantia.push(this.series[i]);
        }
        var m: Object = {modelo, unidades, numserie};
        this.prod.push(m);
        (<Control>this.segsalidaForm.controls['modelo']).updateValue("");
        (<Control>this.segsalidaForm.controls['unidades']).updateValue("");
        this.series=[];
      }
    }
    
  }

  eliminalinea(lin:Object) {
    let pos = this.prod.indexOf(lin); 
    // ELiminamos los numeros de serie(de la linea) de la seccion de los numeros que hay que añadir en garantias
      this.long=this.long-1;
      for (var i = 0; i < this.prod.length; i++) {
         if (i==pos){
           let a= JSON.stringify(this.prod[i]).lastIndexOf("\"numserie\":[\"");
           let b =JSON.stringify(this.prod[i]).lastIndexOf('"');
           var quita:string = JSON.stringify(this.prod[i]).substring(a+13,b);
         }
       } 
       var aux:string="";
       for (var i = 0; i < quita.length; i++) {
          if(quita[i]=="\""||quita[i]==","){
            if(quita[i]==","){
              this.long=this.long-1;
            }
            let posaux = this.generagarantia.indexOf(aux);
            this.generagarantia.splice(posaux,1);

            aux = "";              
          }
          else{
              aux=aux+quita[i];
          }
       }       
    this.prod.splice(pos, 1);
  }

  // Funcion que asigna la fecha de fin de garantia en función de la fecha de salida y del tiempo de garantia
  // asignado a cada país.
  setfinGarantia(finGarantia: Date){
    var fecha: Date = new Date();
    var dia: number = parseInt(finGarantia.toString().substring(8,10));
    var mes:number = parseInt(finGarantia.toString().substring(5,7));
    var año: number = parseInt(finGarantia.toString().substring(0,4));
    fecha.setFullYear(año,mes-1,dia);
    fecha.setMonth(fecha.getMonth()+6);
    finGarantia = fecha;
    return finGarantia;
  }

  save(datos: FormData){
      var idventa: string = this.segsalidaForm.controls['idventa'].value; 
      var fechaSegSalida: Date = this.segsalidaForm.controls['fechaSegSalida'].value;
      var finGarantia: Date = this.setfinGarantia(fechaSegSalida);
      var observaciones: string = this.segsalidaForm.controls['observaciones'].value;
      var salidas = this.prod;
      if(this.prod.length==0){
          alert("Debes añadir los materiales de la salida.");
      }else{
          // Añadimos las garantias de los productos vendidos
            var idp = this.generagarantia.pop();
                while(this.long>0){
                  this.long = this.long-1;
                  this._garantiapService.add(idp,finGarantia).subscribe((m) => {
                    });;
                  idp = this.generagarantia.pop();
                  this.generagarantia.splice(this.generagarantia.indexOf(idp),1);
                }

          this._segsalidaService
              .add(idventa,fechaSegSalida,finGarantia,observaciones,salidas)
              .subscribe((m) => {
          (<Control>this.segsalidaForm.controls['idventa']).updateValue("");
          (<Control>this.segsalidaForm.controls['fechaSegSalida']).updateValue("");
          (<Control>this.segsalidaForm.controls['observaciones']).updateValue("");
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
