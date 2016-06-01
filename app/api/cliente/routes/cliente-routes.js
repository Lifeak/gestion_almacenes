"use strict";

const ClienteController = require('../controller/cliente-controller');

module.exports = class ClienteRoutes {
    static init(router) {
      router
        .route('/api/cliente')
        .get(ClienteController.getAll)
        .post(ClienteController.createCliente);

      router
        .route('/api/cliente/:id')
 		.get(ClienteController.getbyId)
        .delete(ClienteController.deleteCliente);
    }
}
