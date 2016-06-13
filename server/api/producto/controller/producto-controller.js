"use strict";

const ProductoDAO = require('../dao/producto-dao');
const ModeloDAO = require('../../modelo/dao/modelo-dao');

module.exports = class ProductoController {
  static getAll(req, res) {
      ProductoDAO
        .getAll()
        .then(productos => res.status(200).json(productos))
        .catch(error => res.status(400).json(error));
  }

  static getbyId(req,res){
    let _id = req.params.id;
    ProductoDAO
      .getbyId(_id)
      .then(producto => res.status(200).json(producto))
      .catch(error => res.status(400).json(error));
  }

  static getModelos(req, res){
    ModeloDAO
      .getModelosDeProducto()
        .then(modelos => res.status(200).json(modelos))
        .catch(error => res.status(400).json(error));
  }

  static createProducto(req, res) {
      let _producto = req.body;

      ProductoDAO
        .createProducto(_producto)
        .then(producto => res.status(201).json(producto))
        .catch(error => res.status(400).json(error));
        console.log("fin instruccion");
  }

  static deleteProducto(req, res) {
    let _id = req.params.id;

    ProductoDAO
      .deleteProducto(_id)
      .then(() => res.status(200).end())
      .catch(error => res.status(400).json(error));
  }
}
