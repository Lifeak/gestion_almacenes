"use strict";

const AlmacenController = require('../controller/almacen-controller');

module.exports = class AlmacenRoutes {
    static init(router) {
      router
        .route('/api/almacen')
        .get(AlmacenController.getAll)
        .post(AlmacenController.createAlmacen);

      router
        .route('/api/almacen/:id')
        .get(AlmacenController.getbyId)
        .delete(AlmacenController.deleteAlmacen);
    }
}
