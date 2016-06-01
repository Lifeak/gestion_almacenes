"use strict";

const mongoose = require('mongoose');

const _garantiaSchema = {
	// _id será el nombre del Pais, que actuará
	// como identificador del documento
    _id: {type: String, required: true, unique:true},
    tiempo: {type: Number, required: true}
}

module.exports = mongoose.Schema(_garantiaSchema);
