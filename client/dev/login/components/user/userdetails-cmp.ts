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
import {UserService, User} from '../../services/user/user-service';
import {LoginService} from '../../services/login-service';


@Component({
  templateUrl: 'client/dev/user/templates/details.html',
  providers: [LoginService, User, UserService]
})

@CanActivate(() => isLogged())
export class UserDetailsCmp implements OnInit {
  @Input() user: User;
  userForm: ControlGroup;
  public token: string;
  public profile: string;

  constructor( @Inject(FormBuilder) fb: FormBuilder, private router: Router, private _routeParams: RouteParams, private _userService: UserService, @Inject(LoginService) private _loginService: LoginService) {
    this.userForm = fb.group({
      "user": ["", Validators.required],
      "pass": ["", Validators.required],
      "nombre": ["", Validators.required],
      "apellido": ["", Validators.required],
      "tipo": ["", Validators.required]
    });
  }
  

  ngOnInit() {
    let id = this._routeParams.get('id');
    this._userService
    .getUserId(id)
    .subscribe((user) => {
      this.user = user;
    });
  }

  gotoIndex(){
    let userId = this.user ? this.user._id : null;
    this.router.navigate(['/ListUsuarios']);
  }
  private _getAll():void {
    this._userService
        .getAll()
        .subscribe((users) => {
          this.user = users;
        });
  }
  edit(user: User){

    this._userService
      .add(user.user, user.pass,user.nombre, user.apellido, user.tipo)
      .subscribe((m) => {
          //this.user.push(m);
          (<Control>this.userForm.controls['user']).updateValue("");
          (<Control>this.userForm.controls['pass']).updateValue("");
          (<Control>this.userForm.controls['nombre']).updateValue("");
          (<Control>this.userForm.controls['apellido']).updateValue("");
          (<Control>this.userForm.controls['tipo']).updateValue("");
    });

    this._userService
      .remove(user._id)
      .subscribe(() => {
        return this.user;

      });
    this.gotoIndex();

  }
  delete(user: User) {
    this._userService
      .remove(user._id)
      .subscribe(() => {
        return this.user;

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

  almacenes() {
      this.router.navigate(['/ListAlmacenes']);
  }

  garantias() {
      this.router.navigate(['/ListGarantias']);
  }

  usuarios() {
    if (localStorage.getItem(this.token) == "encargado") {
      let u = localStorage.key(1);
      // alert("1en u tenemos " + u);
      if (u == "undefined") {
        let e = localStorage.key(0);
        //alert("2en u tenemos " + u);
        this.getProfile(e);
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
        //alert("en el get, el id es " +this.profile);
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

}
