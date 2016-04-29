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
var Modelo = (function () {
    function Modelo(_id, nombre, refinterna, caracteristicas, modeloDe, compuestoPor, unidades) {
        this._id = _id;
        this.nombre = nombre;
        this.refinterna = refinterna;
        this.caracteristicas = caracteristicas;
        this.modeloDe = modeloDe;
        this.compuestoPor = compuestoPor;
        this.unidades = unidades;
    }
    return Modelo;
}());
exports.Modelo = Modelo;
var ModeloService = (function () {
    function ModeloService(_http) {
        this._http = _http;
    }
    ModeloService.prototype.getAll = function () {
        return this._http
            .get(ModeloService.ENDPOINT.replace(':id', ''))
            .map(function (r) { return r.json(); });
    };
    ModeloService.prototype.gotoIndex = function () {
        return this._http
            .get(ModeloService.ENDPOINT.replace(':id', ''))
            .map(function (r) { return r.json(); });
    };
    ModeloService.prototype.getModeloId = function (id) {
        return this._http
            .get(ModeloService.ENDPOINT.replace(':id', id))
            .map(function (r) { return r.json(); });
    };
    ModeloService.prototype.getModeloName = function (nombre) {
        //alert("al service le llega " + nombre);
        return this._http
            .get(ModeloService.ENDPOINT2.replace(':nombre', nombre))
            .map(function (r) { return r.json(); });
    };
    ModeloService.prototype.add = function (nombre, refinterna, caracteristicas, modeloDe, compuestoPor, unidades) {
        var body = JSON.stringify({ nombre: nombre, refinterna: refinterna, caracteristicas: caracteristicas, modeloDe: modeloDe, compuestoPor: compuestoPor, unidades: unidades });
        alert("body" + body);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this._http
            .post(ModeloService.ENDPOINT.replace(':id', ''), body, { headers: headers })
            .map(function (r) { return r.json(); });
    };
    ModeloService.prototype.remove = function (id) {
        return this._http
            .delete(ModeloService.ENDPOINT.replace(':id', id));
    };
    ModeloService.ENDPOINT = '/api/modelo/:id';
    ModeloService.ENDPOINT2 = '/api/modelo/details/:nombre';
    ModeloService = __decorate([
        __param(0, core_1.Inject(http_1.Http)), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ModeloService);
    return ModeloService;
}());
exports.ModeloService = ModeloService;
