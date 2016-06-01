"use strict";

const GarantiaDAO = require('../dao/garantia-dao');

module.exports = class GarantiaController {
  static getAll(req, res) {
      GarantiaDAO
        .getAll()
        .then(garantias => res.status(200).json(garantias))
        .catch(error => res.status(400).json(error));
  }

  static getbyId(req,res){
    let _id = req.params.id;
    GarantiaDAO
      .getbyId(_id)
      .then(garantia => res.status(200).json(garantia))
      .catch(error => res.status(400).json(error));
  }

  static createGarantia(req, res) {
      let _garantia = req.body;
      GarantiaDAO
        .createGarantia(_garantia)
        .then(garantia => res.status(201).json(garantia))
        .catch(error => res.status(400).json(error));
  }

  static deleteGarantia(req, res) {
    let _id = req.params.id;

    GarantiaDAO
      .deleteGarantia(_id)
      .then(() => res.status(200).end())
      .catch(error => res.status(400).json(error));
  }
}
