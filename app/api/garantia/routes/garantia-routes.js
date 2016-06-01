"use strict";

const GarantiaController = require('../controller/garantia-controller');

module.exports = class GarantiaRoutes {
    static init(router) {
      router
        .route('/api/garantia')
        .get(GarantiaController.getAll)
        .post(GarantiaController.createGarantia);

      router
        .route('/api/garantia/:id')
        .get(GarantiaController.getbyId)
        .delete(GarantiaController.deleteGarantia);
    }
}
