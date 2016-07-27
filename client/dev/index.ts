/// <reference path="../../node_modules/angular2/typings/browser.d.ts" />

import {
	bootstrap
} from 'angular2/platform/browser';
import {
	HTTP_PROVIDERS
} from 'angular2/http';

import{
	ROUTER_PROVIDERS
} from 'angular2/router';

import {TransporteListCmp} from './login/components/transporte/transportelist-cmp';
import {TransporteCreateCmp} from './login/components/transporte/transportecreate-cmp';
import {TransporteDetailsCmp} from './login/components/transporte/transportedetails-cmp';

import {SegundaSalidaListCmp} from './login/components/segundasalida/segundasalidalist-cmp';
import {SegundaSalidaCreateCmp} from './login/components/segundasalida/segundasalidacreate-cmp';
import {SegundaSalidaDetailsCmp} from './login/components/segundasalida/segundasalidadetails-cmp';

import {GarantiapListCmp} from './login/components/garantiapieza/garantiapiezalist-cmp';
import {GarantiapCreateCmp} from './login/components/garantiapieza/garantiapiezacreate-cmp';
import {GarantiapDetailsCmp} from './login/components/garantiapieza/garantiapiezadetails-cmp';

import {ControlListCmp} from './login/components/controlcalidad/controlcalidadlist-cmp';
import {ControlCreateCmp} from './login/components/controlcalidad/controlcalidadcreate-cmp';
import {ControlDetailsCmp} from './login/components/controlcalidad/controlcalidaddetails-cmp';

import {ReparacionListCmp} from './login/components/reparaciones/reparacioneslist-cmp';
import {ReparacionCreateCmp} from './login/components/reparaciones/reparacionescreate-cmp';
import {ReparacionDetailsCmp} from './login/components/reparaciones/reparacionesdetails-cmp';

import {DevolucionListCmp} from './login/components/devolucion/devolucionlist-cmp';
import {DevolucionCreateCmp} from './login/components/devolucion/devolucioncreate-cmp';
import {DevolucionDetailsCmp} from './login/components/devolucion/devoluciondetails-cmp';

import {VentasListCmp} from './login/components/ventas/ventaslist-cmp';
import {VentaCreateCmp} from './login/components/ventas/ventascreate-cmp';
import {VentaDetailsCmp} from './login/components/ventas/ventasdetails-cmp';

import {ComprasListCmp} from './login/components/pedidocompra/pedidocompralist-cmp';
import {CompraCreateCmp} from './login/components/pedidocompra/pedidocompracreate-cmp';
import {CompraDetailsCmp} from './login/components/pedidocompra/pedidocompradetails-cmp';

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
import {App} from './login/app';


bootstrap(TransporteCreateCmp, [HTTP_PROVIDERS]);
bootstrap(TransporteListCmp, [HTTP_PROVIDERS]);
bootstrap(TransporteDetailsCmp, [HTTP_PROVIDERS]);
bootstrap(SegundaSalidaCreateCmp, [HTTP_PROVIDERS]);
bootstrap(SegundaSalidaListCmp, [HTTP_PROVIDERS]);
bootstrap(SegundaSalidaDetailsCmp, [HTTP_PROVIDERS]);
bootstrap(GarantiapCreateCmp, [HTTP_PROVIDERS]);
bootstrap(GarantiapListCmp, [HTTP_PROVIDERS]);
bootstrap(GarantiapDetailsCmp, [HTTP_PROVIDERS]);
bootstrap(ControlCreateCmp, [HTTP_PROVIDERS]);
bootstrap(ControlListCmp, [HTTP_PROVIDERS]);
bootstrap(ControlDetailsCmp, [HTTP_PROVIDERS]);
bootstrap(ReparacionCreateCmp, [HTTP_PROVIDERS]);
bootstrap(ReparacionListCmp, [HTTP_PROVIDERS]);
bootstrap(ReparacionDetailsCmp, [HTTP_PROVIDERS]);
bootstrap(DevolucionCreateCmp, [HTTP_PROVIDERS]);
bootstrap(DevolucionListCmp, [HTTP_PROVIDERS]);
bootstrap(DevolucionDetailsCmp, [HTTP_PROVIDERS]);
bootstrap(VentaCreateCmp, [HTTP_PROVIDERS]);
bootstrap(VentasListCmp, [HTTP_PROVIDERS]);
bootstrap(VentaDetailsCmp, [HTTP_PROVIDERS]);
bootstrap(CompraCreateCmp, [HTTP_PROVIDERS]);
bootstrap(ComprasListCmp, [HTTP_PROVIDERS]);
bootstrap(CompraDetailsCmp, [HTTP_PROVIDERS]);
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
bootstrap(App, [HTTP_PROVIDERS]);
