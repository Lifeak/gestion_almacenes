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

import {LoginService} from '../../services/login-service';
import {isLogged, isLoggedinAdmin, isLoggedinEncargado} from '../../services/isloggedin';
import {Venta,VentasService} from '../../services/ventas/ventas-service';
import {UserService} from '../../services/user/user-service';
import {Modelo} from '../../services/modelo/modelo-service';
import {Garantia} from '../../services/garantia/garantia-service';
import {GarantiapService} from '../../services/garantiapieza/garantiapieza-service';
import {Transporte} from '../../services/transporte/transporte-service';


@Component({
  templateUrl: 'client/dev/ventas/templates/create.html',
  directives:[ROUTER_DIRECTIVES],
  providers: [LoginService, UserService,VentasService,GarantiapService]
})

  @CanActivate(() => isLogged())
export class VentaCreateCmp{
  @Input() venta: Venta;
  public lineas:Array<Object>=[];
  ventaForm: ControlGroup;
  public token: string;
  public profile: string;
  modelos: Modelo[]=[];
  paises: Garantia[]=[];
  series: Array<string>=[];
  transportes: Transporte[]=[];
  long:number=0;
  public error:string="";
  generagarantia: Array<string>=[]; // Almacenará los numeros de serie de todos los productos vendidos para generar sus garantías

  constructor(@Inject(FormBuilder) fb: FormBuilder,private router: Router, private _routeParams: RouteParams, private _userService: UserService,private _ventasService: VentasService, private _loginService: LoginService, private _garantiapService: GarantiapService){
    this.ventaForm = fb.group({
      "cliente": ["", Validators.required],
      "direccionEnvio": ["", Validators.required],
      "ciudad": ["", Validators.required],
      "pais": ["", Validators.required],
      "numPedido": ["", Validators.required],
      "fechaSalida": ["", Validators.required],
      "transporte": ["", Validators.required],
      "agente": [""],
      "observaciones": [""],
      "lineasventa": [""], 
      "modelo": [""],
      "unidades":[""],
      "tipoOperacion":[""],
      "numSerie":[""]
    });
  }
  
  ngOnInit(){
     this._ventasService
    .getModelos()
    .subscribe((modelos) => {
    this.modelos = modelos; 
   });

    this._ventasService
    .getGarantiaPais()
    .subscribe((garantias) => {
    this.paises = garantias; 
   });

    this._ventasService
    .getTransportes()
    .subscribe((transportes) =>{
      this.transportes = transportes; 
    });
  }
  
  gotoIndex(){
    this.router.navigate(['/ListVentas']);
  }

  goBack(){
    window.history.back();
  }

  save(datos: FormData){
    if(this.lineas.length==0){
      //  alert("Debes introducir las lineas de pedido");
       this.error = "Debes introducir las lineas de pedido";

    }else{

        var cliente: string = this.ventaForm.controls['cliente'].value;
        var direccionEnvio: string = this.ventaForm.controls['direccionEnvio'].value;
        var ciudad: string = this.ventaForm.controls['ciudad'].value;
        var pais: string = this.ventaForm.controls['pais'].value;
        var numPedido: string = this.ventaForm.controls['numPedido'].value;
        var fechaSalida: Date = this.ventaForm.controls['fechaSalida'].value;
        var agente: string = this.ventaForm.controls['agente'].value;
        var transporte: string = this.ventaForm.controls['transporte'].value;
        var observaciones: string = this.ventaForm.controls['observaciones'].value;
        var finGarantia:Date=fechaSalida;
        var lineas =this.lineas;
        if(pais == ""){
          alert("Debes rellenar el país");
        }else{
            for (var i = 0; i < this.paises.length; i++) {
              if (this.paises[i]._id==pais)
                var tiempo = this.paises[i].tiempo;
            }
            finGarantia = this.setfinGarantia(finGarantia, tiempo);
            // Añadimos las garantias de los productos vendidos
            var idp = this.generagarantia.pop();
                while(this.long>0){
                  this.long = this.long-1;
                  this._garantiapService.add(idp,finGarantia).subscribe((m) => {
                    });;
                  idp = this.generagarantia.pop();
                  this.generagarantia.splice(this.generagarantia.indexOf(idp),1);
                }
            this._ventasService
            .add(cliente,direccionEnvio,ciudad,pais,numPedido,fechaSalida,finGarantia,transporte,agente,observaciones,lineas)
            .subscribe((m) => {
            (<Control>this.ventaForm.controls['cliente']).updateValue("");
            (<Control>this.ventaForm.controls['direccionEnvio']).updateValue("");
            (<Control>this.ventaForm.controls['ciudad']).updateValue("");
            (<Control>this.ventaForm.controls['pais']).updateValue("");
            (<Control>this.ventaForm.controls['numPedido']).updateValue("");
            (<Control>this.ventaForm.controls['fechaSalida']).updateValue("");
            (<Control>this.ventaForm.controls['agente']).updateValue("");
            (<Control>this.ventaForm.controls['transporte']).updateValue("");
            (<Control>this.ventaForm.controls['observaciones']).updateValue("");
            });
            this.lineas=[];
            

            this.gotoIndex();
            
        }
      }
  }

