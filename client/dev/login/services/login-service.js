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
var LoginService = (function () {
    //user: string;
    function LoginService(_http) {
        this._http = _http;
        this.token = localStorage.getItem('jwt');
        //this.user = this.token && jwt_decode(this.token);
    }
    LoginService.prototype.login = function (user, pass) {
        var _this = this;
        var datos = JSON.stringify({ user: user, pass: pass });
        alert("user y pass");
        alert(datos);
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this._http
            .post(LoginService.ENDPOINT, datos, { headers: headers })
            .map(function (res) {
            var data = res.json();
            var dato = res;
            if (data.isEmpty()) {
                alert("existe");
                _this.token = data.token;
                localStorage.setItem('jwt', _this.token);
            }
            else {
                alert("no existeee");
            }
        });
    };
    LoginService.prototype.logout = function () {
        localStorage.removeItem('jwt');
        //this.router.parent.navigateByUrl('/login');
    };
    LoginService.ENDPOINT = '/auth/login';
    LoginService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(http_1.Http)), 
        __metadata('design:paramtypes', [http_1.Http])
    ], LoginService);
    return LoginService;
}());
exports.LoginService = LoginService;
