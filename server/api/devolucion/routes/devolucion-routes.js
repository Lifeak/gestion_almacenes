"use strict";

const DevolucionController = require('../controller/devolucion-controller');

module.exports = class DevolucionRoutes {
    static init(router) {
      router
        .route('/api/devolucion')
        .get(DevolucionController.getAll)
        .post(DevolucionController.createDevolucion);

      router
        .route('/api/devolucion/:id')
        .get(DevolucionController.getbyId)
        .delete(DevolucionController.deleteDevolucion);

      router
        .route('/api/dm/modelos')
        .get(DevolucionController.getModelos);

      router  
        .route('/api/dv/ventas')
        .get(DevolucionController.getVentas); 

      router  
        .route('/api/devpop/populate')
        .get(DevolucionController.getAllPopulate);        
    }
}
