"use strict";

const ReparacionesController = require('../controller/reparaciones-controller');

module.exports = class ReparacionesRoutes {
    static init(router) {
      router
        .route('/api/reparaciones')
        .get(ReparacionesController.getAll)
        .post(ReparacionesController.createReparacion);

      router
        .route('/api/reparaciones/:id')
        .get(ReparacionesController.getbyId)
        .delete(ReparacionesController.deleteReparacion);
    }
}
