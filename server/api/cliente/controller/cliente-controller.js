"use strict";

const ClienteDAO = require('../dao/cliente-dao');

module.exports = class ClienteController {
  static getAll(req, res) {
      ClienteDAO
        .getAll()
        .then(cliente => res.status(200).json(cliente))
        .catch(error => res.status(400).json(error));
  }

  static getbyId(req,res){
    let _id = req.params.id;
    ClienterDAO
      .getbyId(_id)
      .then(cliente => res.status(200).json(cliente))
      .catch(error => res.status(400).json(error));
  }

  static createCliente(req, res) {
      let _cliente = req.body;

      ClienteDAO
        .createCliente(_cliente)
        .then(cliente => res.status(201).json(cliente))
        .catch(error => res.status(400).json(error));
  }

  static deleteCliente(req, res) {
    let _id = req.params.id;

    ClienteDAO
      .deleteCliente(_id)
      .then(() => res.status(200).end())
      .catch(error => res.status(400).json(error));
  }
}
