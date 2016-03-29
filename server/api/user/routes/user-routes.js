"use strict";

const UserController = require('../controller/user-controller');

module.exports = class UserRoutes {
    static init(router) {
      router
        .route('/api/user')
        .get(UserController.getAll)
        .post(UserController.createUser);

      router
        .route('/api/user/:id')
        .delete(UserController.deleteUser);
    }
}
