"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const garantiapSchema = require('../model/garantiapieza-model');
const _ = require('lodash');


garantiapSchema.statics.getAll = () => {
    return new Promise((resolve, reject) => {
        let _query = {};

        Garantiapieza
          .find(_query)
          .exec((err, garantias) => {
              err ? reject(err)
                  : resolve(garantias);
          });
      });
}

garantiapSchema.statics.getbyId = (id) => {
    return new Promise((resolve, reject) => {
        if (!_.isString(id))
            return reject(new TypeError('Id is not a valid string.'));

        Garantiapieza
          .findById(id)
          .exec((err, garantia) => {
              err ? reject(err)
                  : resolve(garantia);
          });
    });
}

garantiapSchema.statics.createGarantiapieza = (garantiapieza) => {
    return new Promise((resolve, reject) => {
      if (!_.isObject(garantiapieza))
          return reject(new TypeError('Garantiapieza is not a valid object.'));
      
      let _garantiapieza = new Garantiapieza(garantiapieza);
      _garantiapieza.save((err, saved) => {
        err ? reject(err)
            : resolve(saved);
      });
    });
}

garantiapSchema.statics.deleteGarantiapieza = (id) => {
    return new Promise((resolve, reject) => {
        if (!_.isString(id))
            return reject(new TypeError('Id is not a valid string.'));

        Garantiapieza
          .findByIdAndRemove(id)
          .exec((err, deleted) => {
              err ? reject(err)
                  : resolve();
          });
    });
}

const Garantiapieza  = mongoose.model('Garantiapieza', garantiapSchema);

module.exports = Garantiapieza;
