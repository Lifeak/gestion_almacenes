"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const piezaSchema = require('../model/pieza-model');
const _ = require('lodash');


piezaSchema.statics.getAll = () => {
    return new Promise((resolve, reject) => {
        let _query = {};

        Pieza
          .find(_query)
          .exec((err, piezas) => {
              err ? reject(err)
                  : resolve(piezas);
          });
      });
}

piezaSchema.statics.getbyId = (id) => {
    return new Promise((resolve, reject) => {
        if (!_.isString(id))
            return reject(new TypeError('Id is not a valid string.'));

        Pieza
          .findById(id)
          .exec((err, pieza) => {
              err ? reject(err)
                  : resolve(pieza);
          });
    });
}

piezaSchema.statics.createPieza = (pieza) => {
    return new Promise((resolve, reject) => {
      if (!_.isObject(pieza))
          return reject(new TypeError('pieza is not a valid object.'));
      
      let _pieza = new Pieza(pieza);
      _pieza.save((err, saved) => {
        err ? reject(err)
            : resolve(saved);
      });
    });
}


piezaSchema.statics.updatePieza = (pieza) => {

}

piezaSchema.statics.deletePieza = (id) => {
    return new Promise((resolve, reject) => {
        if (!_.isString(id))
            return reject(new TypeError('Id is not a valid string.'));

        Pieza
          .findByIdAndRemove(id)
          .exec((err, deleted) => {
              err ? reject(err)
                  : resolve();
          });
    });
}

const Pieza  = mongoose.model('pieza', piezaSchema);

module.exports = Pieza;
