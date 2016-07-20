"use strict";

const ReparacionesController = require('../controller/reparaciones-controller');

module.exports = class ReparacionesRoutes {
    static init(router) {
      router
        .route('/api/reparacion')
        .get(ReparacionesController.getAll)
        .post(ReparacionesController.createReparacion);

      router
        .route('/api/reparacion/:id')
        .get(ReparacionesController.getbyId)
        .delete(ReparacionesController.deleteReparacion);
    }
}
