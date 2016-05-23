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
var core_1 = require('angular2/core');
var router_1 = require('angular2/router');
var login_service_1 = require('../../services/login-service');
var garantia_service_1 = require('../../services/garantia/garantia-service');
var isloggedin_1 = require('../../services/isloggedin');
var GarantiaListCmp = (function () {
    function GarantiaListCmp(_garantiaService, _loginService, router, routeParams) {
        this._garantiaService = _garantiaService;
        this._loginService = _loginService;
        this.router = router;
        this.garantias = [];
        this._selectedId = routeParams.get('id');
    }
    GarantiaListCmp.prototype.ngOnInit = function () {
        this._getAll();
    };
    GarantiaListCmp.prototype._getAll = function () {
        var _this = this;
        this._garantiaService
            .getAll()
            .subscribe(function (garantias) {
            _this.garantias = garantias;
        });
    };
    GarantiaListCmp.prototype.isSelected = function (garantia) {
        return garantia._id === this._selectedId;
    };
    GarantiaListCmp.prototype.onSelect = function (garantia) {
        this.router.navigate(['DetailsGarantia', { id: garantia._id }]);
    };
    GarantiaListCmp.prototype.compras = function () {
        this.router.navigate(['/Compras']);
    };
    GarantiaListCmp.prototype.ventas = function () {
        this.router.navigate(['/Ventas']);
    };
    GarantiaListCmp.prototype.almacen = function () {
        this.router.navigate(['/Almacen']);
    };
    GarantiaListCmp.prototype.admin = function () {
        this.router.navigate(['/Admin']);
    };
    GarantiaListCmp.prototype.logout = function () {
        this._loginService.logout();
        this.router.navigate(['/Login']);
    };
    GarantiaListCmp.prototype.almacenes = function () {
        this.router.navigate(['/ListAlmacenes']);
    };
    GarantiaListCmp.prototype.usuarios = function () {
        this.router.navigate(['/ListUsuarios']);
    };
    GarantiaListCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/garantia/templates/list.html',
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [garantia_service_1.GarantiaService]
        }),
        router_1.CanActivate(function () { return isloggedin_1.isLogged(); }), 
        __metadata('design:paramtypes', [garantia_service_1.GarantiaService, login_service_1.LoginService, router_1.Router, router_1.RouteParams])
    ], GarantiaListCmp);
    return GarantiaListCmp;
}());
exports.GarantiaListCmp = GarantiaListCmp;
