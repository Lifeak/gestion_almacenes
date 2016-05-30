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
var Garantia = (function () {
    function Garantia(_id, tiempo) {
        this._id = _id;
        this.tiempo = tiempo;
    }
    return Garantia;
}());
exports.Garantia = Garantia;
var GarantiaService = (function () {
    function GarantiaService(_http) {
        this._http = _http;
    }
    GarantiaService.prototype.gotoIndex = function () {
        return this._http
            .get(GarantiaService.ENDPOINT.replace(':id', ''))
            .map(function (r) { return r.json(); });
    };
    GarantiaService.prototype.getAll = function () {
        return this._http
            .get(GarantiaService.ENDPOINT.replace(':id', ''))
            .map(function (r) { return r.json(); });
    };
    GarantiaService.prototype.getGarantiaId = function (id) {
        return this._http
            .get(GarantiaService.ENDPOINT.replace(':id', id))
            .map(function (r) { return r.json(); });
    };
    GarantiaService.prototype.add = function (_id, tiempo) {
        var body = JSON.stringify({ _id: _id, tiempo: tiempo });
        // alert("body" + body);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this._http
            .post(GarantiaService.ENDPOINT.replace(':id', ''), body, { headers: headers })
            .map(function (r) { return r.json(); });
    };
    GarantiaService.prototype.remove = function (id) {
        return this._http
            .delete(GarantiaService.ENDPOINT.replace(':id', id));
    };
    GarantiaService.ENDPOINT = '/api/garantia/:id';
    GarantiaService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(http_1.Http)), 
        __metadata('design:paramtypes', [http_1.Http])
    ], GarantiaService);
    return GarantiaService;
}());
exports.GarantiaService = GarantiaService;
