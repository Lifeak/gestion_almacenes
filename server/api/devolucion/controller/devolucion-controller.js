"use strict";

const DevolucionDAO = require('../dao/devolucion-dao');
const ModeloDAO = require('../../modelo/dao/modelo-dao');
const VentaDAO = require('../../ventas/dao/ventas-dao');

module.exports = class DevolucionController {
  static getAll(req, res) {
      DevolucionDAO
        .getAll()
        .then(devolucions => res.status(200).json(devolucions))
        .catch(error => res.status(400).json(error));
  }

  static getAllPopulate(req, res) {
    console.log("getAllPopulate en controller");
      DevolucionDAO
        .getAllPopulate()
        .then(devolucions => res.status(200).json(devolucions))
        .catch(error => res.status(400).json(error));
  }

  static getbyId(req,res){
    let _id = req.params.id;
    DevolucionDAO
      .getbyId(_id)
      .then(devolucion => res.status(200).json(devolucion))
      .catch(error => res.status(400).json(error));
  }

  static getModelos(req,res){
      ModeloDAO
      .getAll()
      .then(modelos => res.status(200).json(modelos))
      .catch(error => res.status(400).json(error));
  }

  static getVentas(req,res){
      VentaDAO
      .getAll()
      .then(ventas => res.status(200).json(ventas))
      .catch(error => res.status(400).json(error));
  }

  static createDevolucion(req, res) {
      let _devolucion = req.body;

      DevolucionDAO
        .createDevolucion(_devolucion)
        .then(devolucion => res.status(201).json(devolucion))
        .catch(error => res.status(400).json(error));
  }

  static deleteDevolucion(req, res) {
    let _id = req.params.id;

    DevolucionDAO
      .deleteDevolucion(_id)
      .then(() => res.status(200).end())
      .catch(error => res.status(400).json(error));
  }
}
