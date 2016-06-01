"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const ventaSchema = require('../model/ventas-model');
const _ = require('lodash');


ventaSchema.statics.getAll = () => {
    return new Promise((resolve, reject) => {
        let _query = {};

        Venta
          .find(_query)
          .exec((err, ventas) => {
              err ? reject(err)
                  : resolve(ventas);
          });
      });
}

ventaSchema.statics.getbyId = (id) => {
    return new Promise((resolve, reject) => {
        if (!_.isString(id))
            return reject(new TypeError('Id is not a valid string.'));

        Venta
          .findById(id)
          .exec((err, venta) => {
              err ? reject(err)
                  : resolve(venta);
          });
    });
}

ventaSchema.statics.createVenta = (venta) => {
    return new Promise((resolve, reject) => {
      if (!_.isObject(venta))
          return reject(new TypeError('Venta is not a valid object.'));
      
      let _venta = new Venta(venta);
      _venta.save((err, saved) => {
        err ? reject(err)
            : resolve(saved);
      });
    });
}

ventaSchema.statics.deleteVenta = (id) => {
    return new Promise((resolve, reject) => {
        if (!_.isString(id))
            return reject(new TypeError('Id is not a valid string.'));

        Venta
          .findByIdAndRemove(id)
          .exec((err, deleted) => {
              err ? reject(err)
                  : resolve();
          });
    });
}

const Venta  = mongoose.model('Venta', ventaSchema);

module.exports = Venta;
