"use strict";

const mongoose = require('mongoose');

const _clienteSchema = {
	//_id será el DNI o NIF de cada cliente por el cual los identificaremos
    _id: {type: String, required: true},
    nombre: {type: String, required:true},
    direccion: {type: String, required:true},
    ciudad: {type: String, required:true},
    pais: {type: String, required:true},
    telefono1: {type: String, required: true},
    telefono2: {type: String},
    puestoTrabajo:{type: String},
    email: {type: String},
    detalles: {type: String}
}

module.exports = mongoose.Schema(_clienteSchema);
