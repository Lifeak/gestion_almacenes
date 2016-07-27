"use strict";

const TransporteController = require('../controller/transporte-controller');

module.exports = class TransporteRoutes {
    static init(router) {
      router
        .route('/api/transporte')
        .get(TransporteController.getAll)
        .post(TransporteController.createTransporte);

      router
        .route('/api/transporte/:id')
 		.get(TransporteController.getbyId)
        .delete(TransporteController.deleteTransporte);
    }
}
