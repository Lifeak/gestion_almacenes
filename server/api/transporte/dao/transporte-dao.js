"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const transporteSchema = require('../model/transporte-model');
const _ = require('lodash');

transporteSchema.statics.getAll = () => {
    return new Promise((resolve, reject) => {
        let _query = {};

        Transporte
          .find(_query)
          .exec((err, transportes) => {
              err ? reject(err)
                  : resolve(transportes);
          });
      });
}

transporteSchema.statics.getbyId = (id) => {
    return new Promise((resolve, reject) => {
        if (!_.isString(id))
            return reject(new TypeError('Id is not a valid string.'));

        Transporte
          .findById(id)
          .exec((err, transporte) => {
              err ? reject(err)
                  : resolve(transporte);
          });
    });
}

transporteSchema.statics.createTransporte = (transporte) => {
    return new Promise((resolve, reject) => {
      if (!_.isObject(transporte))
          return reject(new TypeError('Transporte is not a valid object.'));

      let _transporte = new Transporte(transporte);

      _transporte.save((err, saved) => {
        err ? reject(err)
            : resolve(saved);
      });
    });
}

transporteSchema.statics.deleteTransporte = (id) => {
    return new Promise((resolve, reject) => {
        if (!_.isString(id))
            return reject(new TypeError('Id is not a valid string.'));

        Transporte
          .findByIdAndRemove(id)
          .exec((err, deleted) => {
              err ? reject(err)
                  : resolve();
          });
    });
}

const Transporte  = mongoose.model('Transporte', transporteSchema);

module.exports = Transporte;
