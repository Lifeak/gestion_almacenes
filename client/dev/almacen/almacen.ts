
import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';
import {provide} from 'angular2/core';
import {ROUTER_PROVIDERS,
	LocationStrategy, HashLocationStrategy} from 'angular2/router';

import {AlmacenCmp} from './components/almacen-cmp';
import {AlmacenListCmp} from './components/almacenlist-cmp';
bootstrap(AlmacenCmp, [HTTP_PROVIDERS]);
bootstrap(AlmacenListCmp, [HTTP_PROVIDERS]);

