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
  ROUTER_PROVIDERS,
  ROUTER_DIRECTIVES,
  RouteConfig,
  RouteParams
} from 'angular2/router';

import {LoginService} from '../services/login-service';
import {App} from '../app';


@Component({
  //selector: 'login-cmp',
  template:`<h2>hola</h2>`,
 // templateUrl: 'client/dev/login/templates/login.html',
  styleUrls: ['client/dev/cliente/styles/cliente.css'],
  //directives: [ROUTER_DIRECTIVES],
  providers: [LoginService, ROUTER_PROVIDERS]
})


export class Hola {
  title: string = "Hola";



  constructor() {

  }


      
}
