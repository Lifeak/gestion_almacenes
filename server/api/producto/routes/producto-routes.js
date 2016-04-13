"use strict";

const ProductoController = require('../controller/producto-controller');

module.exports = class ProductoRoutes {
    static init(router) {
      router
        .route('/api/producto')
        .get(ProductoController.getAll)
        .post(ProductoController.createProducto);

      router
        .route('/api/producto/:id')
        .get(ProductoController.getbyId)
        .delete(ProductoController.deleteProducto);
    }
}
