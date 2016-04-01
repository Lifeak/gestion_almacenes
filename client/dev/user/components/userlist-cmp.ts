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
Router,
RouteParams
} from 'angular2/router';


import {User, UserService} from '../services/user-service';



@Component({
  templateUrl: 'client/dev/user/templates/list.html',
  styleUrls: ['client/dev/user/styles/cliente.css']
})

export class UserListCmp implements OnInit {
  title: string = "Users";
  users: User[] = [];
  private _selectedId: string;


  constructor(private _userService: UserService, private _router: Router, routeParams: RouteParams) {
    this._selectedId = routeParams.get('id');
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
  isSelected(user:User){
    return user._id === this._selectedId;
  }
  onSelect(user:User){
    this._router.navigate(['DetailsUsuarios',{id: user._id}]);
  }
/*
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
  }*/
}
