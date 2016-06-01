"use strict";

const mongoose = require('mongoose');

const _productoSchema = {
    _id: {type: String, required: true, trim: true},
    nombre: {type: String, required: true},
    modelo: {type: String, required: true},
    estado: {type: String, required: true},
    caracteristicas: {type: String},
    almacen: {type: String, required: true},
    vendido: {type: Boolean, required:true},
    compuestoPor: {type: Array,required:true },
    precio: {type: Number}

}

module.exports = mongoose.Schema(_productoSchema);
