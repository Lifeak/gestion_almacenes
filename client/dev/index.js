/// <reference path="../../node_modules/angular2/typings/browser.d.ts" />
"use strict";
var browser_1 = require('angular2/platform/browser');
var http_1 = require('angular2/http');
var proveedorlist_cmp_1 = require('./login/components/proveedor/proveedorlist-cmp');
var proveedorcreate_cmp_1 = require('./login/components/proveedor/proveedorcreate-cmp');
var proveedordetails_cmp_1 = require('./login/components/proveedor/proveedordetails-cmp');
var productocreate_cmp_1 = require('./login/components/producto/productocreate-cmp');
var productodetails_cmp_1 = require('./login/components/producto/productodetails-cmp');
var productolist_cmp_1 = require('./login/components/producto/productolist-cmp');
var productosubdetails_cmp_1 = require('./login/components/producto/productosubdetails-cmp');
var piezacreate_cmp_1 = require('./login/components/pieza/piezacreate-cmp');
var piezalist_cmp_1 = require('./login/components/pieza/piezalist-cmp');
var piezadetails_cmp_1 = require('./login/components/pieza/piezadetails-cmp');
var piezasubdetails_cmp_1 = require('./login/components/pieza/piezasubdetails-cmp');
var garantiacreate_cmp_1 = require('./login/components/garantia/garantiacreate-cmp');
var garantiadetails_cmp_1 = require('./login/components/garantia/garantiadetails-cmp');
var garantialist_cmp_1 = require('./login/components/garantia/garantialist-cmp');
var modelocreate_cmp_1 = require('./login/components/modelo/modelocreate-cmp');
var modelodetails_cmp_1 = require('./login/components/modelo/modelodetails-cmp');
var modelolist_cmp_1 = require('./login/components/modelo/modelolist-cmp');
var modelosubdetails_cmp_1 = require('./login/components/modelo/modelosubdetails-cmp');
var clientecreate_cmp_1 = require('./login/components/cliente/clientecreate-cmp');
var clientedetails_cmp_1 = require('./login/components/cliente/clientedetails-cmp');
var clientelist_cmp_1 = require('./login/components/cliente/clientelist-cmp');
var usercreate_cmp_1 = require('./login/components/user/usercreate-cmp');
var userdetails_cmp_1 = require('./login/components/user/userdetails-cmp');
var userlist_cmp_1 = require('./login/components/user/userlist-cmp');
var userprofile_cmp_1 = require('./login/components/user/userprofile-cmp');
var almacencreate_cmp_1 = require('./login/components/almacen/almacencreate-cmp');
var almacendetails_cmp_1 = require('./login/components/almacen/almacendetails-cmp');
var almacenlist_cmp_1 = require('./login/components/almacen/almacenlist-cmp');
var login_cmp_1 = require('./login/components/login-cmp');
var app_1 = require('./login/app');
browser_1.bootstrap(proveedorcreate_cmp_1.ProveedorCreateCmp, [http_1.HTTP_PROVIDERS]);
browser_1.bootstrap(proveedorlist_cmp_1.ProveedorListCmp, [http_1.HTTP_PROVIDERS]);
browser_1.bootstrap(proveedordetails_cmp_1.ProveedorDetailsCmp, [http_1.HTTP_PROVIDERS]);
browser_1.bootstrap(productocreate_cmp_1.ProductoCreateCmp, [http_1.HTTP_PROVIDERS]);
browser_1.bootstrap(productolist_cmp_1.ProductoListCmp, [http_1.HTTP_PROVIDERS]);
browser_1.bootstrap(productodetails_cmp_1.ProductoDetailsCmp, [http_1.HTTP_PROVIDERS]);
browser_1.bootstrap(productosubdetails_cmp_1.ProductoSubDetailsCmp, [http_1.HTTP_PROVIDERS]);
browser_1.bootstrap(piezacreate_cmp_1.PiezaCreateCmp, [http_1.HTTP_PROVIDERS]);
browser_1.bootstrap(piezalist_cmp_1.PiezaListCmp, [http_1.HTTP_PROVIDERS]);
browser_1.bootstrap(piezadetails_cmp_1.PiezaDetailsCmp, [http_1.HTTP_PROVIDERS]);
browser_1.bootstrap(piezasubdetails_cmp_1.PiezaSubDetailsCmp, [http_1.HTTP_PROVIDERS]);
browser_1.bootstrap(garantiacreate_cmp_1.GarantiaCreateCmp, [http_1.HTTP_PROVIDERS]);
browser_1.bootstrap(garantialist_cmp_1.GarantiaListCmp, [http_1.HTTP_PROVIDERS]);
browser_1.bootstrap(garantiadetails_cmp_1.GarantiaDetailsCmp, [http_1.HTTP_PROVIDERS]);
browser_1.bootstrap(modelocreate_cmp_1.ModeloCreateCmp, [http_1.HTTP_PROVIDERS]);
browser_1.bootstrap(modelolist_cmp_1.ModeloListCmp, [http_1.HTTP_PROVIDERS]);
browser_1.bootstrap(modelodetails_cmp_1.ModeloDetailsCmp, [http_1.HTTP_PROVIDERS]);
browser_1.bootstrap(modelosubdetails_cmp_1.ModeloSubDetailsCmp, [http_1.HTTP_PROVIDERS]);
browser_1.bootstrap(clientecreate_cmp_1.ClienteCreateCmp, [http_1.HTTP_PROVIDERS]);
browser_1.bootstrap(clientedetails_cmp_1.ClienteDetailsCmp, [http_1.HTTP_PROVIDERS]);
browser_1.bootstrap(clientelist_cmp_1.ClienteListCmp, [http_1.HTTP_PROVIDERS]);
browser_1.bootstrap(usercreate_cmp_1.UserCreateCmp, [http_1.HTTP_PROVIDERS]);
browser_1.bootstrap(userdetails_cmp_1.UserDetailsCmp, [http_1.HTTP_PROVIDERS]);
browser_1.bootstrap(userlist_cmp_1.UserListCmp, [http_1.HTTP_PROVIDERS]);
browser_1.bootstrap(userprofile_cmp_1.UserProfileCmp, [http_1.HTTP_PROVIDERS]);
browser_1.bootstrap(almacencreate_cmp_1.AlmacenCreateCmp, [http_1.HTTP_PROVIDERS]);
browser_1.bootstrap(almacendetails_cmp_1.AlmacenDetailsCmp, [http_1.HTTP_PROVIDERS]);
browser_1.bootstrap(almacenlist_cmp_1.AlmacenListCmp, [http_1.HTTP_PROVIDERS]);
browser_1.bootstrap(login_cmp_1.LoginCmp, [http_1.HTTP_PROVIDERS]);
browser_1.bootstrap(app_1.App, [http_1.HTTP_PROVIDERS]);
