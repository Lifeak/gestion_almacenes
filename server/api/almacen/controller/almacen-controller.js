"use strict";

const AlmacenDAO = require('../dao/almacen-dao');

module.exports = class AlmacenController {
  static getAll(req, res) {
      AlmacenDAO
        .getAll()
        .then(almacenes => res.status(200).json(almacenes))
        .catch(error => res.status(400).json(error));
  }

  static getbyId(req,res){
    let _id = req.params.id;
    AlmacenDAO
      .getbyId(_id)
      .then(almacen => res.status(200).json(almacen))
      .catch(error => res.status(400).json(error));
  }

  static createAlmacen(req, res) {
      let _almacen = req.body;
console.log("al controller llega  "+_almacen.nombre);
      AlmacenDAO
        .createAlmacen(_almacen)
        .then(almacen => res.status(201).json(almacen))
        .catch(error => res.status(400).json(error));
        console.log("fin instruccion");
  }

  static deleteAlmacen(req, res) {
    let _id = req.params.id;

    AlmacenDAO
      .deleteAlmacen(_id)
      .then(() => res.status(200).end())
      .catch(error => res.status(400).json(error));
  }
}
