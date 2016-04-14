"use strict";

const mongoose = require('mongoose');

const _ventaSchema = {
    cliente: {type: String, required: true},
    direccionEnvio: {type: String, required: true},
    ciudad: {type: String, required: true},
    pais: {type: String, required: true},
    numPedido: {type: String, required: true},
    fechaSalida: {type:Date},
    finGarantia: {type:Date},
    observaciones: {type: String},
    lineaventa:[{
    	modelo: {type:String, required: true},
    	unidades: {type: Number, required: true},
    	tipoOperacion: {type: String, required: true},
    	numSerie: {type: Array}
    }]

}

module.exports = mongoose.Schema(_ventaSchema);
