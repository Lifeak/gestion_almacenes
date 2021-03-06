"use strict";

const mongoose = require('mongoose');

const _userSchema = {
    user: {type: String, required: true, trim: true},
    pass: {type: String, required: true},
    nombre: {type: String, required: true},
    apellido: {type: String, required: true},
    tipo: {type: String, required: true}
}

module.exports = mongoose.Schema(_userSchema);
