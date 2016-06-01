"use strict";

const VentaController = require('../controller/ventas-controller');

module.exports = class VentaRoutes {
    static init(router) {
      router
        .route('/api/venta')
        .get(VentaController.getAll)
        .post(VentaController.createVenta);

      router
        .route('/api/venta/:id')
        .get(VentaController.getbyId)
        .delete(VentaController.deleteVenta);
    }
}
