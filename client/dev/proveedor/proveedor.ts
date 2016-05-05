
import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';
import {provide} from 'angular2/core';
import {ROUTER_PROVIDERS,
	LocationStrategy, HashLocationStrategy} from 'angular2/router';

import {ProveedorCmp} from './components/proveedor-cmp';
import {ProveedorListCmp} from './components/proveedorlist-cmp';
bootstrap(ProveedorCmp, [HTTP_PROVIDERS]);
bootstrap(ProveedorListCmp, [HTTP_PROVIDERS]);

