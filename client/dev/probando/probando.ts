

import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';

//import {TodoCmp} from './todo/components/todo-cmp';
//import {ClienteCmp} from './cliente/components/cliente-cmp';
import {PruebaCmp} from './components/prueba-cmp';
bootstrap(PruebaCmp, [HTTP_PROVIDERS]);


//bootstrap(TodoCmp, [HTTP_PROVIDERS]);
//bootstrap(ClienteCmp, [HTTP_PROVIDERS]);