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


//import {UserCmp} from './user-cmp';



@Component({
  templateUrl: 'client/dev/user/templates/create.html',
  styleUrls: ['client/dev/user/styles/cliente.css']
})


export class UserCreateCmp{
  @Input() user: User;
  userForm: ControlGroup;

  constructor(@Inject(FormBuilder) fb: FormBuilder,private _router: Router, private _routeParams: RouteParams, private _userService: UserService){
    this.userForm = fb.group({
      "user": ["", Validators.required],
      "pass": ["", Validators.required],
      "nombre": ["", Validators.required],
      "apellido": ["", Validators.required],
      "tipo": ["", Validators.required]
    });
  }
  
  gotoIndex(){
    let userId = this.user ? this.user._id : null;
    this._router.navigate(['/ListUsuarios']);

  }

  goBack(){
    window.history.back();
  }

  save(datos: FormData){
      alert("entramos a guardar");
      var user: string = this.userForm.controls['user'].value;
      var pass: string = this.userForm.controls['pass'].value;
      var nombre: string = this.userForm.controls['nombre'].value;
      var apellido: string = this.userForm.controls['apellido'].value;
      var tipo: string = this.userForm.controls['tipo'].value;
      this._userService
          .add(user, pass,nombre, apellido, tipo)
          .subscribe((m) => {
          //this.user.push(m);
            (<Control>this.userForm.controls['user']).updateValue("");
            (<Control>this.userForm.controls['pass']).updateValue("");
            (<Control>this.userForm.controls['nombre']).updateValue("");
            (<Control>this.userForm.controls['apellido']).updateValue("");
            (<Control>this.userForm.controls['tipo']).updateValue("");
    });

    this.gotoIndex();

  }

  

}
