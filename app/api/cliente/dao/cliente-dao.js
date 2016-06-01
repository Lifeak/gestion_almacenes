"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const clienteSchema = require('../model/cliente-model');
const _ = require('lodash');

clienteSchema.statics.getAll = () => {
    return new Promise((resolve, reject) => {
        let _query = {};

        Cliente
          .find(_query)
          .exec((err, clientes) => {
              err ? reject(err)
                  : resolve(clientes);
          });
      });
}

clienteSchema.statics.getbyId = (id) => {
    return new Promise((resolve, reject) => {
        if (!_.isString(id))
            return reject(new TypeError('Id is not a valid string.'));

        Cliente
          .findById(id)
          .exec((err, cliente) => {
              err ? reject(err)
                  : resolve(cliente);
          });
    });
}

clienteSchema.statics.createCliente = (cliente) => {
    return new Promise((resolve, reject) => {
      if (!_.isObject(cliente))
          return reject(new TypeError('Cliente is not a valid object.'));

      let _cliente = new Cliente(cliente);

      _cliente.save((err, saved) => {
        err ? reject(err)
            : resolve(saved);
      });
    });
}

clienteSchema.statics.deleteCliente = (id) => {
    return new Promise((resolve, reject) => {
        if (!_.isString(id))
            return reject(new TypeError('Id is not a valid string.'));

        Cliente
          .findByIdAndRemove(id)
          .exec((err, deleted) => {
              err ? reject(err)
                  : resolve();
          });
    });
}

const Cliente  = mongoose.model('Cliente', clienteSchema);

module.exports = Cliente;
