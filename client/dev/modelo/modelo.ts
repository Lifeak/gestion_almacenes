
import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';
import {provide} from 'angular2/core';
import {ROUTER_PROVIDERS,
	LocationStrategy, HashLocationStrategy} from 'angular2/router';

import {ModeloCmp} from './components/modelo-cmp';
import {ModeloListCmp} from './components/modelolist-cmp';
import {ModeloDetailsCmp} from './components/modelodetails-cmp';
import {ModeloSubDetailsCmp} from './components/modelosubdetails-cmp';
bootstrap(ModeloCmp, [HTTP_PROVIDERS]);
bootstrap(ModeloDetailsCmp, [HTTP_PROVIDERS]);
bootstrap(ModeloSubDetailsCmp, [HTTP_PROVIDERS]);
bootstrap(ModeloListCmp, [HTTP_PROVIDERS]);

