
import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';
import {provide} from 'angular2/core';
import {ROUTER_PROVIDERS,
	LocationStrategy, HashLocationStrategy} from 'angular2/router';

import {GarantiaCmp} from './components/garantia-cmp';
import {GarantiaListCmp} from './components/garantialist-cmp';
bootstrap(GarantiaCmp, [HTTP_PROVIDERS]);
bootstrap(GarantiaListCmp, [HTTP_PROVIDERS]);

