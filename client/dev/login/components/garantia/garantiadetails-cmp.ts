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
import {GarantiaService, Garantia} from '../../services/garantia/garantia-service';
import {LoginService} from '../../services/login-service';
import {UserService} from '../../services/user/user-service';

@Component({
  templateUrl: 'client/dev/garantia/templates/details.html',
  providers:[GarantiaService, LoginService, UserService]
})

  @CanActivate(() => isLogged())
export class GarantiaDetailsCmp implements OnInit {
  @Input() garantia: Garantia;
  garantiaForm: ControlGroup;
  public token: string;
  public profile: string;

  constructor( @Inject(FormBuilder) fb: FormBuilder, private router: Router, private _routeParams: RouteParams, private _userService: UserService, private _garantiaService: GarantiaService, @Inject(LoginService) private _loginService: LoginService) {
    this.garantiaForm = fb.group({
      "_id": ["", Validators.required],
      "tiempo": ["", Validators.required]
    });
  }  

  ngOnInit() {
    let id = this._routeParams.get('id');
    this._garantiaService
    .getGarantiaId(id)
    .subscribe((garantia) => {
    this.garantia = garantia;
    });
  }

  gotoIndex(){
    let userId = this.garantia ? this.garantia._id : null;
    this.router.navigate(['/ListGarantias']);
  }
  private _getAll():void {
    this._garantiaService
        .getAll()
        .subscribe((garantia) => {
      this.garantia = garantia;
        });
  }
  edit(garantia: Garantia) {
    
    let id = this._routeParams.get('id');
    alert("nos llega a editar:" + garantia._id+" pero vamos a borrar "+id);
    this._garantiaService
      .remove(id)
      .subscribe(() => {
        return this.garantia;

      });

    this._garantiaService
    .add(garantia._id, garantia.tiempo)
      .subscribe((m) => {
          (<Control>this.garantiaForm.controls['_id']).updateValue("");
          (<Control>this.garantiaForm.controls['tiempo']).updateValue("");
    });

    
    this.gotoIndex();

  }
  delete(garantia: Garantia) {
    this._garantiaService
    .remove(garantia._id)
      .subscribe(() => {
      return this.garantia;

      });
    this.gotoIndex();

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
  logout() {
      this._loginService.logout();
      this.router.navigate(['/Login']);
  }

  galmacenes() {
      this.router.navigate(['/ListAlmacenes']);
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


  gusuarios() {
    if (localStorage.getItem(this.token) == "encargado") {
      let u = localStorage.key(1);
      if (u == "undefined") {
        let o = localStorage.key(0);
        this.getProfile(o);
      }else 
        this.getProfile(u);
    }else 
      this.router.navigate(['/ListUsuarios']);
  }

  public getProfile(name: string) {
    this._userService
      .getProfile(name)
      .subscribe((user) => {
        this.profile = user[0]._id;
        this.router.navigate(['Perfil', { id: this.profile }]);
      });
  }
  ggarantias(){
    this.router.navigate(['/ListGarantias']);
  }

}
