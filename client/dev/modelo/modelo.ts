
import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';
import {provide} from 'angular2/core';
import {ROUTER_PROVIDERS,
	LocationStrategy, HashLocationStrategy} from 'angular2/router';

import {ModeloCmp} from './components/modelo-cmp';
import {ModeloListCmp} from './components/modelolist-cmp';
bootstrap(ModeloCmp, [HTTP_PROVIDERS]);
bootstrap(ModeloListCmp, [HTTP_PROVIDERS]);

