"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const modeloSchema = require('../model/modelo-model');
const _ = require('lodash');


modeloSchema.statics.getAll = () => {
    return new Promise((resolve, reject) => {
        let _query = {};

        Modelo
          .find(_query)
          .exec((err, modelos) => {
              err ? reject(err)
                  : resolve(modelos);
          });
      });
}

modeloSchema.statics.getbyId = (id) => {
    return new Promise((resolve, reject) => {
        if (!_.isString(id))
            return reject(new TypeError('Id is not a valid string.'));

        Modelo
          .findById(id)
          .exec((err, modelo) => {
              err ? reject(err)
                  : resolve(modelo);
          });
    });
}

modeloSchema.statics.getbyName = (nombre) => {
  
    return new Promise((resolve, reject) => {
        if (!_.isString(nombre))
            return reject(new TypeError('Nombre is not a valid string.'));
        let _query = Modelo.findOne({nombre:nombre});
        Modelo
          .find(_query)
          .exec((err, modelo) => {
              err ? reject(err)
                  : resolve(modelo);
          });
    });
}

modeloSchema.statics.getModelosDePieza = () =>{
  
  let pieza = "Pieza";
     return new Promise((resolve, reject) => {
        let _query = {modeloDe:pieza};
        Modelo
          .find(_query)
          .exec((err, modelos) => {
              err ? reject(err)
                  : resolve(modelos);
          });
      });  

}

modeloSchema.statics.getModelosDeProducto = () =>{
  
  let busq = "Producto";
     return new Promise((resolve, reject) => {
        let _query = {modeloDe:busq};
        Modelo
          .find(_query)
          .exec((err, modelos) => {
              err ? reject(err)
                  : resolve(modelos);
          });
      });  

}

modeloSchema.statics.createModelo = (modelo) => {
  
    return new Promise((resolve, reject) => {
      if (!_.isObject(modelo))
          return reject(new TypeError('modelo is not a valid object.'));
      
      let _modelo = new Modelo(modelo);
      _modelo.save((err, saved) => {
        err ? reject(err)
            : resolve(saved);
      });

    });
    
}

modeloSchema.statics.deleteModelo = (id) => {
    return new Promise((resolve, reject) => {
        if (!_.isString(id))
            return reject(new TypeError('Id is not a valid string.'));

        Modelo
          .findByIdAndRemove(id)
          .exec((err, deleted) => {
              err ? reject(err)
                  : resolve();
          });
    });
}

const Modelo  = mongoose.model('Modelo', modeloSchema);

module.exports = Modelo;
