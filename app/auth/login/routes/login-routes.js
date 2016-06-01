"use strict";

const LoginController = require('../controller/login-controller');

module.exports = class LoginRoutes {
    static init(router) {
      router
        .route('/auth/login')
        .post(LoginController.getLogin);
    }
}
