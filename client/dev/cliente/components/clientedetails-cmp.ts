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
  Router
} from 'angular2/router';


import {UserService, User} from '../services/user-service';
import {LoginService} from '../../login/services/login-service';

//import {UserCmp} from './user-cmp';



@Component({
  //selector: 'user-cmp',
  templateUrl: 'client/dev/user/templates/details.html',
  styleUrls: ['client/dev/user/styles/cliente.css']
})


export class UserDetailsCmp implements OnInit {
  @Input() user: User;
  userForm: ControlGroup;

  constructor( @Inject(FormBuilder) fb: FormBuilder, private _router: Router, private _routeParams: RouteParams, private _userService: UserService, @Inject(LoginService) private _loginService: LoginService) {
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
    //alert(id);
    this._userService
    .getUserId(id)
    .subscribe((user) => {
      this.user = user;
    });
  }

  gotoIndex(){
    let userId = this.user ? this.user._id : null;
    this._router.navigate(['/ListUsuarios']);
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

}
