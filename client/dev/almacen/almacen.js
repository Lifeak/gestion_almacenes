"use strict";
var browser_1 = require('angular2/platform/browser');
var http_1 = require('angular2/http');
var almacen_cmp_1 = require('./components/almacen-cmp');
var almacenlist_cmp_1 = require('./components/almacenlist-cmp');
browser_1.bootstrap(almacen_cmp_1.AlmacenCmp, [http_1.HTTP_PROVIDERS]);
browser_1.bootstrap(almacenlist_cmp_1.AlmacenListCmp, [http_1.HTTP_PROVIDERS]);
