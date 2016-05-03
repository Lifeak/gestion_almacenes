
import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';
import {provide} from 'angular2/core';
import {ROUTER_PROVIDERS,
	LocationStrategy, HashLocationStrategy} from 'angular2/router';

import {ProductoCmp} from './components/producto-cmp';
import {ProductoListCmp} from './components/productolist-cmp';
import {ProductoDetailsCmp} from './components/productodetails-cmp';
import {ProductoSubDetailsCmp} from './components/productosubdetails-cmp';
bootstrap(ProductoCmp, [HTTP_PROVIDERS]);
bootstrap(ProductoDetailsCmp, [HTTP_PROVIDERS]);
bootstrap(ProductoSubDetailsCmp, [HTTP_PROVIDERS]);
bootstrap(ProductoListCmp, [HTTP_PROVIDERS]);

