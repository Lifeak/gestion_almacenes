"use strict";

const TodoRoutes = require('../api/todo/routes/todo-routes');
const ClienteRoutes = require('../api/cliente/routes/cliente-routes');
const probandoRoutes = require('../commons/static/probando');
const StaticDispatcher = require('../commons/static/index');

module.exports = class Routes {
   static init(app, router) {
     TodoRoutes.init(router);
     ClienteRoutes.init(router);

     router
       .route('/')
       .get(StaticDispatcher.sendIndex);
    router
    	.route('/probando')
    	.get(probandoRoutes.sendHola);   

     app.use('/', router);
//     app.use('/probando', router.get(probandoRoutes.sendHola));
   }
}
