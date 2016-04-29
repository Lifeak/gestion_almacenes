
import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';
import {provide} from 'angular2/core';
import {ROUTER_PROVIDERS,
	LocationStrategy, HashLocationStrategy} from 'angular2/router';

import {PiezaCmp} from './components/pieza-cmp';
import {PiezaListCmp} from './components/piezalist-cmp';
import {PiezaDetailsCmp} from './components/piezadetails-cmp';
import {PiezaSubDetailsCmp} from './components/piezasubdetails-cmp';
bootstrap(PiezaCmp, [HTTP_PROVIDERS]);
bootstrap(PiezaDetailsCmp, [HTTP_PROVIDERS]);
bootstrap(PiezaSubDetailsCmp, [HTTP_PROVIDERS]);
bootstrap(PiezaListCmp, [HTTP_PROVIDERS]);

