"use strict";

const mongoose = require('mongoose');
const venta = require('../../ventas/model/ventas-model');

const _segundasalidaSchema = {
    idventa: {type: Schema.Type.ObjectId, ref:'venta', required: true},
    fechaSalida: {type: Date, required: true},
    finGarantia: {type: Date, required: true},
    salidas: {[
    	modelo: {type: String, required: true},
    	numserie: {type: Array, required:true}
    	]}
}

module.exports = mongoose.Schema(_segundasalidaSchema);
