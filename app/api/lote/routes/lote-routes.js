"use strict";

const PiezaController = require('../controller/pieza-controller');

module.exports = class PiezaRoutes {
    static init(router) {
      router
        .route('/api/pieza')
        .get(PiezaController.getAll)
        .post(PiezaController.createPieza);

      router
        .route('/api/pieza/:id')
        .get(PiezaController.getbyId)
        .delete(PiezaController.deletePieza);
    }
}
