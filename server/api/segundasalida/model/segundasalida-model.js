"use strict";

const mongoose = require('mongoose');
const _ventasSchema = require('../../ventas/dao/ventas-dao');

const _segundasalidaSchema = {
    idventa: {type: mongoose.Schema.ObjectId, ref:'venta', required: true},
    fechaSegSalida: {type: Date, required: true},
    finGarantia: {type: Date, required: true},
    observaciones: {type: String},
    salidas: [{
    	modelo:{type: String, required:true},
    	unidades:{type: Number, required:true},
    	numserie:{type: Array, required:true}
    	}]
}

var ventas = mongoose.model('venta',_segundasalidaSchema);
module.exports = mongoose.Schema(_segundasalidaSchema);
