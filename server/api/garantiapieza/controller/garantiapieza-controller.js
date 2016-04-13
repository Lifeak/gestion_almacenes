"use strict";

const GarantiapiezaDAO = require('../dao/garantiapieza-dao');

module.exports = class GarantiapiezaController {
  static getAll(req, res) {
      GarantiapiezaDAO
        .getAll()
        .then(garantias => res.status(200).json(garantias))
        .catch(error => res.status(400).json(error));
  }

  static getbyId(req,res){
    let _id = req.params.id;
    GarantiapiezaDAO
      .getbyId(_id)
      .then(garantia => res.status(200).json(garantia))
      .catch(error => res.status(400).json(error));
  }

  static createGarantiapieza(req, res) {
      let _garantia = req.body;
       GarantiapiezaDAO
        .createGarantiapieza(_garantia)
        .then(garantia => res.status(201).json(garantia))
        .catch(error => res.status(400).json(error));
        console.log("fin instruccion");
  }

  static deleteGarantiapieza(req, res) {
    let _id = req.params.id;

    GarantiapiezaDAO
      .deleteGarantiapieza(_id)
      .then(() => res.status(200).end())
      .catch(error => res.status(400).json(error));
  }
}
