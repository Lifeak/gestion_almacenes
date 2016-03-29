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
var UserService = (function () {
    function UserService(_http) {
        this._http = _http;
    }
    UserService.prototype.getAll = function () {
        return this._http
            .get(UserService.ENDPOINT.replace(':id', ''))
            .map(function (r) { return r.json(); });
    };
    UserService.prototype.add = function (user, pass, nombre, apellido, tipo) {
        var _userStringified = JSON.stringify({ user: user });
        var _passStringified = JSON.stringify({ pass: pass });
        var _nombreStringified = JSON.stringify({ nombre: nombre });
        var _apellidotringified = JSON.stringify({ apellido: apellido });
        var _tipoStringified = JSON.stringify({ apellido: apellido });
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        // tiene que faltar : _passStringified, _nombreStringified, _apellidotringified, _tipoStringified,
        // para que reemplace todos los campos
        return this._http
            .post(UserService.ENDPOINT.replace(':id', ''), _userStringified, { headers: headers })
            .map(function (r) { return r.json(); });
    };
    UserService.prototype.remove = function (id) {
        return this._http
            .delete(UserService.ENDPOINT.replace(':id', id));
    };
    UserService.ENDPOINT = '/api/user/:id';
    UserService = __decorate([
        __param(0, core_1.Inject(http_1.Http)), 
        __metadata('design:paramtypes', [http_1.Http])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
