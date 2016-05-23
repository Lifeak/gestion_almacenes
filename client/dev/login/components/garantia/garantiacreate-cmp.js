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
var common_1 = require('angular2/common');
var router_1 = require('angular2/router');
var login_service_1 = require('../../services/login-service');
var isloggedin_1 = require('../../services/isloggedin');
var garantia_service_1 = require('../../services/garantia/garantia-service');
var GarantiaCreateCmp = (function () {
    function GarantiaCreateCmp(fb, router, _routeParams, _garantiaService, _loginService) {
        this.router = router;
        this._routeParams = _routeParams;
        this._garantiaService = _garantiaService;
        this._loginService = _loginService;
        this.garantiaForm = fb.group({
            "_id": ["", common_1.Validators.required],
            "tiempo": ["", common_1.Validators.required]
        });
    }
    GarantiaCreateCmp.prototype.gotoIndex = function () {
        var garantiaId = this.garantia ? this.garantia._id : null;
        this.router.navigate(['/ListGarantias']);
    };
    GarantiaCreateCmp.prototype.goBack = function () {
        window.history.back();
    };
    GarantiaCreateCmp.prototype.save = function (datos) {
        var _this = this;
        var _id = this.garantiaForm.controls['_id'].value;
        var tiempo = this.garantiaForm.controls['tiempo'].value;
        this._garantiaService
            .add(_id, tiempo)
            .subscribe(function (m) {
            _this.garantiaForm.controls['_id'].updateValue("");
            _this.garantiaForm.controls['tiempo'].updateValue("");
        });
        this.gotoIndex();
    };
    GarantiaCreateCmp.prototype.compras = function () {
        this.router.navigate(['/Compras']);
    };
    GarantiaCreateCmp.prototype.ventas = function () {
        this.router.navigate(['/Ventas']);
    };
    GarantiaCreateCmp.prototype.goalmacen = function () {
        this.router.navigate(['/Almacen']);
    };
    GarantiaCreateCmp.prototype.admin = function () {
        this.router.navigate(['/Admin']);
    };
    GarantiaCreateCmp.prototype.logout = function () {
        this._loginService.logout();
        this.router.navigate(['/Login']);
    };
    GarantiaCreateCmp.prototype.almacenes = function () {
        this.router.navigate(['/ListAlmacenes']);
    };
    GarantiaCreateCmp.prototype.usuarios = function () {
        this.router.navigate(['/ListUsuarios']);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', garantia_service_1.Garantia)
    ], GarantiaCreateCmp.prototype, "garantia", void 0);
    GarantiaCreateCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/garantia/templates/create.html'
        }),
        router_1.CanActivate(function () { return isloggedin_1.isLogged(); }),
        __param(0, core_1.Inject(common_1.FormBuilder)), 
        __metadata('design:paramtypes', [common_1.FormBuilder, router_1.Router, router_1.RouteParams, garantia_service_1.GarantiaService, login_service_1.LoginService])
    ], GarantiaCreateCmp);
    return GarantiaCreateCmp;
}());
exports.GarantiaCreateCmp = GarantiaCreateCmp;
