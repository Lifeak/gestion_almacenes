import {
  Component,
  Inject,
  Input,
  OnInit
} from 'angular2/core';

import {
  Validators,
  FormBuilder,
  ControlGroup,
  Control
} from 'angular2/common';

import {TodoService} from '../services/todo-service';

type Todo = {
  todoMessage: string;
  todoM: string;
  _id: string;
}

@Component({
  selector: 'todoedit-cmp',
  templateUrl: 'client/dev/todo/templates/todoedit.html',
  styleUrls: ['client/dev/todo/styles/todo.css'],
  providers: [TodoService],
})

export class TodoEditCmp implements OnInit {
  title: string = "ng2do";
  todos: Todo[] = [];
  //fb: FormBuilder;
  todoForm: ControlGroup;

 

  constructor(@Inject(FormBuilder) fb:FormBuilder, @Inject(TodoService) private _todoService: TodoService) {
    this.todoForm = fb.group({
      "todoMessage": ["", Validators.required],
      "todoM":["",Validators.required]
    });
  }
  @Input()
  private _id:string;

  ngOnInit(){
  }

  private _getAll():void {
    this._todoService
        .getAll()
        .subscribe((todos) => {
          this.todos = todos;
        });
  }


  /*edit(id:string):*/

  getbyId(id: string):void{
    this._todoService
        .getbyId(id)
        .subscribe((todos) =>{
          this.todos = todos;

        })
  }
}
