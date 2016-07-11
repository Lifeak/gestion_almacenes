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
        .put(PedidocompraController.updatePedidocompra)
        .delete(PedidocompraController.deletePedidocompra);

    router
        .route('/api/pedido/modelos')
        .get(PedidocompraController.getModelos);

    router
        .route('/api/pedid/almacen')
        .get(PedidocompraController.getAlmacenes);
        
    router
        .route('/api/ped/proveedor')
        .get(PedidocompraController.getProveedores);

    }
}
