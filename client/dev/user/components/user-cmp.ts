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
  ROUTER_DIRECTIVES
} from 'angular2/router';
import{bootstrap} from 'angular2/platform/browser';

import {UserService} from '../services/user-service';

import {UserListCmp} from './userlist-cmp';
import {UserDetailsCmp} from './userdetails-cmp';

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
  //templateUrl: 'client/dev/user/templates/index.html',
  template: `<div class="cliente-container">
  <h1>MENU</h1>
  <nav>
   <li><a [routerLink]="['/ListUsuarios']">Listado</a></li>
   <li><a [routerLink]="['/DetailsUsuarios']">Detalles</a></li>
   <a href="http://localhost:3000/api/user">Este listado</a>
</nav>
    <div>
    El resultado es..
    <router-outlet></router-outlet></div>
</div>`,
  styleUrls: ['client/dev/user/styles/cliente.css'],
  providers: [UserService],
  directives: [ROUTER_DIRECTIVES]
})

@RouteConfig([
    { path: '/user', name: 'Usuarios', component: UserCmp, useAsDefault:true },
  { path: '/ListUsuarios', name: 'ListUsuarios', component: UserListCmp },
    //{ path: '/api/user', name: 'ListUsuarios', component: UserListCmp },
    { path: '/user/:id', name: 'DetailsUsuarios', component: UserDetailsCmp}
])


export class UserCmp implements OnInit {
  title: string = "Users";
  users: User[] = [];
  userForm: ControlGroup;


  constructor(@Inject(FormBuilder) fb:FormBuilder, @Inject(UserService) private _userService: UserService) {
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
  }

  private _getAll():void {
    this._userService
        .getAll()
        .subscribe((users) => {
          this.users = users;
        });
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
}
