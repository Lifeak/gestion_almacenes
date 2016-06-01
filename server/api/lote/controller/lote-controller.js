"use strict";

const PiezaDAO = require('../dao/pieza-dao');

module.exports = class PiezaController {
  static getAll(req, res) {
      PiezaDAO
        .getAll()
        .then(piezas => res.status(200).json(piezas))
        .catch(error => res.status(400).json(error));
  }

  static getbyId(req,res){
    let _id = req.params.id;
    PiezaDAO
      .getbyId(_id)
      .then(pieza => res.status(200).json(pieza))
      .catch(error => res.status(400).json(error));
  }

  static createPieza(req, res) {
      let _pieza = req.body;
      PiezaDAO
        .createPieza(_pieza)
        .then(pieza => res.status(201).json(pieza))
        .catch(error => res.status(400).json(error));
  }

  static deletePieza(req, res) {
    let _id = req.params.id;

    PiezaDAO
      .deletePieza(_id)
      .then(() => res.status(200).end())
      .catch(error => res.status(400).json(error));
  }
}
