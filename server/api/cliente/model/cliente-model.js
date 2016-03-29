"use strict";

const mongoose = require('mongoose');

const _clienteSchema = {
    clienteMessage: {type: String, 
				required: true, 
				trim: true}
}

module.exports = mongoose.Schema(_clienteSchema);
