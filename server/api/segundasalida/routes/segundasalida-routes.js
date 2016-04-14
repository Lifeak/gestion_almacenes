"use strict";

const SegundasalidaController = require('../controller/segundasalida-controller');

module.exports = class SegundasalidaRoutes {
    static init(router) {
      router
        .route('/api/segundasalida')
        .get(SegundasalidaController.getAll)
        .post(SegundasalidaController.createSegundasalida);

      router
        .route('/api/segundasalidac/:id')
        .get(SegundasalidaController.getbyId)
        .delete(SegundasalidaController.deleteSegundasalida);
    }
}
