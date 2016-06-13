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
var Producto = (function () {
    function Producto(_id, nombre, modelo, estado, caracteristicas, almacen, vendido, compuestoPor, precio) {
        this._id = _id;
        this.nombre = nombre;
        this.modelo = modelo;
        this.estado = estado;
        this.caracteristicas = caracteristicas;
        this.almacen = almacen;
        this.vendido = vendido;
        this.compuestoPor = compuestoPor;
        this.precio = precio;
    }
    return Producto;
}());
exports.Producto = Producto;
var ProductoService = (function () {
    function ProductoService(_http) {
        this._http = _http;
    }
    ProductoService.prototype.getAll = function () {
        return this._http
            .get(ProductoService.ENDPOINT.replace(':id', ''))
            .map(function (r) { return r.json(); });
    };
    ProductoService.prototype.gotoIndex = function () {
        return this._http
            .get(ProductoService.ENDPOINT.replace(':id', ''))
            .map(function (r) { return r.json(); });
    };
    ProductoService.prototype.getProductoId = function (id) {
        return this._http
            .get(ProductoService.ENDPOINT.replace(':id', id))
            .map(function (r) { return r.json(); });
    };
    ProductoService.prototype.getModelos = function () {
        return this._http
            .get(ProductoService.ENDPOINT3)
            .map(function (r) { return r.json(); });
    };
    ProductoService.prototype.getProductoName = function (nombre) {
        return this._http
            .get(ProductoService.ENDPOINT2.replace(':nombre', nombre))
            .map(function (r) { return r.json(); });
    };
    ProductoService.prototype.add = function (_id, nombre, modelo, estado, caracteristicas, almacen, vendido, compuestoPor, precio) {
        var body = JSON.stringify({ _id: _id, nombre: nombre, modelo: modelo, estado: estado, caracteristicas: caracteristicas, almacen: almacen, vendido: vendido, compuestoPor: compuestoPor, precio: precio });
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this._http
            .post(ProductoService.ENDPOINT.replace(':id', ''), body, { headers: headers })
            .map(function (r) { return r.json(); });
    };
    ProductoService.prototype.remove = function (id) {
        return this._http
            .delete(ProductoService.ENDPOINT.replace(':id', id));
    };
    ProductoService.ENDPOINT = '/api/producto/:id';
    ProductoService.ENDPOINT2 = '/api/producto/details/:nombre';
    ProductoService.ENDPOINT3 = '/api/pro/modelos';
    ProductoService = __decorate([
        __param(0, core_1.Inject(http_1.Http)), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ProductoService);
    return ProductoService;
}());
exports.ProductoService = ProductoService;
