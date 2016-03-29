"use strict";
var browser_1 = require('angular2/platform/browser');
var http_1 = require('angular2/http');
//import {TodoCmp} from './todo/components/todo-cmp';
//import {ClienteCmp} from './cliente/components/cliente-cmp';
var prueba_cmp_1 = require('./components/prueba-cmp');
browser_1.bootstrap(prueba_cmp_1.PruebaCmp, [http_1.HTTP_PROVIDERS]);
//bootstrap(TodoCmp, [HTTP_PROVIDERS]);
//bootstrap(ClienteCmp, [HTTP_PROVIDERS]); 
