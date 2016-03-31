/// <reference path="../../node_modules/angular2/typings/browser.d.ts" />
"use strict";
var browser_1 = require('angular2/platform/browser');
var http_1 = require('angular2/http');
var todo_cmp_1 = require('./todo/components/todo-cmp');
var todolist_cmp_1 = require('./todo/components/todolist-cmp');
var cliente_cmp_1 = require('./cliente/components/cliente-cmp');
browser_1.bootstrap(todo_cmp_1.TodoCmp, [http_1.HTTP_PROVIDERS]);
browser_1.bootstrap(todolist_cmp_1.TodoListCmp, [http_1.HTTP_PROVIDERS]);
browser_1.bootstrap(cliente_cmp_1.ClienteCmp, [http_1.HTTP_PROVIDERS]);
