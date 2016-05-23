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
  templateUrl: 'client/dev/user/templates/profile.html'
})

@CanActivate(() => isLogged())
export class UserProfileCmp implements OnInit {
  @Input() user: User;
  userForm: ControlGroup;

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
    alert(id);
    this._userService
    .getUserId(id)
    .subscribe((user) => {
      this.user = user;
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
}
