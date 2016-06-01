"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const segsalidaSchema = require('../model/segundsalida-model');
const _ = require('lodash');


segsalidaSchema.statics.getAll = () => {
    return new Promise((resolve, reject) => {
        let _query = {};

        SegSalida
          .find(_query)
          .exec((err, segsalidas) => {
              err ? reject(err)
                  : resolve(segsalidas);
          });
      });
}

segsalidaSchema.statics.getbyId = (id) => {
    return new Promise((resolve, reject) => {
        if (!_.isString(id))
            return reject(new TypeError('Id is not a valid string.'));

        SegSalida
          .findById(id)
          .exec((err, segsalida) => {
              err ? reject(err)
                  : resolve(segsalida);
          });
    });
}

segsalidaSchema.statics.createSegundasalida = (segsalida) => {
    return new Promise((resolve, reject) => {
      if (!_.isObject(segsalida))
          return reject(new TypeError('segsalida is not a valid object.'));
      
      let _segsalida = new SegSalida(segsalida);
      _segsalida.save((err, saved) => {
        err ? reject(err)
            : resolve(saved);
      });
    });
}

segsalidaSchema.statics.deleteSegundasalida = (id) => {
    return new Promise((resolve, reject) => {
        if (!_.isString(id))
            return reject(new TypeError('Id is not a valid string.'));

        SegSalida
          .findByIdAndRemove(id)
          .exec((err, deleted) => {
              err ? reject(err)
                  : resolve();
          });
    });
}

const SegSalida  = mongoose.model('SegSalida', segsalidaSchema);

module.exports = SegSalida;
