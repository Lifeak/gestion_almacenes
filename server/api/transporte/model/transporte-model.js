"use strict";

const mongoose = require('mongoose');

const _transporteSchema = {
    nombre: {type: String, required:true},
    direccion: {type: String, required:true},
    ciudad: {type: String, required:true},
    pais: {type: String, required:true},
    telefono: {type: String, required: true},
    email: {type: String, required:true},
    detalles: {type: String},
    valoracion: {type: String}
}

module.exports = mongoose.Schema(_transporteSchema);
