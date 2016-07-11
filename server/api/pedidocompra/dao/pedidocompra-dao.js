"use strict";

const mongoose = require('mongoose');
const Promise = require('bluebird');
const pedidocompraSchema = require('../model/pedidocompra-model');
const lineapedidoSchema = require('../model/pedidocompra-model');
const _ = require('lodash');


pedidocompraSchema.statics.getAll = () => {
    return new Promise((resolve, reject) => {
        let _query = {};

        Pedidocompra
          .find(_query)
          .exec((err, pedidocompras) => {
              err ? reject(err)
                  : resolve(pedidocompras);
          });
      });
}

pedidocompraSchema.statics.getbyId = (id) => {
    return new Promise((resolve, reject) => {
        if (!_.isString(id))
            return reject(new TypeError('Id is not a valid string.'));

        Pedidocompra
          .findById(id)
          .exec((err, pedidocompra) => {
              err ? reject(err)
                  : resolve(pedidocompra);
          });
    });
}

pedidocompraSchema.statics.createPedidocompra = (pedidocompra) => {
    return new Promise((resolve, reject) => {
      if (!_.isObject(pedidocompra))
          return reject(new TypeError('Pedidocompra is not a valid object.'));
      
      let _pedidocompra = new Pedidocompra(pedidocompra);
      _pedidocompra.save((err, saved) => {
        err ? reject(err)
            : resolve(saved);
      });
    });
}

pedidocompraSchema.statics.updatePedidocompra = (id,modelo, entrega) => {
    console.log("entro en la funcion del dao");
    return new Promise((resolve, reject) => {
      console.log("antes de las asignaciones.....");
      console.log("antes del update el id a modificar es "+id+ " del modelo "+modelo+" y la entrega es "+JSON.stringify(entrega));

      let _query= {"productos.modelo": modelo,
                      "_id": {
                          "$oid": id
                      }};
      let update= {"$push":{ "almacen":"Pamplona"}};
Pedidocompra.findOneAndUpdate(
    { "productos.modelo": modelo,
                      "_id":id},
    { 
      "$set": {
          "almacen": "Pamplona",

      }
    }, 
    { "new": false, "upsert": false },
    function(err,doc,raw) {
console.log("err"+err);
console.log("doc"+doc);
console.log("raw"+raw);

    }
);
        /* Pedidocompra
          .findAndModify(_query,update)
          .exec((err, pedidocompra) => {
              err ? reject(err)
                  : resolve(pedidocompra);
          });
 
      
        
(
            query: {"productos.modelo": modelo,
                      "_id": {
                          "$oid": id
                      }},
                update: {"$push":{ "entregas":entrega}},
                upsert: false
          )
          .exec((err, pedidocompra) => {
              err ? reject(err)
                  : resolve(pedidocompra);
          });
          console.log("fin consulta");
      /*FindAndModify
      {
        "findAndModify": "pedidocompras",
        "query": {"productos.modelo": "Modelo2",
              "_id": {
                  "$oid": "577b77f43d7c821c0afb410c"
              }},
        "sort": {},
        "update": {"$push":{ "entregas":{"udsEntregadas":2, "albaran":2}}},
        "new": false,
        "fields": {},
        "upsert": false
      }
      */
    });
    console.log("la promise dice "+resolve+" y "+reject);
}

pedidocompraSchema.statics.deletePedidocompra = (id) => {
    return new Promise((resolve, reject) => {
        if (!_.isString(id))
            return reject(new TypeError('Id is not a valid string.'));

        Pedidocompra
          .findByIdAndRemove(id)
          .exec((err, deleted) => {
              err ? reject(err)
                  : resolve();
          });
    });
}

const Pedidocompra  = mongoose.model('Pedidocompra', pedidocompraSchema);

module.exports = Pedidocompra;
