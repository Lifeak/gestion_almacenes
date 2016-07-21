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
  Router,
  CanActivate
} from 'angular2/router';

import {LoginService} from '../../services/login-service';
import {UserService} from '../../services/user/user-service';
import {ControlCalidad,ControlService} from '../../services/controlcalidad/controlcalidad-service';
import {isLogged, isLoggedinAdmin, isLoggedinEncargado} from '../../services/isloggedin';

@Component({
  templateUrl: 'client/dev/controlcalidad/templates/create.html',
  providers:[LoginService, ControlService, UserService]
})

@CanActivate(() => isLoggedinAdmin())
export class ControlCreateCmp{
  @Input() controlcalidad: ControlCalidad;
  controlForm: ControlGroup;
  public token: string;
  public profile: string;

  constructor(@Inject(FormBuilder) fb: FormBuilder,private router: Router, private _routeParams: RouteParams,private _loginService: LoginService, private _controlService: ControlService, private _userService: UserService){
    this.controlForm = fb.group({
      "albaran": ["", Validators.required],
      "udsEntregadas": ["", Validators.required],
      "udsRevisadas": ["", Validators.required],
      "noconformes": [""],
      "revisionfin": ["", Validators.required],
      "pctnoconf": [""],
      "noconformesfin": [""],
      "udsConformes": [""],
      "LCI": [""],
      "LC": [""],
      "LCS": [""]

    });
  }
  
  gotoIndex(){
    this.router.navigate(['/ListControlCalidad']);

  }

  save(datos: FormData){
      var albaran: string = this.controlForm.controls['albaran'].value;
      var udsEntregadas:number=this.controlForm.controls['udsEntregadas'].value;
      var udsRevisadas: number = this.controlForm.controls['udsRevisadas'].value;
      var noconformes: number = this.controlForm.controls['noconformes'].value;
      var revisionfin: string = this.controlForm.controls['revisionfin'].value;
      var pctnoconf:number;
      var noconformesfin: number = this.controlForm.controls['noconformesfin'].value;
      var udsConformes: number = null;
      if(revisionfin=="No"){
        pctnoconf = (noconformes/udsRevisadas)*100;
      }else{
        pctnoconf = (noconformes/udsEntregadas)*100;
        udsConformes = udsEntregadas - noconformesfin;
      }
      var LCI: number = this.controlForm.controls['LCI'].value;
      var LC: number = this.controlForm.controls['LC'].value;
      var LCS: number = this.controlForm.controls['LCS'].value;

       this._controlService
              .add(albaran,udsEntregadas,udsRevisadas,noconformes,revisionfin,pctnoconf,noconformesfin,udsConformes,LCI,LC,LCS)
              .subscribe((m) => {
                    (<Control>this.controlForm.controls['albaran']).updateValue("");
                    (<Control>this.controlForm.controls['udsEntregadas']).updateValue("");
                    (<Control>this.controlForm.controls['udsRevisadas']).updateValue("");
                    (<Control>this.controlForm.controls['noconformes']).updateValue("");
                    (<Control>this.controlForm.controls['revisionfin']).updateValue("");
                    (<Control>this.controlForm.controls['noconformesfin']).updateValue("");
                    (<Control>this.controlForm.controls['LCI']).updateValue("");
                    (<Control>this.controlForm.controls['LC']).updateValue("");
                    (<Control>this.controlForm.controls['LCS']).updateValue("");
              });

          this.gotoIndex();

  }

  compras() {
    this.router.navigate(['/Compras']);
  }

  ventas() {
    this.router.navigate(['/Ventas']);
  }

  goalmacen() {
    this.router.navigate(['/Almacen']);
  }

  admin() {
    this.router.navigate(['/Admin']);
  }
  logout() {
      this._loginService.logout();
      this.router.navigate(['/Login']);
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

}
