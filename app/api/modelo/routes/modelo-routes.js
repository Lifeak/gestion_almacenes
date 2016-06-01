"use strict";

const ModeloController = require('../controller/modelo-controller');

module.exports = class ModeloRoutes {
    static init(router) {
      router
        .route('/api/modelo')
        .get(ModeloController.getAll)
        .post(ModeloController.createModelo);

      router
        .route('/api/modelo/:id')
        .get(ModeloController.getbyId)
        .delete(ModeloController.deleteModelo);

    router
        .route('/api/modelo/details/:nombre')
        .get(ModeloController.getbyName);

    }
}
