"use strict";

const ProveedorDAO = require('../dao/proveedor-dao');

module.exports = class ProveedorController {
  static getAll(req, res) {
      ProveedorDAO
        .getAll()
        .then(proveedors => res.status(200).json(proveedors))
        .catch(error => res.status(400).json(error));
  }

  static getbyId(req,res){
    let _id = req.params.id;
    ProveedorDAO
      .getbyId(_id)
      .then(proveedor => res.status(200).json(proveedor))
      .catch(error => res.status(400).json(error));
  }

  static createProveedor(req, res) {
      let _proveedor = req.body;

      ProveedorDAO
        .createProveedor(_proveedor)
        .then(proveedor => res.status(201).json(proveedor))
        .catch(error => res.status(400).json(error));
  }

  static deleteProveedor(req, res) {
    let _id = req.params.id;

    ProveedorDAO
      .deleteProveedor(_id)
      .then(() => res.status(200).end())
      .catch(error => res.status(400).json(error));
  }
}
