"use strict";

const ProveedorController = require('../controller/proveedor-controller');

module.exports = class ProveedorRoutes {
    static init(router) {
      router
        .route('/api/proveedor')
        .get(ProveedorController.getAll)
        .post(ProveedorController.createProveedor);

      router
        .route('/api/proveedor/:id')
        .get(ProveedorController.getbyId)
        .delete(ProveedorController.deleteProveedor);
    }
}
