"use strict";

const mongoose = require('mongoose');

const _controlcalidadSchema = {
    albaran: {type: String, required: true},
    udsEntregadas: {type:Number, required:true},
    udsRevisadas: {type: Number, required: true},
    noconformes: {type: Number},
    revisionfin: {type: String, required: true, default:false},
    pctnoconf: {type: Number},
    noconformesfin: {type: Number},
    udsConformes: {type: Number},
    LCI: {type: Number},
    LC: {type: Number},
    LCS: {type: Number}
}

module.exports = mongoose.Schema(_controlcalidadSchema);
