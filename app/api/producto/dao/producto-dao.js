"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const productoSchema = require('../model/producto-model');
const _ = require('lodash');


productoSchema.statics.getAll = () => {
    return new Promise((resolve, reject) => {
        let _query = {};

        Producto
          .find(_query)
          .exec((err, productos) => {
              err ? reject(err)
                  : resolve(productos);
          });
      });
}

productoSchema.statics.getbyId = (id) => {
    return new Promise((resolve, reject) => {
        if (!_.isString(id))
            return reject(new TypeError('Id is not a valid string.'));

        Producto
          .findById(id)
          .exec((err, producto) => {
              err ? reject(err)
                  : resolve(producto);
          });
    });
}

productoSchema.statics.createProducto = (producto) => {
    return new Promise((resolve, reject) => {
      if (!_.isObject(producto))
          return reject(new TypeError('Producto is not a valid object.'));
      
      let _producto = new Producto(producto);
      _producto.save((err, saved) => {
        err ? reject(err)
            : resolve(saved);
      });
    });
}

productoSchema.statics.deleteProducto = (id) => {
    return new Promise((resolve, reject) => {
        if (!_.isString(id))
            return reject(new TypeError('Id is not a valid string.'));

        Producto
          .findByIdAndRemove(id)
          .exec((err, deleted) => {
              err ? reject(err)
                  : resolve();
          });
    });
}

const Producto  = mongoose.model('Producto', productoSchema);

module.exports = Producto;
