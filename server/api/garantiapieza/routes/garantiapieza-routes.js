"use strict";

const GarantiapiezaController = require('../controller/garantiapieza-controller');

module.exports = class GarantiapiezaRoutes {
    static init(router) {
      router
        .route('/api/gpieza')
        .get(GarantiapiezaController.getAll)
        .post(GarantiapiezaController.createGarantiapieza);

      router
        .route('/api/gpieza/:id')
        .get(GarantiapiezaController.getbyId)
        .delete(GarantiapiezaController.deleteGarantiapieza);
    }
}
