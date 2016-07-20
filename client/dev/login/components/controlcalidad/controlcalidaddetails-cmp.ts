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

import {isLogged, isLoggedinAdmin, isLoggedinEncargado} from '../../services/isloggedin';
import {ControlCalidad,ControlService} from '../../services/controlcalidad/controlcalidad-service';
import {LoginService} from '../../services/login-service';
import {UserService} from '../../services/user/user-service';

@Component({
  templateUrl: 'client/dev/controlcalidad/templates/details.html',
  providers:[UserService, ControlService, LoginService]
})

  @CanActivate(() => isLoggedinAdmin())
export class ControlDetailsCmp implements OnInit {
  @Input() control: ControlCalidad;
  controlForm: ControlGroup;
  token: string;
  public profile: string;
  public myDate: Date;

  constructor( @Inject(FormBuilder) fb: FormBuilder, private router: Router, private _routeParams: RouteParams, private _controlService: ControlService, @Inject(LoginService) private _loginService: LoginService, private _userService: UserService) {
    this.controlForm = fb.group({
     "albaran": ["", Validators.required],
     "udsEntregadas":["",Validators.required],
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
  

  ngOnInit() {
    let id = this._routeParams.get('id');
    this.myDate = null;
    this._controlService
    .getControlId(id)
    .subscribe((control) => {
      this.control = control;
    });
  }

  gotoIndex(){
    this.router.navigate(['/ListControlCalidad']);
  }


  edit(control: ControlCalidad){
    this._controlService
      .add(control.albaran, control.udsEntregadas, control.udsRevisadas, control.noconformes, control.revisionfin, control.pctnoconf, control.noconformesfin, control.udsConformes, control.LCI, control.LC, control.LCS)
      .subscribe((m) => {
          
          (<Control>this.controlForm.controls['albaran']).updateValue("");
          (<Control>this.controlForm.controls['udsEntregadas']).updateValue("");
          (<Control>this.controlForm.controls['udsRevisadas']).updateValue("");
          (<Control>this.controlForm.controls['noconformes']).updateValue("");
          (<Control>this.controlForm.controls['revisionfin']).updateValue("");
          (<Control>this.controlForm.controls['pctnoconf']).updateValue("");
          (<Control>this.controlForm.controls['noconformesfin']).updateValue("");
          (<Control>this.controlForm.controls['udsConformes']).updateValue("");
          (<Control>this.controlForm.controls['LCI']).updateValue("");
          (<Control>this.controlForm.controls['LC']).updateValue("");
          (<Control>this.controlForm.controls['LCS']).updateValue("");
    });

    this._controlService
      .remove(control._id)
      .subscribe(() => {
        return this.control;

      });
    this.gotoIndex();

  }

  delete(control: ControlCalidad) {
    this._controlService
      .remove(control._id)
      .subscribe(() => {
        return this.control;

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
      localStorage.clear();
      this.router.navigate(['/Login']);
  }

  galmacenes() {
      this.router.navigate(['/ListAlmacenes']);
  }

  ggarantias() {
      this.router.navigate(['/ListGarantias']);
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
  gclientes() {
    this.router.navigate(['/ListClientes']);
  }


}
