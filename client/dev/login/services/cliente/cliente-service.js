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
var Cliente = (function () {
    function Cliente(_id, nombre, direccion, ciudad, pais, telefono1, telefono2, puestoTrabajo, email, detalles) {
        this._id = _id;
        this.nombre = nombre;
        this.direccion = direccion;
        this.ciudad = ciudad;
        this.pais = pais;
        this.telefono1 = telefono1;
        this.telefono2 = telefono2;
        this.puestoTrabajo = puestoTrabajo;
        this.email = email;
        this.detalles = detalles;
    }
    return Cliente;
}());
exports.Cliente = Cliente;
var ClienteService = (function () {
    function ClienteService(_http) {
        this._http = _http;
    }
    ClienteService.prototype.getAll = function () {
        return this._http
            .get(ClienteService.ENDPOINT.replace(':id', ''))
            .map(function (r) { return r.json(); });
    };
    ClienteService.prototype.gotoIndex = function () {
        return this._http
            .get(ClienteService.ENDPOINT.replace(':id', ''))
            .map(function (r) { return r.json(); });
    };
    ClienteService.prototype.getClienteId = function (id) {
        return this._http
            .get(ClienteService.ENDPOINT.replace(':id', id))
            .map(function (r) { return r.json(); });
    };
    ClienteService.prototype.add = function (_id, nombre, direccion, ciudad, pais, telefono1, telefono2, puestoTrabajo, email, detalles) {
        var body = JSON.stringify({ _id: _id, nombre: nombre, direccion: direccion, ciudad: ciudad, pais: pais, telefono1: telefono1, telefono2: telefono2, puestoTrabajo: puestoTrabajo, email: email, detalles: detalles });
        alert("body" + body);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this._http
            .post(ClienteService.ENDPOINT.replace(':id', ''), body, { headers: headers })
            .map(function (r) { return r.json(); });
    };
    ClienteService.prototype.remove = function (id) {
        return this._http
            .delete(ClienteService.ENDPOINT.replace(':id', id));
    };
    ClienteService.ENDPOINT = '/api/cliente/:id';
    ClienteService = __decorate([
        __param(0, core_1.Inject(http_1.Http)), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ClienteService);
    return ClienteService;
}());
exports.ClienteService = ClienteService;
