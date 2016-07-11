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
var Pedidocompra = (function () {
    function Pedidocompra(_id, fechapedido, almacen, proveedor, productos) {
        this._id = _id;
        this.fechapedido = fechapedido;
        this.almacen = almacen;
        this.proveedor = proveedor;
        this.productos = productos;
    }
    return Pedidocompra;
}());
exports.Pedidocompra = Pedidocompra;
var ComprasService = (function () {
    function ComprasService(_http) {
        this._http = _http;
    }
    ComprasService.prototype.gotoIndex = function () {
        return this._http
            .get(ComprasService.ENDPOINT.replace(':id', ''))
            .map(function (r) { return r.json(); });
    };
    ComprasService.prototype.getAll = function () {
        return this._http
            .get(ComprasService.ENDPOINT.replace(':id', ''))
            .map(function (r) { return r.json(); });
    };
    ComprasService.prototype.getPedidoCompraID = function (id) {
        return this._http
            .get(ComprasService.ENDPOINT.replace(':id', id))
            .map(function (r) { return r.json(); });
    };
    ComprasService.prototype.getModelos = function () {
        return this._http
            .get(ComprasService.ENDPOINT2)
            .map(function (r) { return r.json(); });
    };
    ComprasService.prototype.getProveedores = function () {
        return this._http
            .get(ComprasService.ENDPOINT4)
            .map(function (r) { return r.json(); });
    };
    ComprasService.prototype.getAlmacenes = function () {
        return this._http
            .get(ComprasService.ENDPOINT3)
            .map(function (r) { return r.json(); });
    };
    ComprasService.prototype.add = function (fechapedido, almacen, proveedor, productos) {
        var body = JSON.stringify({ fechapedido: fechapedido, almacen: almacen, proveedor: proveedor, productos: productos });
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this._http
            .post(ComprasService.ENDPOINT.replace(':id', ''), body, { headers: headers })
            .map(function (r) { return r.json(); });
    };
    ComprasService.prototype.remove = function (id) {
        return this._http
            .delete(ComprasService.ENDPOINT.replace(':id', id));
    };
    ComprasService.ENDPOINT = '/api/pedidocompra/:id';
    ComprasService.ENDPOINT2 = '/api/pedido/modelos';
    ComprasService.ENDPOINT3 = '/api/pedid/almacen';
    ComprasService.ENDPOINT4 = '/api/ped/proveedor';
    ComprasService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(http_1.Http)), 
        __metadata('design:paramtypes', [http_1.Http])
    ], ComprasService);
    return ComprasService;
}());
exports.ComprasService = ComprasService;
