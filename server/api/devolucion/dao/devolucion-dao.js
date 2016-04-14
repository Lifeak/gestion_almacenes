"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const devolucionSchema = require('../model/devolucion-model');
const _ = require('lodash');


devolucionSchema.statics.getAll = () => {
    return new Promise((resolve, reject) => {
        let _query = {};

        Devolucion
          .find(_query)
          .exec((err, devolucions) => {
              err ? reject(err)
                  : resolve(devolucions);
          });
      });
}

devolucionSchema.statics.getbyId = (id) => {
    return new Promise((resolve, reject) => {
        if (!_.isString(id))
            return reject(new TypeError('Id is not a valid string.'));

        Devolucion
          .findById(id)
          .exec((err, devolucion) => {
              err ? reject(err)
                  : resolve(devolucion);
          });
    });
}

devolucionSchema.statics.createDevolucion = (devolucion) => {
    return new Promise((resolve, reject) => {
      if (!_.isObject(devolucion))
          return reject(new TypeError('Devolucion is not a valid object.'));
      
      let _devolucion = new Devolucion(devolucion);
      _devolucion.save((err, saved) => {
        err ? reject(err)
            : resolve(saved);
      });
    });
}

devolucionSchema.statics.deleteDevolucion = (id) => {
    return new Promise((resolve, reject) => {
        if (!_.isString(id))
            return reject(new TypeError('Id is not a valid string.'));

        Devolucion
          .findByIdAndRemove(id)
          .exec((err, deleted) => {
              err ? reject(err)
                  : resolve();
          });
    });
}

const Devolucion  = mongoose.model('Devolucion', devolucionSchema);

module.exports = Devolucion;
