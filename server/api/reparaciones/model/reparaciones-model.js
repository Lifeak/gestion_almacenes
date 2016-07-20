"use strict";

const mongoose = require('mongoose');

const _reparacionesSchema = {
	numincidencia: {type: String, required: true},
    idproducto: {type: String, required: true},
    estado: {type: String, required: true},
    fechacambio: {type: Date},
    observaciones: {type: String}
}

module.exports = mongoose.Schema(_reparacionesSchema);
