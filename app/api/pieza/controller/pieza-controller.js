"use strict";

const PiezaDAO = require('../dao/pieza-dao');
const ModeloDAO = require('../../modelo/dao/modelo-dao');

module.exports = class PiezaController {
  static getAll(req, res) {
    console.log("getAll");
      PiezaDAO
        .getAll()
        .then(piezas => res.status(200).json(piezas))
        .catch(error => res.status(400).json(error));
  }

  static getbyId(req,res){
    console.log("getbyId");
    let _id = req.params.id;
    PiezaDAO
      .getbyId(_id)
      .then(pieza => res.status(200).json(pieza))
      .catch(error => res.status(400).json(error));
  }

  static getModelos(req, res){
    console.log("llegamos al controlador de pieza y mandamos al dao del modelo");
    ModeloDAO
      .getModelosDePieza()
        .then(modelos => res.status(200).json(modelos))
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
