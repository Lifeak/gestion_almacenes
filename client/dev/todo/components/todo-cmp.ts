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

import {TodoService} from '../services/todo-service';

type Todo = {
  todoMessage: string;
  todoM: string;
  _id: string;
}

@Component({
  selector: 'todo-cmp',
  templateUrl: 'client/dev/todo/templates/todo.html',
  styleUrls: ['client/dev/todo/styles/todo.css'],
  providers: [TodoService]
})
export class TodoCmp implements OnInit {
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


  ngOnInit() {
    this._getAll();
  }

  private _getAll():void {
    this._todoService
        .getAll()
        .subscribe((todos) => {
          this.todos = todos;
        });
  }

  /*add(message:string,mes:string):void {
    this._todoService
        .add(message,mes)
        .subscribe(([m,a]) => {
          this.todos.push(m,a);
          (<Control>this.todoForm.controls['todoMessage']).updateValue("");
          (<Control>this.todoForm.controls['todoM']).updateValue("");
        });
  }*/
  add(todo: FormData): void {
    alert(this.todoForm.controls['todoMessage'].value);
    var a: String = this.todoForm.controls['todoMessage'].value;
    var b: String = this.todoForm.controls['todoM'].value;
    alert(this.todoForm.controls['todoM'].value);
    this._todoService
    .add(a,b)
      .subscribe((m) => {
        this.todos.push(todo[0],todo[1]);
        (<Control>this.todoForm.controls['todoMessage']).updateValue("");
        (<Control>this.todoForm.controls['todoM']).updateValue("");
      });
  }

  remove(id:string):void {
    this._todoService
      .remove(id)
      .subscribe(() => {
        this.todos.forEach((t, i) => {
          if (t._id === id)
            return this.todos.splice(i, 1);
        });
      })
  }
}
