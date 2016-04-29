"use strict";
var browser_1 = require('angular2/platform/browser');
var http_1 = require('angular2/http');
var garantia_cmp_1 = require('./components/garantia-cmp');
var garantialist_cmp_1 = require('./components/garantialist-cmp');
browser_1.bootstrap(garantia_cmp_1.GarantiaCmp, [http_1.HTTP_PROVIDERS]);
browser_1.bootstrap(garantialist_cmp_1.GarantiaListCmp, [http_1.HTTP_PROVIDERS]);
