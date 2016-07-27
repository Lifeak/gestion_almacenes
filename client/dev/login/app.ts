import {
	bootstrap
} from 'angular2/platform/browser';
import {
	Component,
	provide
} from 'angular2/core';
import {
	ROUTER_PROVIDERS,
	ROUTER_DIRECTIVES,

	RouteConfig,
	Router,
	RouteParams,
	RouterOutlet
} from 'angular2/router';
import{
	LocationStrategy,
	PathLocationStrategy
}from 'angular2/platform/common';

// Servicios
import {LoginService} from './services/login-service';
import {UserService} from './services/user/user-service';
import {AlmacenService} from './services/almacen/almacen-service';
import {PiezaService} from './services/pieza/pieza-service';
import {ProductoService} from './services/producto/producto-service';
import {ModeloService} from './services/modelo/modelo-service';
import {ProveedorService} from './services/proveedor/proveedor-service';
import {ClienteService} from './services/cliente/cliente-service';
import {GarantiaService} from './services/garantia/garantia-service';
import {ComprasService} from './services/pedidocompra/pedidocompra-service';
import {VentasService} from './services/ventas/ventas-service';
import {DevolucionService} from './services/devolucion/devolucion-service';
import {ReparacionService} from './services/reparaciones/reparaciones-service';
import {ControlService} from './services/controlcalidad/controlcalidad-service';
import {GarantiapService} from './services/garantiapieza/garantiapieza-service';
import {SegundaSalidaService} from './services/segundasalida/segundasalida-service';
import {TransporteService} from './services/transporte/transporte-service';
// Menu principal
import {LoginCmp} from './components/login-cmp';
import {ComprasCmp} from './components/compras-cmp';
import {VentasCmp} from './components/ventas-cmp';
import {AlmacenCmp} from './components/almacen-cmp';
import {AdminCmp} from './components/admin-cmp';
//Usuarios
import {UserCreateCmp} from './components/user/usercreate-cmp';
import {UserListCmp} from './components/user/userlist-cmp';
import {UserDetailsCmp} from './components/user/userdetails-cmp';
import {UserProfileCmp} from './components/user/userprofile-cmp';
//Almacen
import {AlmacenCreateCmp} from './components/almacen/almacencreate-cmp';
import {AlmacenListCmp} from './components/almacen/almacenlist-cmp';
import {AlmacenDetailsCmp} from './components/almacen/almacendetails-cmp';
//Pieza
import {PiezaCreateCmp} from './components/pieza/piezacreate-cmp';
import {PiezaListCmp} from './components/pieza/piezalist-cmp';
import {PiezaDetailsCmp} from './components/pieza/piezadetails-cmp';
import {PiezaSubDetailsCmp} from './components/pieza/piezasubdetails-cmp';
//Producto
import {ProductoCreateCmp} from './components/producto/productocreate-cmp';
import {ProductoListCmp} from './components/producto/productolist-cmp';
import {ProductoDetailsCmp} from './components/producto/productodetails-cmp';
import {ProductoSubDetailsCmp} from './components/producto/productosubdetails-cmp';
//Modelo
import {ModeloCreateCmp} from './components/modelo/modelocreate-cmp';
import {ModeloListCmp} from './components/modelo/modelolist-cmp';
import {ModeloDetailsCmp} from './components/modelo/modelodetails-cmp';
import {ModeloSubDetailsCmp} from './components/modelo/modelosubdetails-cmp';
//Proveedor
import {ProveedorCreateCmp} from './components/proveedor/proveedorcreate-cmp';
import {ProveedorListCmp} from './components/proveedor/proveedorlist-cmp';
import {ProveedorDetailsCmp} from './components/proveedor/proveedordetails-cmp';
//Cliente
import {ClienteCreateCmp} from './components/cliente/clientecreate-cmp';
import {ClienteListCmp} from './components/cliente/clientelist-cmp';
import {ClienteDetailsCmp} from './components/cliente/clientedetails-cmp';
//Garantia
import {GarantiaCreateCmp} from './components/garantia/garantiacreate-cmp';
import {GarantiaListCmp} from './components/garantia/garantialist-cmp';
import {GarantiaDetailsCmp} from './components/garantia/garantiadetails-cmp';
//Pedidos de compra
import {CompraCreateCmp} from './components/pedidocompra/pedidocompracreate-cmp';
import {ComprasListCmp} from './components/pedidocompra/pedidocompralist-cmp';
import {CompraDetailsCmp} from './components/pedidocompra/pedidocompradetails-cmp';
//Ventas
import {VentaCreateCmp} from './components/ventas/ventascreate-cmp';
import {VentasListCmp} from './components/ventas/ventaslist-cmp';
import {VentaDetailsCmp} from './components/ventas/ventasdetails-cmp';
//Devoluciones
import {DevolucionCreateCmp} from './components/devolucion/devolucioncreate-cmp';
import {DevolucionListCmp} from './components/devolucion/devolucionlist-cmp';
import {DevolucionDetailsCmp} from './components/devolucion/devoluciondetails-cmp';
//Reparaciones
import {ReparacionCreateCmp} from './components/reparaciones/reparacionescreate-cmp';
import {ReparacionListCmp} from './components/reparaciones/reparacioneslist-cmp';
import {ReparacionDetailsCmp} from './components/reparaciones/reparacionesdetails-cmp';
//Control de calidad
import {ControlCreateCmp} from './components/controlcalidad/controlcalidadcreate-cmp';
import {ControlListCmp} from './components/controlcalidad/controlcalidadlist-cmp';
import {ControlDetailsCmp} from './components/controlcalidad/controlcalidaddetails-cmp';
//Garantía de piezas
import {GarantiapCreateCmp} from './components/garantiapieza/garantiapiezacreate-cmp';
import {GarantiapListCmp} from './components/garantiapieza/garantiapiezalist-cmp';
import {GarantiapDetailsCmp} from './components/garantiapieza/garantiapiezadetails-cmp';
//Segundas salidas
import {SegundaSalidaCreateCmp} from './components/segundasalida/segundasalidacreate-cmp';
import {SegundaSalidaListCmp} from './components/segundasalida/segundasalidalist-cmp';
import {SegundaSalidaDetailsCmp} from './components/segundasalida/segundasalidadetails-cmp';
//Transporte
import {TransporteCreateCmp} from './components/transporte/transportecreate-cmp';
import {TransporteListCmp} from './components/transporte/transportelist-cmp';
import {TransporteDetailsCmp} from './components/transporte/transportedetails-cmp';


