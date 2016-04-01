import {
  Component,
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
  Router
} from 'angular2/router';


import {UserService, User} from '../services/user-service';

//import {UserCmp} from './user-cmp';



@Component({
  //selector: 'user-cmp',
  templateUrl: 'client/dev/user/templates/details.html',
  styleUrls: ['client/dev/user/styles/cliente.css']
})


export class UserDetailsCmp implements OnInit {
  user: User;

  constructor(private _router: Router, private _routeParams: RouteParams, private _userService: UserService){}
  

  ngOnInit() {
    let id = this._routeParams.get('_id');
    this._userService
    .getUserId(id)
    .subscribe((user) => {
      this.user = user;
    });
  }

  gotoIndex(){
    let userId = this.user ? this.user._id : null;
    this._router.navigate(['ListUsuarios']);
  }
  private _getAll():void {
    this._userService
        .getAll()
        .subscribe((users) => {
          this.user = users;
        });
  }
/*
  // Falta arreglar funcion para que añada todo correctamente
  add(user:string, pass: string, nombre:string, apellido:string, tipo:string):void {
    this._userService
        .add(user, pass, nombre, apellido, tipo)
        .subscribe((m) => {
          this.user.push(m);
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
  }*/
}
