"use strict";

const mongoose = require('mongoose');

const _almacenSchema = {
    nombre: {type: String, required: true},
    direccion: {type: String, required: true},
    ciudad: {type: String, required: true},
    pais: {type: String, required: true},
    telefono: {type: String, required: true},
    encargado: {type: String, required:true}
}

module.exports = mongoose.Schema(_almacenSchema);
