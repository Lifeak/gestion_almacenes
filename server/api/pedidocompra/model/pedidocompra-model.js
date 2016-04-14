"use strict";

const mongoose = require('mongoose');

const _pedidocompraSchema = {
    fechapedido: {type: Date, required: true},
    almacen: {type: String, required: true},
    proveedor: {type: String, required: true},
    productos: [{
    	modelo:{type: String, required: true},
    	udsPedidas:{type: Number, required: true},
    	udsPendientes:{type: Number},
    	entregas:[{
    		udsEntregadas:{type: Number},
    		fechaEntrega:{type: Date},
    		albaran:{type: String}
    	}]
    }]
    
}

module.exports = mongoose.Schema(_pedidocompraSchema);
