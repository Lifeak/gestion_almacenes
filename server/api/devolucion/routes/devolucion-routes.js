"use strict";

const DevolucionController = require('../controller/devolucion-controller');

module.exports = class DevolucionRoutes {
    static init(router) {
      router
        .route('/api/devolucion')
        .get(DevolucionController.getAll)
        .post(DevolucionController.createDevolucion);

      router
        .route('/api/devolucion/:id')
        .get(DevolucionController.getbyId)
        .delete(DevolucionController.deleteDevolucion);
    }
}
