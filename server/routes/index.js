"use strict";

const StaticDispatcher = require('../commons/static/index');
const TodoRoutes = require('../api/todo/routes/todo-routes');

const ClienteRoutes = require('../api/cliente/routes/cliente-routes');

const probandoRoutes = require('../commons/static/probando');

// Rutas del usuario, get y post
const user= require('../commons/static/user');
const userRoutes = require('../api/user/routes/user-routes');

const loginRoutes= require('../auth/login/routes/login-routes');

module.exports = class Routes {
   static init(app, router) {
     TodoRoutes.init(router);
     ClienteRoutes.init(router);
     userRoutes.init(router);
     loginRoutes.init(router);

 	router
       .route('/')
       .get(StaticDispatcher.sendIndex);
	router
    	.route('/probando')
    	.get(probandoRoutes.sendHola);   

  router
    .route('/u')
    .get(user.sendHola);

 
     app.use('/', router);
     app.use('/u',router);
   }
}
