import {
  Component,
  Inject,
  provide,
  OnInit
} from 'angular2/core';

import {
  Validators,
  FormBuilder,
  ControlGroup,
  Control
} from 'angular2/common';

import {
  Router,
  RouteParams,
  RouteConfig,
  ROUTER_PROVIDERS,
  CanActivate,
  ROUTER_DIRECTIVES
} from 'angular2/router';
import{bootstrap} from 'angular2/platform/browser';

import {UserService} from '../services/user-service';
import {LoginService} from '../../login/services/login-service';

import {UserListCmp} from './userlist-cmp';
import {UserDetailsCmp} from './userdetails-cmp';
import {UserCreateCmp} from './usercreate-cmp';
import {isLogged, isLoggedinAdmin, isLoggedinEncargado} from '../../login/services/isloggedin';

type User = {
  user: string;
  pass: string;
  nombre: string;
  apellido: string;
  tipo: string;
  _id: string;
}

@Component({
  selector: 'user-cmp',
  templateUrl: 'client/dev/user/templates/index.html',
  providers: [UserService, LoginService, ROUTER_PROVIDERS], // importante poner ROUTE_PROVIDERS
  directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    
  { path: '/ListUsuarios', name: 'ListUsuarios', component: UserListCmp},
  { path: '/Create', name: 'CreateUsuario', component: UserCreateCmp },
  { path: '/Details', name: 'DetailsUsuarios', component: UserDetailsCmp}
])

@CanActivate(() => isLogged())
export class UserCmp implements OnInit {
  title: string = "Users";
  users: User[] = [];
  userForm: ControlGroup;
  private _selectedId: string;


  constructor( @Inject(FormBuilder) fb: FormBuilder, @Inject(UserService) private _userService: UserService, @Inject(LoginService) private _loginService: LoginService, private router: Router) {
    this.userForm = fb.group({
      "user": ["", Validators.required],
      "pass": ["", Validators.required],
      "nombre": ["", Validators.required],
      "apellido": ["", Validators.required],
      "tipo": ["", Validators.required]
    });
  }

  ngOnInit() {
    this._getAll();
    this.router.navigate(['/ListUsuarios']);
  }

  private _getAll():void {
    this._userService
        .getAll()
        .subscribe((users) => {
          this.users = users;
        });
  }

  isSelected(user: User) {
    return user._id === this._selectedId;
  }
  onSelect(user: User) {
    this.router.navigate(['DetailsUsuarios', { id: user._id }]);
  }

  // Falta arreglar funcion para que añada todo correctamente
  add(user:string, pass: string, nombre:string, apellido:string, tipo:string):void {
    this._userService
        .add(user, pass, nombre, apellido, tipo)
        .subscribe((m) => {
          this.users.push(m);
          (<Control>this.userForm.controls['user']).updateValue("");
          (<Control>this.userForm.controls['pass']).updateValue("");
          (<Control>this.userForm.controls['nombre']).updateValue("");
          (<Control>this.userForm.controls['apellido']).updateValue("");
          (<Control>this.userForm.controls['tipo']).updateValue("");
        });
  }

  remove(id:string):void {
    this._userService
      .remove(id)
      .subscribe(() => {
        this.users.forEach((t, i) => {
          if (t._id === id)
            return this.users.splice(i, 1);
        });
      })
  }

  logout() {
    alert("logoutt");
    this._loginService.logout(); 
    window.location.replace("http://localhost:3000/");
    //this.router.navigate(['/Login']);

  }

  compras() {
    //alert("compras");
    window.location.replace("http://localhost:3000/#/compras");
    //this.router.navigate(['/Compras']);
  }

  ventas() {
    //alert("ventas");
    window.location.replace("http://localhost:3000/#/ventas");
    //this.router.navigate(['/Ventas']);
  }

  almacen() {
    window.location.replace("http://localhost:3000/#/almacen");
    //this.router.navigate(['/Almacen']);
  }

  admin() {
    window.location.replace("http://localhost:3000/#/admin");

   // this.router.navigate(['/Admin']);
  }

}
