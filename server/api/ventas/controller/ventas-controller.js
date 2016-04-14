"use strict";

const VentaDAO = require('../dao/ventas-dao');

module.exports = class VentaController {
  static getAll(req, res) {
      VentaDAO
        .getAll()
        .then(ventas => res.status(200).json(ventas))
        .catch(error => res.status(400).json(error));
  }

  static getbyId(req,res){
    let _id = req.params.id;
    VentaDAO
      .getbyId(_id)
      .then(venta => res.status(200).json(venta))
      .catch(error => res.status(400).json(error));
  }

  static createVenta(req, res) {
      let _venta = req.body;

      VentaDAO
        .createVenta(_venta)
        .then(venta =>Venta res.status(201).json(venta))
        .catch(error => res.status(400).json(error));
        console.log("fin instruccion");
  }

  static deleteVenta(req, res) {
    let _id = req.params.id;

    VentaDAO
      .deleteVenta(_id)
      .then(() => res.status(200).end())
      .catch(error => res.status(400).json(error));
  }
}
