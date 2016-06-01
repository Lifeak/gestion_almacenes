"use strict";

const ControlcalidadController = require('../controller/controlcalidad-controller');

module.exports = class ControlCalidadRoutes {
    static init(router) {
      router
        .route('/api/controlcalidad')
        .get(ControlcalidadController.getAll)
        .post(ControlcalidadController.createControlcalidad);

      router
        .route('/api/controlcalidad/:id')
        .get(ControlcalidadController.getbyId)
        .delete(ControlcalidadController.deleteControlcalidad);
    }
}
