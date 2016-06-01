"use strict";

const PedidocompraController = require('../controller/pedidocompra-controller');

module.exports = class PedidocompraRoutes {
    static init(router) {
      router
        .route('/api/pedidocompra')
        .get(PedidocompraController.getAll)
        .post(PedidocompraController.createPedidocompra);

      router
        .route('/api/pedidocompra/:id')
        .get(PedidocompraController.getbyId)
        .delete(PedidocompraController.deletePedidocompra);
    }
}
