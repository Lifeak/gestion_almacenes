"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const controlcalidadSchema = require('../model/controlcalidad-model');
const _ = require('lodash');


controlcalidadSchema.statics.getAll = () => {
    return new Promise((resolve, reject) => {
        let _query = {};

        Controlcalidad
          .find(_query)
          .exec((err, controles) => {
              err ? reject(err)
                  : resolve(controles);
          });
      });
}

controlcalidadSchema.statics.getbyId = (id) => {
    return new Promise((resolve, reject) => {
        if (!_.isString(id))
            return reject(new TypeError('Id is not a valid string.'));

        Controlcalidad
          .findById(id)
          .exec((err, control) => {
              err ? reject(err)
                  : resolve(control);
          });
    });
}

controlcalidadSchema.statics.createControlcalidad = (control) => {
    return new Promise((resolve, reject) => {
      if (!_.isObject(control))
          return reject(new TypeError('Controlcalidad is not a valid object.'));
      
      let _control = new Controlcalidad(control);
      _control.save((err, saved) => {
        err ? reject(err)
            : resolve(saved);
      });
    });
}

controlcalidadSchema.statics.deleteControlcalidad = (id) => {
    return new Promise((resolve, reject) => {
        if (!_.isString(id))
            return reject(new TypeError('Id is not a valid string.'));

        Controlcalidad
          .findByIdAndRemove(id)
          .exec((err, deleted) => {
              err ? reject(err)
                  : resolve();
          });
    });
}

const Controlcalidad  = mongoose.model('Controlcalidad', controlcalidadSchema);

module.exports = Controlcalidad;
