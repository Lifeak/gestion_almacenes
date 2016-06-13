"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const proveedorSchema = require('../model/proveedor-model');
const _ = require('lodash');


proveedorSchema.statics.getAll = () => {
    return new Promise((resolve, reject) => {
        let _query = {};

        Proveedor
          .find(_query)
          .exec((err, proveedors) => {
              err ? reject(err)
                  : resolve(proveedors);
          });
      });
}

proveedorSchema.statics.getbyId = (id) => {
    return new Promise((resolve, reject) => {
        if (!_.isString(id))
            return reject(new TypeError('Id is not a valid string.'));

        Proveedor
          .findById(id)
          .exec((err, proveedor) => {
              err ? reject(err)
                  : resolve(proveedor);
          });
    });
}

proveedorSchema.statics.createProveedor = (proveedor) => {
    return new Promise((resolve, reject) => {
      if (!_.isObject(proveedor))
          return reject(new TypeError('Proveedor is not a valid object.'));
      
      let _proveedor = new Proveedor(proveedor);
      _proveedor.save((err, saved) => {
        err ? reject(err)
            : resolve(saved);
      });


    });
}

proveedorSchema.statics.deleteProveedor = (id) => {
    return new Promise((resolve, reject) => {
        if (!_.isString(id))
            return reject(new TypeError('Id is not a valid string.'));

        Proveedor
          .findByIdAndRemove(id)
          .exec((err, deleted) => {
              err ? reject(err)
                  : resolve();
          });
    });
}

const Proveedor  = mongoose.model('Proveedor', proveedorSchema);

module.exports = Proveedor;
