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
  RouteParams, Router
} from 'angular2/router';

import {TodoService} from '../services/todo-service';

type Todo = {
  todoMessage: string;
  todoM: string;
  _id: string;
}

@Component({
  templateUrl: 'client/dev/todo/templates/detalles.html',
  styleUrls: ['client/dev/todo/styles/todo.css'],
  providers: [TodoService],
})

export class TodoDetalles{
  title: string = "Detalles";
  todi: Todo;

  constructor(private Router,
      routeParams:RouteParams, service: TodoService){
      let _id = routeParams.get('id');
      
      service.getbyId(_id);

  }

   gotoTodo(){
     this.Router.navigate(['Todo']);
   }
}
