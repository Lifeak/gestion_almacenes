"use strict";

const mongoose = require('mongoose');

const _modeloSchema = {
    nombre: {type: String, required: true},
    refinterna: {type: String, required: true},
    caracteristicas: {type: String, required: true},
    modeloDe: {type: String, required: true},
    compuestoPor: {type: Array,required:true},
    unidades:{type:Array,required:true}
}

module.exports = mongoose.Schema(_modeloSchema);
