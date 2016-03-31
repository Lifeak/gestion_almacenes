/// <reference path="../../node_modules/angular2/typings/browser.d.ts" />

import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';

import {TodoCmp} from './todo/components/todo-cmp';
import {TodoListCmp} from './todo/components/todolist-cmp';
import {ClienteCmp} from './cliente/components/cliente-cmp';

bootstrap(TodoCmp, [HTTP_PROVIDERS]);
bootstrap(TodoListCmp, [HTTP_PROVIDERS]);
bootstrap(ClienteCmp, [HTTP_PROVIDERS]);