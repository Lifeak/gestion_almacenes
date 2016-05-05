"use strict";

const StaticDispatcher = require('../commons/static/index');
const TodoRoutes = require('../api/todo/routes/todo-routes');

const ClienteRoutes = require('../api/cliente/routes/cliente-routes');

const probandoRoutes = require('../commons/static/probando');

// Rutas del usuario, get y post
const user= require('../commons/static/user');
const userRoutes = require('../api/user/routes/user-routes');

// Rutas del almacen, get y post
const almacen= require('../commons/static/almacen');
const almacenRoutes = require('../api/almacen/routes/almacen-routes');

// Rutas del cliente, get y post
const cliente= require('../commons/static/cliente');
const clienteRoutes = require('../api/cliente/routes/cliente-routes');

// Rutas de los modelos de producto y pieza, get y post
const modelo= require('../commons/static/modelo');
const modeloRoutes = require('../api/modelo/routes/modelo-routes');

// Rutas de las garantias de producto y pieza, get y post
const garantia= require('../commons/static/garantia');
const garantiaRoutes = require('../api/garantia/routes/garantia-routes');

// Rutas de las piezas, get y post
const pieza= require('../commons/static/pieza');
const piezaRoutes = require('../api/pieza/routes/pieza-routes');

// Rutas de los productos, get y post
const producto = require('../commons/static/producto');
const productoRoutes = require('../api/producto/routes/producto-routes');

// Rutas de los proveedores, get y post
const proveedor = require('../commons/static/proveedor');
const proveedorRoutes = require('../api/proveedor/routes/proveedor-routes');

const loginRoutes= require('../auth/login/routes/login-routes');

module.exports = class Routes {
   static init(app, router) {
     TodoRoutes.init(router);
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

 	router
       .route('/')
       .get(StaticDispatcher.sendIndex);
	router
    	.route('/probando')
    	.get(probandoRoutes.sendHola);   

  router
    .route('/u')
    .get(user.sendHola);

  router
    .route('/galmacenes')
    .get(almacen.sendCRUD);

  router
    .route('/gclientes')
    .get(cliente.sendCRUD);

  router
    .route('/gmodelos')
    .get(modelo.sendCRUD);

  router
    .route('/ggarantias')
    .get(garantia.sendCRUD);

  router
    .route('/gpiezas')
    .get(pieza.sendCRUD);
 
  router
    .route('/gproductos')
    .get(producto.sendCRUD);  

 router
    .route('/gproveedores')
    .get(proveedor.sendCRUD);  

     app.use('/', router);
     app.use('/u',router);
     app.use('/galmacenes',router);
     app.use('/gclientes',router);
     app.use('/gmodelos',router);
     app.use('/ggarantias',router);
     app.use('/gpiezas',router);
     app.use('/gproducto',router);
     app.use('/gproveedores',router);
   }
}
