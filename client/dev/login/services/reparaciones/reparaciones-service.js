"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('angular2/core');
var http_1 = require('angular2/http');
require('rxjs/add/operator/map');
var Reparacion = (function () {
    function Reparacion(_id, numincidencia, idproducto, estado, fechacambio, observaciones) {
        this._id = _id;
        this.numincidencia = numincidencia;
        this.idproducto = idproducto;
        this.estado = estado;
        this.fechacambio = fechacambio;
        this.observaciones = observaciones;
    }
    return Reparacion;
}());
exports.Reparacion = Reparacion;
var ReparacionService = (function () {
    function ReparacionService(_http) {
        this._http = _http;
    }
    ReparacionService.prototype.gotoIndex = function () {
        return this._http
            .get(ReparacionService.ENDPOINT.replace(':id', ''))
            .map(function (r) { return r.json(); });
    };
    ReparacionService.prototype.getAll = function () {
        return this._http
            .get(ReparacionService.ENDPOINT.replace(':id', ''))
            .map(function (r) { return r.json(); });
    };
    ReparacionService.prototype.getReparacionId = function (id) {
        return this._http
            .get(ReparacionService.ENDPOINT.replace(':id', id))
            .map(function (r) { return r.json(); });
    };
    ReparacionService.prototype.add = function (numincidencia, idproducto, estado, fechacambio, observaciones) {
        var body = JSON.stringify({ numincidencia: numincidencia, idproducto: idproducto, estado: estado, fechacambio: fechacambio, observaciones: observaciones });
        alert("la peticion es-->" + body);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this._http
            .post(ReparacionService.ENDPOINT.replace(':id', ''), body, { headers: headers })
            .map(function (r) { return r.json(); });
    };
    ReparacionService.prototype.remove = function (id) {
        return this._http
            .delete(ReparacionService.ENDPOINT.replace(':id', id));
    };
    ReparacionService.ENDPOINT = '/api/reparacion/:id';
    ReparacionService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(http_1.Http)), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ReparacionService);
    return ReparacionService;
}());
exports.ReparacionService = ReparacionService;
