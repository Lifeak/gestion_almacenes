"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const piezaSchema = require('../model/pieza-model');
const _ = require('lodash');


piezaSchema.statics.getAll = () => {
    return new Promise((resolve, reject) => {
        let _query = {};

        pieza
          .find(_query)
          .exec((err, piezas) => {
              err ? reject(err)
                  : resolve(piezas);
          });
      });
}
/* Se podrá utilizar para la busqueda
piezaSchema.statics.getLogin = (pieza, pass) => {
  let _query = pieza.findOne({pieza:pieza, pass:pass});
   return new Promise((resolve, reject) => {
    console.log(pieza,pass);
    pieza
      .find(_query)
      .exec((err, usuario) => {
              err ? reject(err)
                  : resolve(usuario);
          });

   });
   console.log("usuario "+usuario)
}*/

piezaSchema.statics.getbyId = (id) => {
    return new Promise((resolve, reject) => {
        if (!_.isString(id))
            return reject(new TypeError('Id is not a valid string.'));

        pieza
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
      
      let _pieza = new pieza(pieza);
      _pieza.save((err, saved) => {
        err ? reject(err)
            : resolve(saved);
      });
    });
}

piezaSchema.statics.deletePieza = (id) => {
    return new Promise((resolve, reject) => {
        if (!_.isString(id))
            return reject(new TypeError('Id is not a valid string.'));

        pieza
          .findByIdAndRemove(id)
          .exec((err, deleted) => {
              err ? reject(err)
                  : resolve();
          });
    });
}

const pieza  = mongoose.model('pieza', piezaSchema);

module.exports = Pieza;
