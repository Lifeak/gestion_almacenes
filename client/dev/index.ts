/// <reference path="../../node_modules/angular2/typings/browser.d.ts" />

import {
	bootstrap
} from 'angular2/platform/browser';
import {
	HTTP_PROVIDERS
} from 'angular2/http';

import {isLogged} from './login/services/isloggedin';

import {ProveedorCmp} from './proveedor/components/proveedor-cmp';
import {ProductoCmp} from './producto/components/producto-cmp';
import {PiezaCmp} from './pieza/components/pieza-cmp';
import {GarantiaCmp} from './garantia/components/garantia-cmp';
import {ModeloCmp} from './modelo/components/modelo-cmp';
import {ClienteCmp} from './cliente/components/cliente-cmp';
import {UserCmp} from './user/components/user-cmp';
import {AlmacenCmp} from './almacen/components/almacen-cmp';
import {LoginCmp} from './login/components/login-cmp';
import {HomeCmp} from './login/components/home-cmp';
import {App} from './login/app';

bootstrap(ProveedorCmp,[HTTP_PROVIDERS]);
bootstrap(ProductoCmp, [HTTP_PROVIDERS]);
bootstrap(PiezaCmp, [HTTP_PROVIDERS]);
bootstrap(GarantiaCmp, [HTTP_PROVIDERS]);
bootstrap(ModeloCmp, [HTTP_PROVIDERS]);
bootstrap(ClienteCmp, [HTTP_PROVIDERS]);
bootstrap(UserCmp, [HTTP_PROVIDERS]);
bootstrap(AlmacenCmp, [HTTP_PROVIDERS]);
bootstrap(LoginCmp, [HTTP_PROVIDERS]);
bootstrap(HomeCmp, [HTTP_PROVIDERS]);
bootstrap(App, [HTTP_PROVIDERS]);