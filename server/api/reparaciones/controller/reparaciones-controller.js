"use strict";

const ReparacionesDAO = require('../dao/reparaciones-dao');

module.exports = class ReparacionesController {
  static getAll(req, res) {
      ReparacionesDAO
        .getAll()
        .then(reparaciones => res.status(200).json(reparaciones))
        .catch(error => res.status(400).json(error));
  }

  static getbyId(req,res){
    let _id = req.params.id;
    ReparacionesDAO
      .getbyId(_id)
      .then(reparacion => res.status(200).json(reparacion))
      .catch(error => res.status(400).json(error));
  }

  static createReparacion(req, res) {
      let _reparacion = req.body;
      ReparacionesDAO
        .createReparacion(_reparacion)
        .then(reparacion => res.status(201).json(reparacion))
        .catch(error => res.status(400).json(error));
        console.log("fin instruccion");
  }

  static deleteReparacion(req, res) {
    let _id = req.params.id;

    ReparacionesDAO
      .deleteReparacion(_id)
      .then(() => res.status(200).end())
      .catch(error => res.status(400).json(error));
  }
}