@Component({
	selector:'app',
	directives: [ROUTER_DIRECTIVES, RouterOutlet],
	template:`<router-outlet></router-outlet>
				` ,
	providers: [ROUTER_PROVIDERS, provide(LocationStrategy, { useClass: PathLocationStrategy }), 
			LoginService,
			UserService, 
			PiezaService,
			ProductoService,
			ModeloService,
			ProveedorService, 
			ClienteService, 
			GarantiaService, 
			AlmacenService,
			ComprasService,
			VentasService,
			DevolucionService,
			ReparacionService,
			ControlService,
			GarantiapService,
			SegundaSalidaService,
			TransporteService]
})

@RouteConfig([
	//Menu principal
    { path: '/', name: 'Login', component: LoginCmp},
    { path: '/compras', name: 'Compras', component: ComprasCmp },
    { path: '/ventas', name: 'Ventas', component: VentasCmp },
    { path: '/almacen', name: 'Almacen', component: AlmacenCmp },
    { path: '/admin', name: 'Admin', component: AdminCmp },
    //usuarios
 	{ path: '/ListUsuarios', name: 'ListUsuarios', component: UserListCmp },
	{ path: '/CreateUsuario', name: 'CreateUsuario', component: UserCreateCmp },
	{ path: '/DetailsUsuario', name: 'DetailsUsuario', component: UserDetailsCmp },
	{ path: '/Profile', name: 'Perfil', component: UserProfileCmp },
	//piezas
	{ path: '/ListPiezas', name: 'ListPiezas', component: PiezaListCmp },
	{ path: '/CreatePieza', name: 'CreatePieza', component: PiezaCreateCmp },
	{ path: '/DetailsPieza', name: 'DetailsPieza', component: PiezaDetailsCmp },
	{ path: '/DetailsSubPieza', name: 'DetailsSubPieza', component: PiezaSubDetailsCmp },
	//productos
	{ path: '/ListProductos', name: 'ListProductos', component: ProductoListCmp },
	{ path: '/CreateProducto', name: 'CreateProducto', component: ProductoCreateCmp },
	{ path: '/DetailsProducto', name: 'DetailsProducto', component: ProductoDetailsCmp },
	{ path: '/DetailsSubProducto', name: 'DetailsSubProducto', component: ProductoSubDetailsCmp },
	//modelos
	{ path: '/ListModelos', name: 'ListModelos', component: ModeloListCmp },
	{ path: '/CreateModelo', name: 'CreateModelo', component: ModeloCreateCmp },
	{ path: '/DetailsModelo', name: 'DetailsModelo', component: ModeloDetailsCmp },
	{ path: '/DetailsSubModelo', name: 'DetailsSubModelo', component: ModeloSubDetailsCmp },
	//proveedor
	{ path: '/ListProveedores', name: 'ListProveedores', component: ProveedorListCmp },
	{ path: '/CreateProveedor', name: 'CreateProveedor', component: ProveedorCreateCmp },
	{ path: '/DetailsProveedor', name: 'DetailsProveedor', component: ProveedorDetailsCmp },
	//cliente
	{ path: '/ListClientes', name: 'ListClientes', component: ClienteListCmp },
	{ path: '/CreateCliente', name: 'CreateCliente', component: ClienteCreateCmp },
	{ path: '/DetailsCliente', name: 'DetailsCliente', component: ClienteDetailsCmp },
	//garantia
	{ path: '/ListGarantias', name: 'ListGarantias', component: GarantiaListCmp },
	{ path: '/CreateGarantia', name: 'CreateGarantia', component: GarantiaCreateCmp },
	{ path: '/DetailsGarantia', name: 'DetailsGarantia', component: GarantiaDetailsCmp },
	// almacen
	{ path: '/ListAlmacenes', name: 'ListAlmacenes', component: AlmacenListCmp },
	{ path: '/CreateAlmacen', name: 'CreateAlmacen', component: AlmacenCreateCmp },
	{ path: '/DetailsAlmacen', name: 'DetailsAlmacen', component: AlmacenDetailsCmp },
	// pedidos de compra
	{ path: '/ListCompras', name: 'ListCompras', component: ComprasListCmp},
	{ path: '/CreateCompra', name: 'CreateCompra', component: CompraCreateCmp},
	{ path: '/DetailsCompra', name: 'DetailsCompra', component: CompraDetailsCmp},
	// ventas
	{ path: '/ListVentas', name: 'ListVentas', component: VentasListCmp},
	{ path: '/CreateVenta', name: 'CreateVenta', component: VentaCreateCmp},
	{ path: '/DetailsVenta', name: 'DetailsVenta', component: VentaDetailsCmp},
	// devolucion
	{ path: '/ListDevoluciones', name: 'ListDevoluciones', component: DevolucionListCmp},
	{ path: '/CreateDevolucion', name: 'CreateDevolucion', component: DevolucionCreateCmp},
	{ path: '/DetailsDevolucion', name: 'DetailsDevolucion', component: DevolucionDetailsCmp},
	// reparaciones
	{ path: '/ListReparaciones', name: 'ListReparaciones', component: ReparacionListCmp},
	{ path: '/CreateReparacion', name: 'CreateReparacion', component: ReparacionCreateCmp},
	{ path: '/DetailsReparacion', name: 'DetailsReparacion', component: ReparacionDetailsCmp},
	// control de calidad
	{ path: '/ListControlCalidad', name: 'ListControlCalidad', component: ControlListCmp},
	{ path: '/CreateControlCalidad', name: 'CreateControlCalidad', component: ControlCreateCmp},
	{ path: '/DetailsControlCalidad', name: 'DetailsControlCalidad', component: ControlDetailsCmp},
	// garantia de piezas
	{ path: '/ListGarantiaP', name: 'ListGarantiaP', component: GarantiapListCmp},
	{ path: '/CreateGarantiaP', name: 'CreateGarantiaP', component: GarantiapCreateCmp},
	{ path: '/DetailsGarantiaP', name: 'DetailsGarantiaP', component: GarantiapDetailsCmp},
	// segundas salidas
	{ path: '/ListSegSalidas', name: 'ListSegSalidas', component: SegundaSalidaListCmp},
	{ path: '/CreateSegSalida', name: 'CreateSegSalida', component: SegundaSalidaCreateCmp},
	{ path: '/DetailsSegSalida', name: 'DetailsSegSalida', component: SegundaSalidaDetailsCmp},
	// transporte
	{ path: '/ListTransportes', name: 'ListTransportes', component: TransporteListCmp},
	{ path: '/CreateTransporte', name: 'CreateTransporte', component: TransporteCreateCmp},
	{ path: '/DetailsTransporte', name: 'DetailsTransporte', component: TransporteDetailsCmp}

])
export class App {
	constructor() { }
}


