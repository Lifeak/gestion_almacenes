"use strict";

const GarantiapiezaController = require('../controller/garantiapieza-controller');

module.exports = class GarantiapiezaRoutes {
    static init(router) {
      router
        .route('/api/garantiapieza')
        .get(GarantiapiezaController.getAll)
        .post(GarantiapiezaController.createGarantiapieza);

      router
        .route('/api/garantiapieza/:id')
        .get(GarantiapiezaController.getbyId)
        .delete(GarantiapiezaController.deleteGarantiapieza);
    }
}
