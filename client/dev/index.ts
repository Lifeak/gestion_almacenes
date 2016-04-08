/// <reference path="../../node_modules/angular2/typings/browser.d.ts" />

import {
	bootstrap
} from 'angular2/platform/browser';
import {
	HTTP_PROVIDERS
} from 'angular2/http';


import {TodoCmp} from './todo/components/todo-cmp';
import {TodoListCmp} from './todo/components/todolist-cmp';
import {TodoEditCmp} from './todo/components/todoedit-cmp';
import {ClienteCmp} from './cliente/components/cliente-cmp';
import {UserCmp} from './user/components/user-cmp';
import {UserListCmp} from './user/components/userlist-cmp';
import {LoginCmp} from './login/components/login-cmp';
import {HomeCmp} from './login/components/home-cmp';
import {App} from './login/app';

bootstrap(TodoCmp, [HTTP_PROVIDERS]);
bootstrap(TodoListCmp, [HTTP_PROVIDERS]);
bootstrap(TodoEditCmp, [HTTP_PROVIDERS]);
bootstrap(ClienteCmp, [HTTP_PROVIDERS]);
bootstrap(UserCmp, [HTTP_PROVIDERS]);
bootstrap(UserListCmp, [HTTP_PROVIDERS]);
bootstrap(LoginCmp, [HTTP_PROVIDERS]);
bootstrap(HomeCmp, [HTTP_PROVIDERS]);
bootstrap(App, [HTTP_PROVIDERS]);