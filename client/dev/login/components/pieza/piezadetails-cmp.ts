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
import {isLogged, isLoggedinAdmin, isLoggedinEncargado} from '../../services/isloggedin';
import {UserService} from '../../services/user/user-service';
import {Modelo} from '../../services/modelo/modelo-service';


@Component({
  templateUrl: 'client/dev/pieza/templates/details.html',
  providers:[UserService, LoginService, PiezaService]
})

  @CanActivate(() => isLogged())
export class PiezaDetailsCmp implements OnInit {
  @Input() pieza: Pieza;
  piezaForm: ControlGroup;
  modelos: Modelo[] = [];
  components: Array<string>;
  public token: string;
  public profile: string;

  constructor( @Inject(FormBuilder) fb: FormBuilder, private router: Router, private _routeParams: RouteParams, private _userService: UserService, private _loginService: LoginService, private _piezaService: PiezaService) {
    this.piezaForm = fb.group({
      "_id": ["", Validators.required],
      "modelo": ["", Validators.required],
      "estado": ["", Validators.required],
      "lote": ["", Validators.required],
      "caracteristicas": [""],
      "almacen": ["",Validators.required],
      "almacenOrigen":["",Validators.required],
      "vendido":["",Validators.required],
      "compuestoPor":[""],
      "precio":[""]
    });
    this.components = [];
  }
  

  ngOnInit() {
    let id = this._routeParams.get('id');
    this._piezaService
    .getPiezaId(id)
    .subscribe((pieza) => {
      this.pieza = pieza;    
      this.components = this.pieza.compuestoPor;
    });
  
    this._piezaService
    .getModelos()
    .subscribe((modelos) => {
      this.modelos = modelos;
    });


  }

  gotoIndex(){
    let piezaId = this.pieza ? this.pieza._id : null;
    this.router.navigate(['/ListPiezas']);
  }

  private _getAll():void {
    this._piezaService
        .getAll()
        .subscribe((piezas) => {
          this.pieza = piezas;
        });
  }

  buscar(numserie:string){
      this.router.navigate(['/DetailsSubPieza', { _id: numserie }]);
  }

  edit(pieza: Pieza) {
    let id = this._routeParams.get('id');
    if (pieza.precio == null) {
          this._piezaService
        .remove(id)
        .subscribe(() => {
          return this.pieza;
        });

          var compuestoPor: Array<string> = this.components;
          this._piezaService
        .add(pieza._id, pieza.modelo, pieza.estado, pieza.lote, pieza.caracterisiticas, pieza.almacen, pieza.almacenOrigen, pieza.vendido, pieza.compuestoPor, pieza.precio)
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
    } else if (pieza.precio.toString().indexOf(',') != -1) {
        alert("Error.La pieza no se puede modificar ya que el precio es incorrecto. Utiliza el . para los decimales.");
    }else{
        this._piezaService
          .remove(id)
          .subscribe(() => {
            return this.pieza;
          });

        var compuestoPor: Array<string> = this.components;
        this._piezaService
          .add(pieza._id, pieza.modelo, pieza.estado, pieza.lote, pieza.caracterisiticas, pieza.almacen, pieza.almacenOrigen, pieza.vendido, pieza.compuestoPor, pieza.precio)
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
  }

  delete(pieza: Pieza) {
    let id = this._routeParams.get('id');
    this._piezaService
      .remove(id)
      .subscribe(() => {
      return this.pieza;

      });
    this.gotoIndex();

  }

  plus(data: FormData): void {
      var nombre: string = this.piezaForm.controls['compuestoPor'].value;
      if (nombre == "") { 
        alert("Debes rellenar el campo.");
      } else {
        this.components.push(nombre);
        (<Control>this.piezaForm.controls['compuestoPor']).updateValue("");
    }

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
