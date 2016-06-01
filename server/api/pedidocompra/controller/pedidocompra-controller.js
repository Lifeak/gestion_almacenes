"use strict";

const PedidocompraDAO = require('../dao/pedidocompra-dao');

module.exports = class PedidocompraController {
  static getAll(req, res) {
      PedidocompraDAO
        .getAll()
        .then(pedidocompras => res.status(200).json(pedidocompras))
        .catch(error => res.status(400).json(error));
  }

  static getbyId(req,res){
    let _id = req.params.id;
    PedidocompraDAO
      .getbyId(_id)
      .then(pedidocompra => res.status(200).json(pedidocompra))
      .catch(error => res.status(400).json(error));
  }

  static createPedidocompra(req, res) {
      let _pedidocompra = req.body;

      PedidocompraDAO
        .createPedidocompra(_pedidocompra)
        .then(pedidocompra => res.status(201).json(pedidocompra))
        .catch(error => res.status(400).json(error));
  }

  static deletePedidocompra(req, res) {
    let _id = req.params.id;

    PedidocompraDAO
      .deletePedidocompra(_id)
      .then(() => res.status(200).end())
      .catch(error => res.status(400).json(error));
  }
}
