"use strict";
var browser_1 = require('angular2/platform/browser');
var http_1 = require('angular2/http');
var modelo_cmp_1 = require('./components/modelo-cmp');
var modelolist_cmp_1 = require('./components/modelolist-cmp');
browser_1.bootstrap(modelo_cmp_1.ModeloCmp, [http_1.HTTP_PROVIDERS]);
browser_1.bootstrap(modelolist_cmp_1.ModeloListCmp, [http_1.HTTP_PROVIDERS]);
