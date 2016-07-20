"use strict";

const SegundasalidaController = require('../controller/segundasalida-controller');

module.exports = class SegundasalidaRoutes {
    static init(router) {
      router
        .route('/api/segundasalida')
        .get(SegundasalidaController.getAll)
        .post(SegundasalidaController.createSegundasalida);

      router
        .route('/api/segundasalida/:id')
        .get(SegundasalidaController.getbyId)
        .delete(SegundasalidaController.deleteSegundasalida);

      router
        .route('/api/sm/modelos')
        .get(SegundasalidaController.getModelos);

      router
        .route('/api/sv/ventas')
        .get(SegundasalidaController.getVentas);

      router
      .route('/api/segpop/populate')
      .get(SegundasalidaController.getAllPopulate);
    }
}
