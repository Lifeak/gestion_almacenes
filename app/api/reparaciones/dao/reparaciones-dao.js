"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const reparacionesSchema = require('../model/reparaciones-model');
const _ = require('lodash');


reparacionesSchema.statics.getAll = () => {
    return new Promise((resolve, reject) => {
        let _query = {};

        Reparacion
          .find(_query)
          .exec((err, reparaciones) => {
              err ? reject(err)
                  : resolve(reparaciones);
          });
      });
}

reparacionesSchema.statics.getbyId = (id) => {
    return new Promise((resolve, reject) => {
        if (!_.isString(id))
            return reject(new TypeError('Id is not a valid string.'));

        Reparacion
          .findById(id)
          .exec((err, reparacion) => {
              err ? reject(err)
                  : resolve(reparacion);
          });
    });
}

reparacionesSchema.statics.createReparacion = (reparacion) => {
    return new Promise((resolve, reject) => {
      if (!_.isObject(reparacion))
          return reject(new TypeError('Reparacion is not a valid object.'));
      
      let _reparacion = new Reparacion(reparacion);
      _reparacion.save((err, saved) => {
        err ? reject(err)
            : resolve(saved);
      });
    });
}

reparacionesSchema.statics.deleteReparacion = (id) => {
    return new Promise((resolve, reject) => {
        if (!_.isString(id))
            return reject(new TypeError('Id is not a valid string.'));

        Reparacion
          .findByIdAndRemove(id)
          .exec((err, deleted) => {
              err ? reject(err)
                  : resolve();
          });
    });
}

const Reparacion  = mongoose.model('Reparacion', reparacionesSchema);

module.exports = Reparacion;
