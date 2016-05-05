"use strict";
var browser_1 = require('angular2/platform/browser');
var http_1 = require('angular2/http');
var proveedor_cmp_1 = require('./components/proveedor-cmp');
var proveedorlist_cmp_1 = require('./components/proveedorlist-cmp');
browser_1.bootstrap(proveedor_cmp_1.ProveedorCmp, [http_1.HTTP_PROVIDERS]);
browser_1.bootstrap(proveedorlist_cmp_1.ProveedorListCmp, [http_1.HTTP_PROVIDERS]);
