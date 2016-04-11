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
  //selector: 'todoedit-cmp',
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


  edit(id:string):void{
  }

  update(id:string, datos: FormData): void {
    /*alert(this.todoForm.controls['todoMessage'].value);
    var a: String = this.todoForm.controls['todoMessage'].value;
    var b: String = this.todoForm.controls['todoM'].value;
    alert(this.todoForm.controls['todoM'].value);
    this._todoService
      .add(a, b)
      .subscribe((m) => {
        this.todos.push(todo[0], todo[1]);
        (<Control>this.todoForm.controls['todoMessage']).updateValue("");
        (<Control>this.todoForm.controls['todoM']).updateValue("");
      });*/
  }

  getbyId(id: string):void{
    this._todoService
        .getbyId(id)
        .subscribe((todos) =>{
          this.todos = todos;

        })
  }
}
