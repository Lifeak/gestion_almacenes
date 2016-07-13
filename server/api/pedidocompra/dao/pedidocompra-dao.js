"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const pedidocompraSchema = require('../model/pedidocompra-model');
const lineapedidoSchema = require('../model/pedidocompra-model');
const _ = require('lodash');


pedidocompraSchema.statics.getAll = () => {
    return new Promise((resolve, reject) => {
        let _query = {};

        Pedidocompra
          .find(_query)
          .exec((err, pedidocompras) => {
              err ? reject(err)
                  : resolve(pedidocompras);
          });
      });
}

pedidocompraSchema.statics.getbyId = (id) => {
    return new Promise((resolve, reject) => {
        if (!_.isString(id))
            return reject(new TypeError('Id is not a valid string.'));

        Pedidocompra
          .findById(id)
          .exec((err, pedidocompra) => {
              err ? reject(err)
                  : resolve(pedidocompra);
          });
    });
}

pedidocompraSchema.statics.createPedidocompra = (pedidocompra) => {
    return new Promise((resolve, reject) => {
      if (!_.isObject(pedidocompra))
          return reject(new TypeError('Pedidocompra is not a valid object.'));
      
      let _pedidocompra = new Pedidocompra(pedidocompra);
      _pedidocompra.save((err, saved) => {
        err ? reject(err)
            : resolve(saved);
      });
    });
}

pedidocompraSchema.statics.deletePedidocompra = (id) => {
    return new Promise((resolve, reject) => {
        if (!_.isString(id))
            return reject(new TypeError('Id is not a valid string.'));

        Pedidocompra
          .findByIdAndRemove(id)
          .exec((err, deleted) => {
              err ? reject(err)
                  : resolve();
          });
    });
}

const Pedidocompra  = mongoose.model('Pedidocompra', pedidocompraSchema);

module.exports = Pedidocompra;
