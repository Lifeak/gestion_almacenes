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
var router_1 = require('angular2/router');
var login_service_1 = require('../services/login-service');
var isloggedin_1 = require('../services/isloggedin');
var ComprasCmp = (function () {
    function ComprasCmp(_loginService, router) {
        this._loginService = _loginService;
        this.router = router;
        this.title = "Compras";
        this.logadmin = false;
        this.logadmin = isloggedin_1.isLoggedinAdmin();
    }
    ComprasCmp.prototype.logout = function () {
        alert("logoutt");
        this._loginService.logout();
        this.router.navigate(['/Login']);
        this.logadmin = false;
    };
    ComprasCmp.prototype.compras = function () {
        this.router.navigate(['/Compras']);
    };
    ComprasCmp.prototype.ventas = function () {
        this.router.navigate(['/Ventas']);
    };
    ComprasCmp.prototype.almacen = function () {
        this.router.navigate(['/Almacen']);
    };
    ComprasCmp.prototype.admin = function () {
        this.router.navigate(['/Admin']);
    };
    ComprasCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/login/templates/compras.html',
            providers: [login_service_1.LoginService]
        }),
        router_1.CanActivate(function () { return isloggedin_1.isLogged(); }),
        __param(0, core_1.Inject(login_service_1.LoginService)), 
        __metadata('design:paramtypes', [login_service_1.LoginService, router_1.Router])
    ], ComprasCmp);
    return ComprasCmp;
}());
exports.ComprasCmp = ComprasCmp;
