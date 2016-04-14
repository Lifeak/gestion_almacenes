"use strict";

const ProveedorController = require('../controller/user-controller');

module.exports = class ProveedorRoutes {
    static init(router) {
      router
        .route('/api/proveedor')
        .get(ProveedorController.getAll)
        .post(ProveedorController.createUser);

      router
        .route('/api/proveedor/:id')
        .get(ProveedorController.getbyId)
        .delete(ProveedorController.deleteUser);
    }
}
