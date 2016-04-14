"use strict";

const mongoose = require('mongoose');

const _proveedorSchema = {
    nombre: {type: String, required: true},
    direccion: {type: String, required: true},
    ciudad: {type: String, required: true},
    pais: {type: String, required: true},
    telefono: {type: String, required: true},
    materiales: [{
		pieza: {type: String, required: true},
		coste: {type: Number},
		valoracion: {type: String}
    }]
}

module.exports = mongoose.Schema(_proveedorSchema);
