"use strict";

const mongoose = require('mongoose');
const venta = require('../../ventas/model/ventas-model');

const _devolucionSchema = {
    idventa: {type: Schema.Types.ObjectId, ref: 'venta', required: true},
    tipoDevolucion: {type: String, required: true},
    fechaEntrada: {type: Date, required: true},
    devuelto: {[
    	modelo: {type: String, required: true},
    	numserie: {type: Array}
    	]}
}

module.exports = mongoose.Schema(_devolucionSchema);
