import {
  Inject
} from 'angular2/core';

import {
  Observable
} from 'rxjs/Observable';

import {
  Http,
  Headers
} from 'angular2/http';


import 'rxjs/add/operator/map';
import {TodoCmp} from '../components/todo-cmp';
import {TodoListCmp} from '../components/todolist-cmp';

export class TodoService {
  static ENDPOINT: string = '/api/todos/:id';
  constructor(@Inject(Http) private _http: Http) {

  }

  getAll():Observable<any> {
    return this._http
               .get(TodoService.ENDPOINT.replace(':id', ''))
               .map((r) => r.json());
  }

  add(todoMessage: String, todoM: String ): Observable<any> {
    let body = JSON.stringify({todoMessage,todoM}); 
    let headers = new Headers();
    headers.append('Content-Type','application/json');
    return this._http
      .post(TodoService.ENDPOINT.replace(':id', ''), body, { headers })
              

               .map((r) => r.json());
  }

  remove(id: string):Observable<any> {
    return this._http
               .delete(TodoService.ENDPOINT.replace(':id', id));
  }

  getbyId(id: string):Observable<any>{
    return this._http
      .get(TodoService.ENDPOINT.replace(':id', id))
      .map((r) => r.json());
  }
  edit(id:string):Observable<any>{
    return this._http
    .get(TodoService.ENDPOINT.replace(':id', ''))
    .map((r) => r.json());
  }
}