  // Añade los numeros de serie a una lista
  mas(numSerie: string){
    if (numSerie!=""){
        this.series.push(numSerie);
        (<Control>this.ventaForm.controls['numSerie']).updateValue("");
    }else{
      alert("Debes rellenar los numeros de serie")
    }
  }

  // Elimina un numero de serie de la lista
  menos(numSerie:string){
      let pos = this.series.indexOf(numSerie);
      this.series.splice(pos,1);
  }

  // Toma los datos del formulario del modal y los guarda en una linea de pedido
  guardalinea(datos: FormData){
      var modelo: string = this.ventaForm.controls['modelo'].value;
      var unidades: number = this.ventaForm.controls['unidades'].value;
      var tipoOperacion: string = this.ventaForm.controls['tipoOperacion'].value;
      var numSerie: Array<string>=this.series;
      // Añadimos los números de serie para generar las garantias
      for (var i = 0; i < this.series.length; i++) {
        this.long=this.long+1;
        this.generagarantia.push(this.series[i]);
      }
    if (modelo == "" || unidades == null || tipoOperacion == ""){
      alert("Debes rellenar todos los campos");
    }else{
      if(unidades!=this.series.length){
        alert("Los numeros de serie no se corresponden con el número de unidades vendidas.");
      }else{
          let nuevalinea: Object = {modelo, unidades, tipoOperacion, numSerie};
          this.lineas.push(nuevalinea);
          (<Control>this.ventaForm.controls['modelo']).updateValue("");
          (<Control>this.ventaForm.controls['unidades']).updateValue("");
          (<Control>this.ventaForm.controls['tipoOperacion']).updateValue("");
          this.series=[];
      }
    }      
  }

  // Elimina una linea del pedido
  eliminalinea(lin:Object){
      let pos = this.lineas.indexOf(lin);  
      // ELiminamos los numeros de serie(de la linea) de la seccion de los numeros que hay que añadir en garantias
      this.long=this.long-1;
      for (var i = 0; i < this.lineas.length; i++) {
         if (i==pos){
           let a= JSON.stringify(this.lineas[i]).lastIndexOf("\"numSerie\":[\"");
           let b =JSON.stringify(this.lineas[i]).lastIndexOf('"');
           var quita:string = JSON.stringify(this.lineas[i]).substring(a+13,b);
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
       // Eliminamos la linea
      this.lineas.splice(pos,1);
  }

  // Funcion que asigna la fecha de fin de garantia en función de la fecha de salida y del tiempo de garantia
  // asignado a cada país.
  setfinGarantia(finGarantia: Date, tiempo:number){
    var fecha: Date = new Date();
    var dia: number = parseInt(finGarantia.toString().substring(8,10));
    var mes:number = parseInt(finGarantia.toString().substring(5,7));
    var año: number = parseInt(finGarantia.toString().substring(0,4));
    fecha.setFullYear(año,mes-1,dia);
    fecha.setMonth(fecha.getMonth()+tiempo);
    finGarantia = fecha;
    return finGarantia;
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
