"use strict";

const mongoose = require('mongoose');

const _loteSchema = {
    _id: {type: String, required: true, trim: true},
    modelo: {type: String, required: true},
    pieza1: {type: String, required: true},
    pieza2: {type: String, required: true},
    pieza3: {type: String, required: true},
    pieza4: {type: String, required: true},
    pieza5: {type: String, required: true},
    pieza6: {type: String, required: true},
    pieza7: {type: String, required: true},
    pieza8: {type: String, required: true},
    pieza9: {type: String, required: true},
    pieza10: {type: String, required: true},
    pieza11: {type: String, required: true},
    pieza12: {type: String, required: true},
    pieza13: {type: String, required: true},
    pieza14: {type: String, required: true},
    pieza15: {type: String, required: true},
    pieza16: {type: String, required: true},
    pieza17: {type: String, required: true},
    pieza18: {type: String, required: true},
    pieza19: {type: String, required: true},
    pieza20: {type: String, required: true},
    pieza21: {type: String, required: true},
    pieza23: {type: String, required: true},
    pieza24: {type: String, required: true},
    pieza25: {type: String, required: true},
    pieza26: {type: String, required: true},
    pieza27: {type: String, required: true},
    precio28: {type: String, required: true}
}

module.exports = mongoose.Schema(_loteSchema);
