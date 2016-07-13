"use strict";

const PedidocompraDAO = require('../dao/pedidocompra-dao');
const ModeloDAO = require('../../modelo/dao/modelo-dao');
const ProveedorDAO = require('../../proveedor/dao/proveedor-dao');
const AlmacenDAO = require('../../almacen/dao/almacen-dao');

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

  static getModelos(req, res){
   
    ModeloDAO
      .getModelosDePieza()
        .then(modelos => res.status(200).json(modelos))
        .catch(error => res.status(400).json(error));
  }

  static getProveedores(req, res){
   
    ProveedorDAO
      .getAll()
        .then(proveedors => res.status(200).json(proveedors))
        .catch(error => res.status(400).json(error));
  }

  static getAlmacenes(req, res){
   
    AlmacenDAO
      .getAll()
        .then(almacens => res.status(200).json(almacens))
        .catch(error => res.status(400).json(error));
  }
}
