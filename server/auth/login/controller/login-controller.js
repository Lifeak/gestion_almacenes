"use strict";

const UserDAO = require('../../../api/user/dao/user-dao');

module.exports = class LoginController {

  static getLogin(req,res){
    let _user = req.body.user;
    let _pass = req.body.pass;
    UserDAO
      .getLogin(_user, _pass)
      .then(user => res.status(200).json(user))
      .catch(error => res.status(400).json(error));
  }
}
