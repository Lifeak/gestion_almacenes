"use strict";

const mongoose = require('mongoose');

const _piezaSchema = {
    _id: {type: String, required: true, trim: true},
    modelo: {type: String, required: true},
    estado: {type: String, required: true},
    lote: {type: String, required: true},
    caracteristicas: {type: String},
    almacen: {type: String, required: true},
    almacenOrigen: {type: String, required:true}
    vendido: {type: Boolean, required:true},
    compuestoPor: {type: Array },
    precio: {type: Number}

}

module.exports = mongoose.Schema(_piezaSchema);
