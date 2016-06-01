"use strict";

const ControlCalidadDAO = require('../dao/controlcalidad-dao');

module.exports = class ControlcalidadController {
  static getAll(req, res) {
      ControlCalidadDAO
        .getAll()
        .then(controles => res.status(200).json(controles))
        .catch(error => res.status(400).json(error));
  }

  static getbyId(req,res){
    let _id = req.params.id;
    ControlCalidadDAO
      .getbyId(_id)
      .then(control => res.status(200).json(control))
      .catch(error => res.status(400).json(error));
  }

  static createControlcalidad(req, res) {
      let _control = req.body;
      ControlCalidadDAO
        .createControlcalidad(_control)
        .then(control => res.status(201).json(control))
        .catch(error => res.status(400).json(error));
  }

  static deleteControlcalidad(req, res) {
    let _id = req.params.id;

    ControlCalidadDAO
      .deleteControlcalidad(_id)
      .then(() => res.status(200).end())
      .catch(error => res.status(400).json(error));
  }
}
