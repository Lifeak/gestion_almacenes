"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const almacenSchema = require('../model/almacen-model');
const _ = require('lodash');


almacenSchema.statics.getAll = () => {
    return new Promise((resolve, reject) => {
        let _query = {};

        Almacen
          .find(_query)
          .exec((err, almacens) => {
              err ? reject(err)
                  : resolve(almacens);
          });
      });
}

almacenSchema.statics.getbyId = (id) => {
    return new Promise((resolve, reject) => {
        if (!_.isString(id))
            return reject(new TypeError('Id is not a valid string.'));

        Almacen
          .findById(id)
          .exec((err, almacen) => {
              err ? reject(err)
                  : resolve(almacen);
          });
    });
}

almacenSchema.statics.createAlmacen = (almacen) => {
    return new Promise((resolve, reject) => {
      if (!_.isObject(almacen))
          return reject(new TypeError('Almacen is not a valid object.'));
      
      let _almacen = new Almacen(almacen);
      _almacen
      .save((err, saved) => {
        err ? reject(err)
            : resolve(saved);
      });
    });
}

almacenSchema.statics.deleteAlmacen = (id) => {
    return new Promise((resolve, reject) => {
        if (!_.isString(id))
            return reject(new TypeError('Id is not a valid string.'));

        Almacen
          .findByIdAndRemove(id)
          .exec((err, deleted) => {
              err ? reject(err)
                  : resolve();
          });
    });
}

const Almacen  = mongoose.model('Almacen', almacenSchema);

module.exports = Almacen;
