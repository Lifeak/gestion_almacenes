"use strict";

const mongoose = require('mongoose');

const _reparacionesSchema = {
    idpieza: {type: String, required: true},
    estado: {type: String, required: true},
    //fechacambio: {type: Date, default: Date.now},
    fechacambio: {type: Date, required: true},
    observaciones: {type: String}
}

module.exports = mongoose.Schema(_reparacionesSchema);
