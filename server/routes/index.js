"use strict";

const StaticDispatcher = require('../commons/static/index');
const TodoRoutes = require('../api/todo/routes/todo-routes');

const ClienteRoutes = require('../api/cliente/routes/cliente-routes');

const probandoRoutes = require('../commons/static/probando');

const user = require('../commons/static/user');
const UserRoutes = require('../api/user/routes/user-routes');


module.exports = class Routes {
   static init(app, router) {
     TodoRoutes.init(router);
     ClienteRoutes.init(router);
     UserRoutes.init(router);

     router
       .route('/')
       .get(StaticDispatcher.sendIndex);
    router
    	.route('/probando')
    	.get(probandoRoutes.sendHola);   
    router
      .route('/user')
      .get(user.sendCRUD);

     app.use('/', router);
     app.use('/user',router);
//     app.use('/probando', router.get(probandoRoutes.sendHola));
   }
}
