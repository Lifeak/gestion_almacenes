"use strict";

const TransporteDAO = require('../dao/transporte-dao');

module.exports = class TransporteController {
  static getAll(req, res) {
      TransporteDAO
        .getAll()
        .then(transporte => res.status(200).json(transporte))
        .catch(error => res.status(400).json(error));
  }

  static getbyId(req,res){
    let _id = req.params.id;
    TransporteDAO
      .getbyId(_id)
      .then(cliente => res.status(200).json(cliente))
      .catch(error => res.status(400).json(error));
  }

  static createTransporte(req, res) {
      let _transporte = req.body;

      TransporteDAO
        .createTransporte(_transporte)
        .then(transporte => res.status(201).json(transporte))
        .catch(error => res.status(400).json(error));
  }

  static deleteTransporte(req, res) {
    let _id = req.params.id;
    TransporteDAO
      .deleteTransporte(_id)
      .then(() => res.status(200).end())
      .catch(error => res.status(400).json(error));
  }
}
