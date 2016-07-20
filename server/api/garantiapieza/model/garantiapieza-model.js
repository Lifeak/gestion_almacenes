"use strict";

const mongoose = require('mongoose');

const _garantiapSchema = {
	//idp sera el id de pieza o producto
    idp: {type: String, required: true},
    fingarantia: {type: Date}
}

module.exports = mongoose.Schema(_garantiapSchema);
