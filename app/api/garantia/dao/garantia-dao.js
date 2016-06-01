"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const garantiaSchema = require('../model/garantia-model');
const _ = require('lodash');

garantiaSchema.statics.getAll = () => {
    return new Promise((resolve, reject) => {
        let _query = {};

        Garantia
          .find(_query)
          .exec((err, garantias) => {
              err ? reject(err)
                  : resolve(garantias);
          });
      });
}

garantiaSchema.statics.getbyId = (id) => {
    return new Promise((resolve, reject) => {
        if (!_.isString(id))
            return reject(new TypeError('Id is not a valid string.'));

        Garantia
          .findById(id)
          .exec((err, garantia) => {
              err ? reject(err)
                  : resolve(garantia);
          });
    });
}

garantiaSchema.statics.createGarantia = (garantia) => {
    return new Promise((resolve, reject) => {
      if (!_.isObject(garantia))
          return reject(new TypeError('Garantia is not a valid object.'));
      
      let _garantia = new Garantia(garantia);
      _garantia.save((err, saved) => {
        err ? reject(err)
            : resolve(saved);
      });
    });
}

garantiaSchema.statics.deleteGarantia = (id) => {
    return new Promise((resolve, reject) => {
        if (!_.isString(id))
            return reject(new TypeError('Id is not a valid string.'));

        Garantia
          .findByIdAndRemove(id)
          .exec((err, deleted) => {
              err ? reject(err)
                  : resolve();
          });
    });
}

const Garantia  = mongoose.model('Garantia', garantiaSchema);

module.exports = Garantia;
