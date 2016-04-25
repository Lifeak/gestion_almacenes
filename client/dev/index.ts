/// <reference path="../../node_modules/angular2/typings/browser.d.ts" />

import {
	bootstrap
} from 'angular2/platform/browser';
import {
	HTTP_PROVIDERS
} from 'angular2/http';


import {ClienteCmp} from './cliente/components/cliente-cmp';
import {UserCmp} from './user/components/user-cmp';
import {UserListCmp} from './user/components/userlist-cmp';
import {AlmacenCmp} from './almacen/components/almacen-cmp';
import {AlmacenListCmp} from './almacen/components/almacenlist-cmp';
import {LoginCmp} from './login/components/login-cmp';
import {HomeCmp} from './login/components/home-cmp';
import {App} from './login/app';

bootstrap(ClienteCmp, [HTTP_PROVIDERS]);
bootstrap(UserCmp, [HTTP_PROVIDERS]);
bootstrap(UserListCmp, [HTTP_PROVIDERS]);
bootstrap(AlmacenCmp, [HTTP_PROVIDERS]);
bootstrap(AlmacenListCmp, [HTTP_PROVIDERS]);
bootstrap(LoginCmp, [HTTP_PROVIDERS]);
bootstrap(HomeCmp, [HTTP_PROVIDERS]);
bootstrap(App, [HTTP_PROVIDERS]);