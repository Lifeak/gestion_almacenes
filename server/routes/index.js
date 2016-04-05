"use strict";

const StaticDispatcher = require('../commons/static/index');
const TodoRoutes = require('../api/todo/routes/todo-routes');

const ClienteRoutes = require('../api/cliente/routes/cliente-routes');

const probandoRoutes = require('../commons/static/probando');

const user = require('../commons/static/user');
const UserRoutes = require('../api/user/routes/user-routes');
////
const userDetails= require('../commons/static/userDetails');
const userList= require('../commons/static/userList');

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
     router
      .route('/api/user')
      .get(userList.sendList);

     app.use('/', router);
     app.use('/user',router);
     app.use('/api/user',router);
//     app.use('/probando', router.get(probandoRoutes.sendHola));
   }
}
