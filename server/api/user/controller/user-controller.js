"use strict";

const UserDAO = require('../dao/user-dao');

module.exports = class UserController {
  static getAll(req, res) {
      UserDAO
        .getAll()
        .then(users => res.status(200).json(users))
        .catch(error => res.status(400).json(error));
  }

  static getbyId(req,res){
    let _id = req.params.id;
    UserDAO
      .getbyId(_id)
      .then(user => res.status(200).json(user))
      .catch(error => res.status(400).json(error));
  }

  static getProfile(req,res){
    let _user = req.params.user;
    UserDAO
      .getProfile(_user)
      .then(user => res.status(200).json(user))
      .catch(error => res.status(400).json(error));
  }

  static createUser(req, res) {
      let _user = req.body;
      UserDAO
        .createUser(_user)
        .then(user => res.status(201).json(user))
        .catch(error => res.status(400).json(error));
  }

  static deleteUser(req, res) {
    let _id = req.params.id;

    UserDAO
      .deleteUser(_id)
      .then(() => res.status(200).end())
      .catch(error => res.status(400).json(error));
  }
}
