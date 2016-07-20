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
var isloggedin_1 = require('../../services/isloggedin');
var login_service_1 = require('../../services/login-service');
var garantiapieza_service_1 = require('../../services/garantiapieza/garantiapieza-service');
var user_service_1 = require('../../services/user/user-service');
var GarantiapCreateCmp = (function () {
    function GarantiapCreateCmp(fb, router, _loginService, _userService, _routeParams, _garantiapService) {
        this.router = router;
        this._loginService = _loginService;
        this._userService = _userService;
        this._routeParams = _routeParams;
        this._garantiapService = _garantiapService;
        this.garantiasp = [];
        this.garantiapForm = fb.group({
            "idp": ["", common_1.Validators.required],
            "fingarantia": ["", common_1.Validators.required]
        });
    }
    GarantiapCreateCmp.prototype.gotoIndex = function () {
        this.router.navigate(['/ListGarantiaP']);
    };
    GarantiapCreateCmp.prototype.goBack = function () {
        window.history.back();
    };
    GarantiapCreateCmp.prototype.save = function (datos) {
        var _this = this;
        var idp = this.garantiapForm.controls['idp'].value;
        var fingarantia = this.garantiapForm.controls['fingarantia'].value;
        this._garantiapService
            .add(idp, fingarantia)
            .subscribe(function (m) {
            _this.garantiapForm.controls['idp'].updateValue("");
            _this.garantiapForm.controls['fingarantia'].updateValue("");
        });
        this.gotoIndex();
    };
    GarantiapCreateCmp.prototype.logout = function () {
        this._loginService.logout();
        this.router.navigate(['/Login']);
    };
    GarantiapCreateCmp.prototype.compras = function () {
        this.router.navigate(['/Compras']);
    };
    GarantiapCreateCmp.prototype.ventas = function () {
        this.router.navigate(['/Ventas']);
    };
    GarantiapCreateCmp.prototype.almacen = function () {
        this.router.navigate(['/Almacen']);
    };
    GarantiapCreateCmp.prototype.admin = function () {
        this.router.navigate(['/Admin']);
    };
    GarantiapCreateCmp.prototype.gproductos = function () {
        this.router.navigate(['/ListProductos']);
    };
    GarantiapCreateCmp.prototype.gpiezas = function () {
        this.router.navigate(['/ListPiezas']);
    };
    GarantiapCreateCmp.prototype.gmodelos = function () {
        this.router.navigate(['/ListModelos']);
    };
    GarantiapCreateCmp.prototype.gproveedores = function () {
        this.router.navigate(['/ListProveedores']);
    };
    GarantiapCreateCmp.prototype.gusuarios = function () {
        if (localStorage.getItem(this.token) == "encargado") {
            var u = localStorage.key(1);
            if (u == "undefined") {
                var o = localStorage.key(0);
                this.getProfile(o);
            }
            else {
                this.getProfile(u);
            }
        }
        else {
            this.router.navigate(['/ListUsuarios']);
        }
    };
    GarantiapCreateCmp.prototype.getProfile = function (name) {
        var _this = this;
        this._userService
            .getProfile(name)
            .subscribe(function (user) {
            _this.profile = user[0]._id;
            _this.router.navigate(['Perfil', { id: _this.profile }]);
        });
    };
    GarantiapCreateCmp.prototype.ggarantias = function () {
        this.router.navigate(['/ListGarantias']);
    };
    GarantiapCreateCmp.prototype.galmacenes = function () {
        this.router.navigate(['/ListAlmacenes']);
    };
    GarantiapCreateCmp.prototype.gclientes = function () {
        this.router.navigate(['/ListClientes']);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', garantiapieza_service_1.Garantiapieza)
    ], GarantiapCreateCmp.prototype, "garantiap", void 0);
    GarantiapCreateCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/garantiapieza/templates/create.html',
            providers: [login_service_1.LoginService, user_service_1.UserService, garantiapieza_service_1.GarantiapService]
        }),
        router_1.CanActivate(function () { return isloggedin_1.isLogged(); }),
        __param(0, core_1.Inject(common_1.FormBuilder)), 
        __metadata('design:paramtypes', [common_1.FormBuilder, router_1.Router, login_service_1.LoginService, user_service_1.UserService, router_1.RouteParams, garantiapieza_service_1.GarantiapService])
    ], GarantiapCreateCmp);
    return GarantiapCreateCmp;
}());
exports.GarantiapCreateCmp = GarantiapCreateCmp;
