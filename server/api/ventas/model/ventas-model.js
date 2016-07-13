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
    transporte :{type: String, required:true},
    agente:{type: String},
    observaciones: {type: String},
    lineaventa:[{
    	modelo: {type:String},
    	unidades: {type: Number},
    	tipoOperacion: {type: String},
    	numSerie: {type: Array}
    }]

}

module.exports = mongoose.Schema(_ventaSchema);
