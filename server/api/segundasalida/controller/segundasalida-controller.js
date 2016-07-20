"use strict";

const SegundasalidaDAO = require('../dao/segundasalida-dao');
const ModeloDAO = require('../../modelo/dao/modelo-dao');
const VentaDAO = require('../../ventas/dao/ventas-dao');

module.exports = class SegundasalidaController {
  static getAll(req, res) {
      SegundasalidaDAO
        .getAll()
        .then(segundasalidas => res.status(200).json(segundasalidas))
        .catch(error => res.status(400).json(error));
  }

  static getAllPopulate(req, res) {
      SegundasalidaDAO
        .getAllPopulate()
        .then(segundasalidas => res.status(200).json(segundasalidas))
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

  static getbyId(req,res){
    let _id = req.params.id;
    SegundasalidaDAO
      .getbyId(_id)
      .then(segundasalida => res.status(200).json(segundasalida))
      .catch(error => res.status(400).json(error));
  }

  static createSegundasalida(req, res) {
      let _segundasalida = req.body;

      SegundasalidaDAO
        .createSegundasalida(_segundasalida)
        .then(segundasalida => res.status(201).json(segundasalida))
        .catch(error => res.status(400).json(error));
  }

  static deleteSegundasalida(req, res) {
    let _id = req.params.id;

    SegundasalidaDAO
      .deleteSegundasalida(_id)
      .then(() => res.status(200).end())
      .catch(error => res.status(400).json(error));
  }
}
