"use strict";

const ProductoDAO = require('../dao/producto-dao');

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

  static createProduct(req, res) {
      let _producto = req.body;
      console.log("producto"+_producto.nombre);

      ProductoDAO
        .createProduct(_producto)
        .then(producto => res.status(201).json(producto))
        .catch(error => res.status(400).json(error));
        console.log("fin instruccion");
  }

  static deleteProduct(req, res) {
    let _id = req.params.id;

    ProductoDAO
      .deleteProduct(_id)
      .then(() => res.status(200).end())
      .catch(error => res.status(400).json(error));
  }
}
