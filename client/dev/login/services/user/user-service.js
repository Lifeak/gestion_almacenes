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
var User = (function () {
    function User(user, pass, nombre, apellido, tipo, _id) {
        this.user = user;
        this.pass = pass;
        this.nombre = nombre;
        this.apellido = apellido;
        this.tipo = tipo;
        this._id = _id;
    }
    return User;
}());
exports.User = User;
var UserService = (function () {
    function UserService(_http) {
        this._http = _http;
    }
    UserService.prototype.gotoIndex = function () {
        return this._http
            .get(UserService.ENDPOINT.replace(':id', ''))
            .map(function (r) { return r.json(); });
    };
    UserService.prototype.getAll = function () {
        return this._http
            .get(UserService.ENDPOINT.replace(':id', ''))
            .map(function (r) { return r.json(); });
    };
    UserService.prototype.getUserId = function (id) {
        return this._http
            .get(UserService.ENDPOINT.replace(':id', id))
            .map(function (r) { return r.json(); });
    };
    UserService.prototype.getProfile = function (user) {
        return this._http
            .get(UserService.ENDP.replace(':user', user))
            .map(function (r) { return r.json(); });
    };
    UserService.prototype.add = function (user, pass, nombre, apellido, tipo) {
        var body = JSON.stringify({ user: user, pass: pass, nombre: nombre, apellido: apellido, tipo: tipo });
        //alert("body" + body);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this._http
            .post(UserService.ENDPOINT.replace(':id', ''), body, { headers: headers })
            .map(function (r) { return r.json(); });
    };
    UserService.prototype.remove = function (id) {
        return this._http
            .delete(UserService.ENDPOINT.replace(':id', id));
    };
    UserService.ENDPOINT = '/api/user/:id';
    UserService.ENDP = '/api/user/profile/:user';
    UserService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(http_1.Http)), 
        __metadata('design:paramtypes', [http_1.Http])
    ], UserService);
    return UserService;
}());
exports.UserService = UserService;
