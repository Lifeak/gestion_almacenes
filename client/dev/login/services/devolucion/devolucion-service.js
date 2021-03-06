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
var Devolucion = (function () {
    function Devolucion(_id, idventa, tipoDevolucion, fechaEntrada, devuelto) {
        this._id = _id;
        this.idventa = idventa;
        this.tipoDevolucion = tipoDevolucion;
        this.fechaEntrada = fechaEntrada;
        this.devuelto = devuelto;
    }
    return Devolucion;
}());
exports.Devolucion = Devolucion;
var DevolucionService = (function () {
    function DevolucionService(_http) {
        this._http = _http;
    }
    DevolucionService.prototype.gotoIndex = function () {
        return this._http
            .get(DevolucionService.ENDPOINT.replace(':id', ''))
            .map(function (r) { return r.json(); });
    };
    DevolucionService.prototype.getAll = function () {
        return this._http
            .get(DevolucionService.ENDPOINT.replace(':id', ''))
            .map(function (r) { return r.json(); });
    };
    DevolucionService.prototype.getAllPopulate = function () {
        return this._http
            .get(DevolucionService.ENDPOINT4.replace(':id', ''))
            .map(function (r) { return r.json(); });
    };
    DevolucionService.prototype.getDevolucionID = function (id) {
        return this._http
            .get(DevolucionService.ENDPOINT.replace(':id', id))
            .map(function (r) { return r.json(); });
    };
    DevolucionService.prototype.getModelos = function () {
        return this._http
            .get(DevolucionService.ENDPOINT2)
            .map(function (r) { return r.json(); });
    };
    DevolucionService.prototype.getVentas = function () {
        return this._http
            .get(DevolucionService.ENDPOINT3)
            .map(function (r) { return r.json(); });
    };
    DevolucionService.prototype.add = function (idventa, tipoDevolucion, fechaEntrada, devuelto) {
        var body = JSON.stringify({ idventa: idventa, tipoDevolucion: tipoDevolucion, fechaEntrada: fechaEntrada, devuelto: devuelto });
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this._http
            .post(DevolucionService.ENDPOINT.replace(':id', ''), body, { headers: headers })
            .map(function (r) { return r.json(); });
    };
    DevolucionService.prototype.remove = function (id) {
        return this._http
            .delete(DevolucionService.ENDPOINT.replace(':id', id));
    };
    DevolucionService.ENDPOINT = '/api/devolucion/:id';
    DevolucionService.ENDPOINT2 = '/api/dm/modelos';
    DevolucionService.ENDPOINT3 = '/api/dv/ventas';
    DevolucionService.ENDPOINT4 = '/api/devpop/populate';
    DevolucionService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(http_1.Http)), 
        __metadata('design:paramtypes', [http_1.Http])
    ], DevolucionService);
    return DevolucionService;
}());
exports.DevolucionService = DevolucionService;
