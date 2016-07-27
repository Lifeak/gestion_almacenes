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
import {Transporte, TransporteService} from '../../services/transporte/transporte-service';
import {LoginService} from '../../services/login-service';
import {UserService} from '../../services/user/user-service';


@Component({
  templateUrl: 'client/dev/transporte/templates/details.html',
  providers:[UserService, LoginService, TransporteService]
})

  @CanActivate(() => isLogged())
export class TransporteDetailsCmp implements OnInit {
  @Input() transporte: Transporte;
  transporteForm: ControlGroup;
  public token: string;
  public profile: string;

  constructor( @Inject(FormBuilder) fb: FormBuilder, private router: Router, private _routeParams: RouteParams, private _transporteService: TransporteService,private _userService: UserService, @Inject(LoginService) private _loginService: LoginService) {
    this.transporteForm = fb.group({
      "nombre": ["", Validators.required],
      "direccion": ["", Validators.required],
      "ciudad": ["", Validators.required],
      "pais": ["", Validators.required],
      "telefono": ["", Validators.required],
      "email": ["", Validators.required],
      "detalles": [""],
      "valoracion":[""]
    });
  }
  

  ngOnInit() {
    let id = this._routeParams.get('id');
    this._transporteService
    .getTransporteId(id)
    .subscribe((transporte) => {
      this.transporte = transporte;
    });
  }

  gotoIndex(){
    this.router.navigate(['/ListTransportes']);
  }

  edit(transporte: Transporte){
  
      let id = this._routeParams.get('id');
      this._transporteService
        .add(transporte.nombre, transporte.direccion, transporte.ciudad, transporte.pais, transporte.telefono, transporte.email, transporte.detalles, transporte.valoracion)
        .subscribe((m) => {
          (<Control>this.transporteForm.controls['nombre']).updateValue("");
          (<Control>this.transporteForm.controls['direccion']).updateValue("");
          (<Control>this.transporteForm.controls['ciudad']).updateValue("");
          (<Control>this.transporteForm.controls['pais']).updateValue("");
          (<Control>this.transporteForm.controls['telefono']).updateValue("");
          (<Control>this.transporteForm.controls['email']).updateValue("");
          (<Control>this.transporteForm.controls['detalles']).updateValue("");
          (<Control>this.transporteForm.controls['valoracion']).updateValue("");
        });

        this._transporteService
                .remove(id)
                .subscribe(() => {
                  return this.transporte;
                });
        this.gotoIndex();

  }
  delete(transporte: Transporte) {
    this._transporteService
      .remove(transporte._id)
      .subscribe(() => {
      return this.transporte;

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
