"use strict";

const mongoose = require('mongoose');

const _modeloSchema = {
    nombre: {type: String, required: true},
    refinterna: {type: String, required: true},
    caracteristicas: {type: String},
    modeloDe: {type: String, required: true},
    compuestoPor: {type: Array},
    unidades:{type:Array}
}

module.exports = mongoose.Schema(_modeloSchema);
