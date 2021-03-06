"use strict";

const StaticDispatcher = require('../commons/static/index');
// Rutas del cliente, get y post
const ClienteRoutes = require('../api/cliente/routes/cliente-routes');

// Rutas del usuario, get y post
const userRoutes = require('../api/user/routes/user-routes');

// Rutas del almacen, get y post
const almacenRoutes = require('../api/almacen/routes/almacen-routes');

// Rutas del cliente, get y post
const clienteRoutes = require('../api/cliente/routes/cliente-routes');

// Rutas de los modelos de producto y pieza, get y post
const modeloRoutes = require('../api/modelo/routes/modelo-routes');

// Rutas de las garantias de producto y pieza, get y post
const garantiaRoutes = require('../api/garantia/routes/garantia-routes');

// Rutas de las piezas, get y post
const piezaRoutes = require('../api/pieza/routes/pieza-routes');

// Rutas de los productos, get y post
const productoRoutes = require('../api/producto/routes/producto-routes');

// Rutas de los proveedores, get y post
const proveedorRoutes = require('../api/proveedor/routes/proveedor-routes');

// Rutas de los pedidos de compra, get y post
const pedidocompraRoutes = require('../api/pedidocompra/routes/pedidocompra-routes');

// Rutas de los pedidos de venta, get y post
const ventasRoutes = require('../api/ventas/routes/ventas-routes');

// Rutas de las devoluciones, get y post
const devolucionRoutes = require('../api/devolucion/routes/devolucion-routes');

// Rutas de las reparaciones, get y post
const reparacionRoutes = require('../api/reparaciones/routes/reparaciones-routes');

// Rutas de control de calidad, get y post
const controlRoutes = require('../api/controlcalidad/routes/controlcalidad-routes');

// Rutas de las garantias de piezas, get y post
const garantiapRoutes = require('../api/garantiapieza/routes/garantiapieza-routes');

// Rutas de las segundas salidas, get y post
const segsalidaRoutes = require('../api/segundasalida/routes/segundasalida-routes');

// Rutas del transporte, get y post
const transporteRoutes = require('../api/transporte/routes/transporte-routes');

const loginRoutes= require('../auth/login/routes/login-routes');


module.exports = class Routes {
   static init(app, router) {
     ClienteRoutes.init(router);
     userRoutes.init(router);
     almacenRoutes.init(router);
     clienteRoutes.init(router);
     modeloRoutes.init(router);
     loginRoutes.init(router);
     garantiaRoutes.init(router);
     piezaRoutes.init(router);
     productoRoutes.init(router);
     proveedorRoutes.init(router);
     pedidocompraRoutes.init(router);
     ventasRoutes.init(router);
     devolucionRoutes.init(router);
     reparacionRoutes.init(router);
     controlRoutes.init(router);
     garantiapRoutes.init(router);
     segsalidaRoutes.init(router);
     transporteRoutes.init(router);

 	router
       .route('/')
       .get(StaticDispatcher.sendIndex);
	
     app.use('/', router);
   }
}
