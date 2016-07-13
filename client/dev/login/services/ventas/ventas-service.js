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
var Venta = (function () {
    function Venta(_id, cliente, direccionEnvio, ciudad, pais, numPedido, fechaSalida, finGarantia, transporte, agente, observaciones, lineaventa) {
        this._id = _id;
        this.cliente = cliente;
        this.direccionEnvio = direccionEnvio;
        this.ciudad = ciudad;
        this.pais = pais;
        this.numPedido = numPedido;
        this.fechaSalida = fechaSalida;
        this.finGarantia = finGarantia;
        this.transporte = transporte;
        this.agente = agente;
        this.observaciones = observaciones;
        this.lineaventa = lineaventa;
    }
    return Venta;
}());
exports.Venta = Venta;
var VentasService = (function () {
    function VentasService(_http) {
        this._http = _http;
    }
    VentasService.prototype.getAll = function () {
        return this._http
            .get(VentasService.ENDPOINT.replace(':id', ''))
            .map(function (r) { return r.json(); });
    };
    VentasService.prototype.gotoIndex = function () {
        return this._http
            .get(VentasService.ENDPOINT.replace(':id', ''))
            .map(function (r) { return r.json(); });
    };
    VentasService.prototype.getVentaId = function (id) {
        return this._http
            .get(VentasService.ENDPOINT.replace(':id', id))
            .map(function (r) { return r.json(); });
    };
    VentasService.prototype.getModelos = function () {
        return this._http
            .get(VentasService.ENDPOINT2)
            .map(function (r) { return r.json(); });
    };
    VentasService.prototype.getGarantiaPais = function () {
        return this._http
            .get(VentasService.ENDPOINT3)
            .map(function (r) { return r.json(); });
    };
    VentasService.prototype.add = function (cliente, direccionEnvio, ciudad, pais, numPedido, fechaSalida, finGarantia, transporte, agente, observaciones, lineaventa) {
        var body = JSON.stringify({ cliente: cliente, direccionEnvio: direccionEnvio, ciudad: ciudad, pais: pais, numPedido: numPedido, fechaSalida: fechaSalida, finGarantia: finGarantia, transporte: transporte, agente: agente, observaciones: observaciones, lineaventa: lineaventa });
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this._http
            .post(VentasService.ENDPOINT.replace(':id', ''), body, { headers: headers })
            .map(function (r) { return r.json(); });
    };
    VentasService.prototype.remove = function (id) {
        return this._http
            .delete(VentasService.ENDPOINT.replace(':id', id));
    };
    VentasService.ENDPOINT = '/api/venta/:id';
    VentasService.ENDPOINT2 = '/api/pv/modelos';
    VentasService.ENDPOINT3 = '/api/pvgp/garantias';
    VentasService = __decorate([
        __param(0, core_1.Inject(http_1.Http)), 
        __metadata('design:paramtypes', [http_1.Http])
    ], VentasService);
    return VentasService;
}());
exports.VentasService = VentasService;
