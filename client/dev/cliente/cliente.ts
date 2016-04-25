
import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';
import {provide} from 'angular2/core';
import {ROUTER_PROVIDERS,
	LocationStrategy, HashLocationStrategy} from 'angular2/router';

import {ClienteCmp} from './components/cliente-cmp';
import {ClienteListCmp} from './components/clientelist-cmp';
bootstrap(ClienteCmp, [HTTP_PROVIDERS]);
bootstrap(ClienteListCmp, [HTTP_PROVIDERS]);

