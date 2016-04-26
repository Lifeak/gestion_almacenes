"use strict";
var browser_1 = require('angular2/platform/browser');
var http_1 = require('angular2/http');
var cliente_cmp_1 = require('./components/cliente-cmp');
var clientelist_cmp_1 = require('./components/clientelist-cmp');
browser_1.bootstrap(cliente_cmp_1.ClienteCmp, [http_1.HTTP_PROVIDERS]);
browser_1.bootstrap(clientelist_cmp_1.ClienteListCmp, [http_1.HTTP_PROVIDERS]);
