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

import {LoginService} from '../services/login-service';


@Component({
  selector: 'login-cmp',
  templateUrl: 'client/dev/cliente/templates/login.html',
  styleUrls: ['client/dev/cliente/styles/cliente.css'],
  providers: [LoginService]
})
export class LoginCmp {
  title: string = "Login";
  clienteForm: ControlGroup;

  constructor(@Inject(FormBuilder) fb:FormBuilder, @Inject(LoginService) private _loginService: LoginService) {
    this.clienteForm = fb.group({
      "user": ["", Validators.required],
      "pass": ["", Validators.required]
    });
  }
}
