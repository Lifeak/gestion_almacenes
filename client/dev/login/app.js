"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var core_1 = require('angular2/core');
var router_1 = require('angular2/router');
var common_1 = require('angular2/platform/common');
// Servicios
var login_service_1 = require('./services/login-service');
var user_service_1 = require('./services/user/user-service');
var almacen_service_1 = require('./services/almacen/almacen-service');
var pieza_service_1 = require('./services/pieza/pieza-service');
var producto_service_1 = require('./services/producto/producto-service');
var modelo_service_1 = require('./services/modelo/modelo-service');
var proveedor_service_1 = require('./services/proveedor/proveedor-service');
var cliente_service_1 = require('./services/cliente/cliente-service');
var garantia_service_1 = require('./services/garantia/garantia-service');
var pedidocompra_service_1 = require('./services/pedidocompra/pedidocompra-service');
var ventas_service_1 = require('./services/ventas/ventas-service');
var devolucion_service_1 = require('./services/devolucion/devolucion-service');
// Menu principal
var login_cmp_1 = require('./components/login-cmp');
var compras_cmp_1 = require('./components/compras-cmp');
var ventas_cmp_1 = require('./components/ventas-cmp');
var almacen_cmp_1 = require('./components/almacen-cmp');
var admin_cmp_1 = require('./components/admin-cmp');
//Usuarios
var usercreate_cmp_1 = require('./components/user/usercreate-cmp');
var userlist_cmp_1 = require('./components/user/userlist-cmp');
var userdetails_cmp_1 = require('./components/user/userdetails-cmp');
var userprofile_cmp_1 = require('./components/user/userprofile-cmp');
//Almacen
var almacencreate_cmp_1 = require('./components/almacen/almacencreate-cmp');
var almacenlist_cmp_1 = require('./components/almacen/almacenlist-cmp');
var almacendetails_cmp_1 = require('./components/almacen/almacendetails-cmp');
//Pieza
var piezacreate_cmp_1 = require('./components/pieza/piezacreate-cmp');
var piezalist_cmp_1 = require('./components/pieza/piezalist-cmp');
var piezadetails_cmp_1 = require('./components/pieza/piezadetails-cmp');
var piezasubdetails_cmp_1 = require('./components/pieza/piezasubdetails-cmp');
//Producto
var productocreate_cmp_1 = require('./components/producto/productocreate-cmp');
var productolist_cmp_1 = require('./components/producto/productolist-cmp');
var productodetails_cmp_1 = require('./components/producto/productodetails-cmp');
var productosubdetails_cmp_1 = require('./components/producto/productosubdetails-cmp');
//Modelo
var modelocreate_cmp_1 = require('./components/modelo/modelocreate-cmp');
var modelolist_cmp_1 = require('./components/modelo/modelolist-cmp');
var modelodetails_cmp_1 = require('./components/modelo/modelodetails-cmp');
var modelosubdetails_cmp_1 = require('./components/modelo/modelosubdetails-cmp');
//Proveedor
var proveedorcreate_cmp_1 = require('./components/proveedor/proveedorcreate-cmp');
var proveedorlist_cmp_1 = require('./components/proveedor/proveedorlist-cmp');
var proveedordetails_cmp_1 = require('./components/proveedor/proveedordetails-cmp');
//Cliente
var clientecreate_cmp_1 = require('./components/cliente/clientecreate-cmp');
var clientelist_cmp_1 = require('./components/cliente/clientelist-cmp');
var clientedetails_cmp_1 = require('./components/cliente/clientedetails-cmp');
//Garantia
var garantiacreate_cmp_1 = require('./components/garantia/garantiacreate-cmp');
var garantialist_cmp_1 = require('./components/garantia/garantialist-cmp');
var garantiadetails_cmp_1 = require('./components/garantia/garantiadetails-cmp');
//Pedidos de compra
var pedidocompracreate_cmp_1 = require('./components/pedidocompra/pedidocompracreate-cmp');
var pedidocompralist_cmp_1 = require('./components/pedidocompra/pedidocompralist-cmp');
var pedidocompradetails_cmp_1 = require('./components/pedidocompra/pedidocompradetails-cmp');
//Ventas
var ventascreate_cmp_1 = require('./components/ventas/ventascreate-cmp');
var ventaslist_cmp_1 = require('./components/ventas/ventaslist-cmp');
var ventasdetails_cmp_1 = require('./components/ventas/ventasdetails-cmp');
//Ventas
var devolucioncreate_cmp_1 = require('./components/devolucion/devolucioncreate-cmp');
var devolucionlist_cmp_1 = require('./components/devolucion/devolucionlist-cmp');
var devoluciondetails_cmp_1 = require('./components/devolucion/devoluciondetails-cmp');
var App = (function () {
    function App() {
    }
    App = __decorate([
        core_1.Component({
            selector: 'app',
            directives: [router_1.ROUTER_DIRECTIVES, router_1.RouterOutlet],
            template: "<router-outlet></router-outlet>\n\t\t\t\t",
            providers: [router_1.ROUTER_PROVIDERS, core_1.provide(common_1.LocationStrategy, { useClass: common_1.PathLocationStrategy }),
                login_service_1.LoginService,
                user_service_1.UserService,
                pieza_service_1.PiezaService,
                producto_service_1.ProductoService,
                modelo_service_1.ModeloService,
                proveedor_service_1.ProveedorService,
                cliente_service_1.ClienteService,
                garantia_service_1.GarantiaService,
                almacen_service_1.AlmacenService,
                pedidocompra_service_1.ComprasService,
                ventas_service_1.VentasService,
                devolucion_service_1.DevolucionService]
        }),
        router_1.RouteConfig([
            //Menu principal
            { path: '/', name: 'Login', component: login_cmp_1.LoginCmp },
            { path: '/compras', name: 'Compras', component: compras_cmp_1.ComprasCmp },
            { path: '/ventas', name: 'Ventas', component: ventas_cmp_1.VentasCmp },
            { path: '/almacen', name: 'Almacen', component: almacen_cmp_1.AlmacenCmp },
            { path: '/admin', name: 'Admin', component: admin_cmp_1.AdminCmp },
            //usuarios
            { path: '/ListUsuarios', name: 'ListUsuarios', component: userlist_cmp_1.UserListCmp },
            { path: '/CreateUsuario', name: 'CreateUsuario', component: usercreate_cmp_1.UserCreateCmp },
            { path: '/DetailsUsuario', name: 'DetailsUsuario', component: userdetails_cmp_1.UserDetailsCmp },
            { path: '/Profile', name: 'Perfil', component: userprofile_cmp_1.UserProfileCmp },
            //piezas
            { path: '/ListPiezas', name: 'ListPiezas', component: piezalist_cmp_1.PiezaListCmp },
            { path: '/CreatePieza', name: 'CreatePieza', component: piezacreate_cmp_1.PiezaCreateCmp },
            { path: '/DetailsPieza', name: 'DetailsPieza', component: piezadetails_cmp_1.PiezaDetailsCmp },
            { path: '/DetailsSubPieza', name: 'DetailsSubPieza', component: piezasubdetails_cmp_1.PiezaSubDetailsCmp },
            //productos
            { path: '/ListProductos', name: 'ListProductos', component: productolist_cmp_1.ProductoListCmp },
            { path: '/CreateProducto', name: 'CreateProducto', component: productocreate_cmp_1.ProductoCreateCmp },
            { path: '/DetailsProducto', name: 'DetailsProducto', component: productodetails_cmp_1.ProductoDetailsCmp },
            { path: '/DetailsSubProducto', name: 'DetailsSubProducto', component: productosubdetails_cmp_1.ProductoSubDetailsCmp },
            //modelos
            { path: '/ListModelos', name: 'ListModelos', component: modelolist_cmp_1.ModeloListCmp },
            { path: '/CreateModelo', name: 'CreateModelo', component: modelocreate_cmp_1.ModeloCreateCmp },
            { path: '/DetailsModelo', name: 'DetailsModelo', component: modelodetails_cmp_1.ModeloDetailsCmp },
            { path: '/DetailsSubModelo', name: 'DetailsSubModelo', component: modelosubdetails_cmp_1.ModeloSubDetailsCmp },
            //proveedor
            { path: '/ListProveedores', name: 'ListProveedores', component: proveedorlist_cmp_1.ProveedorListCmp },
            { path: '/CreateProveedor', name: 'CreateProveedor', component: proveedorcreate_cmp_1.ProveedorCreateCmp },
            { path: '/DetailsProveedor', name: 'DetailsProveedor', component: proveedordetails_cmp_1.ProveedorDetailsCmp },
            //cliente
            { path: '/ListClientes', name: 'ListClientes', component: clientelist_cmp_1.ClienteListCmp },
            { path: '/CreateCliente', name: 'CreateCliente', component: clientecreate_cmp_1.ClienteCreateCmp },
            { path: '/DetailsCliente', name: 'DetailsCliente', component: clientedetails_cmp_1.ClienteDetailsCmp },
            //garantia
            { path: '/ListGarantias', name: 'ListGarantias', component: garantialist_cmp_1.GarantiaListCmp },
            { path: '/CreateGarantia', name: 'CreateGarantia', component: garantiacreate_cmp_1.GarantiaCreateCmp },
            { path: '/DetailsGarantia', name: 'DetailsGarantia', component: garantiadetails_cmp_1.GarantiaDetailsCmp },
            // almacen
            { path: '/ListAlmacenes', name: 'ListAlmacenes', component: almacenlist_cmp_1.AlmacenListCmp },
            { path: '/CreateAlmacen', name: 'CreateAlmacen', component: almacencreate_cmp_1.AlmacenCreateCmp },
            { path: '/DetailsAlmacen', name: 'DetailsAlmacen', component: almacendetails_cmp_1.AlmacenDetailsCmp },
            // pedidos de compra
            { path: '/ListCompras', name: 'ListCompras', component: pedidocompralist_cmp_1.ComprasListCmp },
            { path: '/CreateCompra', name: 'CreateCompra', component: pedidocompracreate_cmp_1.CompraCreateCmp },
            { path: '/DetailsCompra', name: 'DetailsCompra', component: pedidocompradetails_cmp_1.CompraDetailsCmp },
            // ventas
            { path: '/ListVentas', name: 'ListVentas', component: ventaslist_cmp_1.VentasListCmp },
            { path: '/CreateVenta', name: 'CreateVenta', component: ventascreate_cmp_1.VentaCreateCmp },
            { path: '/DetailsVenta', name: 'DetailsVenta', component: ventasdetails_cmp_1.VentaDetailsCmp },
            // devolucion
            { path: '/ListDevoluciones', name: 'ListDevoluciones', component: devolucionlist_cmp_1.DevolucionListCmp },
            { path: '/CreateDevolucion', name: 'CreateDevolucion', component: devolucioncreate_cmp_1.DevolucionCreateCmp },
            { path: '/DetailsDevolucion', name: 'DetailsDevolucion', component: devoluciondetails_cmp_1.DevolucionDetailsCmp }
        ]), 
        __metadata('design:paramtypes', [])
    ], App);
    return App;
}());
exports.App = App;
