"use strict";

const mongoose = require('mongoose');
const _ventasSchema = require('../../ventas/dao/ventas-dao');

const _devolucionSchema = {
    idventa: {type: mongoose.Schema.ObjectId, ref: 'ventas', required: true},
    tipoDevolucion: {type: String, required: true},
    fechaEntrada: {type: Date, required: true},
    devuelto:[{
    	modelo: {type: String, required: true},
    	numserie: {type: String, required: true}
    	//Si se quisiera array, deberiamos cambiar la forma de añadir los productos a devolver
    	}]
}

var ventas = mongoose.model('ventas',_devolucionSchema);
module.exports = mongoose.Schema(_devolucionSchema);

