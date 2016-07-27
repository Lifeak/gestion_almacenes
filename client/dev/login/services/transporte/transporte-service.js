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
var Transporte = (function () {
    function Transporte(_id, nombre, direccion, ciudad, pais, telefono, email, detalles, valoracion) {
        this._id = _id;
        this.nombre = nombre;
        this.direccion = direccion;
        this.ciudad = ciudad;
        this.pais = pais;
        this.telefono = telefono;
        this.email = email;
        this.detalles = detalles;
        this.valoracion = valoracion;
    }
    return Transporte;
}());
exports.Transporte = Transporte;
var TransporteService = (function () {
    function TransporteService(_http) {
        this._http = _http;
    }
    TransporteService.prototype.getAll = function () {
        return this._http
            .get(TransporteService.ENDPOINT.replace(':id', ''))
            .map(function (r) { return r.json(); });
    };
    TransporteService.prototype.getTransporteId = function (id) {
        return this._http
            .get(TransporteService.ENDPOINT.replace(':id', id))
            .map(function (r) { return r.json(); });
    };
    TransporteService.prototype.add = function (nombre, direccion, ciudad, pais, telefono, email, detalles, valoracion) {
        var body = JSON.stringify({ nombre: nombre, direccion: direccion, ciudad: ciudad, pais: pais, telefono: telefono, email: email, detalles: detalles, valoracion: valoracion });
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this._http
            .post(TransporteService.ENDPOINT.replace(':id', ''), body, { headers: headers })
            .map(function (r) { return r.json(); });
    };
    TransporteService.prototype.remove = function (id) {
        return this._http
            .delete(TransporteService.ENDPOINT.replace(':id', id));
    };
    TransporteService.ENDPOINT = '/api/transporte/:id';
    TransporteService = __decorate([
        __param(0, core_1.Inject(http_1.Http)), 
        __metadata('design:paramtypes', [http_1.Http])
    ], TransporteService);
    return TransporteService;
}());
exports.TransporteService = TransporteService;
