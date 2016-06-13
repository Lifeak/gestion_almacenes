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
import {isLogged, isLoggedinAdmin, isLoggedinEncargado} from '../../services/isloggedin';
import {UserService, User} from '../../services/user/user-service';

@Component({
  templateUrl: 'client/dev/user/templates/create.html',
  providers: [LoginService, UserService]
})

@CanActivate(() => isLoggedinAdmin())
export class UserCreateCmp{
  @Input() user: User;
  userForm: ControlGroup;
  public token: string;
  public profile: string;

  constructor(@Inject(FormBuilder) fb: FormBuilder,private router: Router, private _routeParams: RouteParams, private _loginService: LoginService,private _userService: UserService){
    this.userForm = fb.group({
      "user": ["", Validators.required],
      "pass": ["", Validators.required],
      "passs": ["", Validators.required],
      "nombre": ["", Validators.required],
      "apellido": ["", Validators.required],
      "tipo": ["", Validators.required]
    });
  }
  
  gotoIndex(){
    let userId = this.user ? this.user._id : null;
    this.router.navigate(['/ListUsuarios']);

  }

  goBack(){
    window.history.back();
  }

  save(datos: FormData){
      var user: string = this.userForm.controls['user'].value;
      var pass: string = this.userForm.controls['pass'].value;
      var passs: string = this.userForm.controls['passs'].value;
      var nombre: string = this.userForm.controls['nombre'].value;
      var apellido: string = this.userForm.controls['apellido'].value;
      var tipo: string = this.userForm.controls['tipo'].value;
      if (pass == passs && pass.length>3) {

          this._userService
              .add(user, pass, nombre, apellido, tipo)
              .subscribe((m) => {
          (<Control>this.userForm.controls['user']).updateValue("");
          (<Control>this.userForm.controls['pass']).updateValue("");
          (<Control>this.userForm.controls['nombre']).updateValue("");
          (<Control>this.userForm.controls['apellido']).updateValue("");
          (<Control>this.userForm.controls['tipo']).updateValue("");
              });

          this.gotoIndex();

      }else{
          alert("Error, password inválido.")
      }
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
  

}
