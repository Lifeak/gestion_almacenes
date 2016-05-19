/// <reference path="../../node_modules/angular2/typings/browser.d.ts" />

import {
	bootstrap
} from 'angular2/platform/browser';
import {
	HTTP_PROVIDERS
} from 'angular2/http';

import {isLogged} from './login/services/isloggedin';

import {ProveedorListCmp} from './login/components/proveedor/proveedorlist-cmp';
import {ProveedorCreateCmp} from './login/components/proveedor/proveedorcreate-cmp';
import {ProveedorDetailsCmp} from './login/components/proveedor/proveedordetails-cmp';



import {ProductoCreateCmp} from './login/components/producto/productocreate-cmp';
import {ProductoDetailsCmp} from './login/components/producto/productodetails-cmp';
import {ProductoListCmp} from './login/components/producto/productolist-cmp';
import {ProductoSubDetailsCmp} from './login/components/producto/productosubdetails-cmp';

import {PiezaCreateCmp} from './login/components/pieza/piezacreate-cmp';
import {PiezaListCmp} from './login/components/pieza/piezalist-cmp';
import {PiezaDetailsCmp} from './login/components/pieza/piezadetails-cmp';
import {PiezaSubDetailsCmp} from './login/components/pieza/piezasubdetails-cmp';

import {GarantiaCreateCmp} from './login/components/garantia/garantiacreate-cmp';
import {GarantiaDetailsCmp} from './login/components/garantia/garantiadetails-cmp';
import {GarantiaListCmp} from './login/components/garantia/garantialist-cmp';


import {ModeloCreateCmp} from './login/components/modelo/modelocreate-cmp';
import {ModeloDetailsCmp} from './login/components/modelo/modelodetails-cmp';
import {ModeloListCmp} from './login/components/modelo/modelolist-cmp';
import {ModeloSubDetailsCmp} from './login/components/modelo/modelosubdetails-cmp';


import {ClienteCreateCmp} from './login/components/cliente/clientecreate-cmp';
import {ClienteDetailsCmp} from './login/components/cliente/clientedetails-cmp';
import {ClienteListCmp} from './login/components/cliente/clientelist-cmp';

import {UserCreateCmp} from './login/components/user/usercreate-cmp';
import {UserDetailsCmp} from './login/components/user/userdetails-cmp';
import {UserListCmp} from './login/components/user/userlist-cmp';
import {UserProfileCmp} from './login/components/user/userprofile-cmp';

import {AlmacenCreateCmp} from './login/components/almacen/almacencreate-cmp';
import {AlmacenDetailsCmp} from './login/components/almacen/almacendetails-cmp';
import {AlmacenListCmp} from './login/components/almacen/almacenlist-cmp';

import {LoginCmp} from './login/components/login-cmp';
import {HomeCmp} from './login/components/home-cmp';
import {App} from './login/app';

bootstrap(ProveedorCreateCmp, [HTTP_PROVIDERS]);
bootstrap(ProveedorListCmp, [HTTP_PROVIDERS]);
bootstrap(ProveedorDetailsCmp, [HTTP_PROVIDERS]);
bootstrap(ProductoCreateCmp, [HTTP_PROVIDERS]);
bootstrap(ProductoListCmp, [HTTP_PROVIDERS]);
bootstrap(ProductoDetailsCmp, [HTTP_PROVIDERS]);
bootstrap(ProductoSubDetailsCmp, [HTTP_PROVIDERS]);
bootstrap(PiezaCreateCmp, [HTTP_PROVIDERS]);
bootstrap(PiezaListCmp, [HTTP_PROVIDERS]);
bootstrap(PiezaDetailsCmp, [HTTP_PROVIDERS]);
bootstrap(PiezaSubDetailsCmp, [HTTP_PROVIDERS]);
bootstrap(GarantiaCreateCmp, [HTTP_PROVIDERS]);
bootstrap(GarantiaListCmp, [HTTP_PROVIDERS]);
bootstrap(GarantiaDetailsCmp, [HTTP_PROVIDERS]);
bootstrap(ModeloCreateCmp, [HTTP_PROVIDERS]);
bootstrap(ModeloListCmp, [HTTP_PROVIDERS]);
bootstrap(ModeloDetailsCmp, [HTTP_PROVIDERS]);
bootstrap(ModeloSubDetailsCmp, [HTTP_PROVIDERS]);
bootstrap(ClienteCreateCmp, [HTTP_PROVIDERS]);
bootstrap(ClienteDetailsCmp, [HTTP_PROVIDERS]);
bootstrap(ClienteListCmp, [HTTP_PROVIDERS]);
bootstrap(UserCreateCmp, [HTTP_PROVIDERS]);
bootstrap(UserDetailsCmp, [HTTP_PROVIDERS]);
bootstrap(UserListCmp, [HTTP_PROVIDERS]);
bootstrap(UserProfileCmp, [HTTP_PROVIDERS]);
bootstrap(AlmacenCreateCmp, [HTTP_PROVIDERS]);
bootstrap(AlmacenDetailsCmp, [HTTP_PROVIDERS]);
bootstrap(AlmacenListCmp, [HTTP_PROVIDERS]);
bootstrap(LoginCmp, [HTTP_PROVIDERS]);
bootstrap(HomeCmp, [HTTP_PROVIDERS]);
bootstrap(App, [HTTP_PROVIDERS]);