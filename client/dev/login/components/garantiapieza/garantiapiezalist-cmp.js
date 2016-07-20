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
var garantiapieza_service_1 = require('../../services/garantiapieza/garantiapieza-service');
var isloggedin_1 = require('../../services/isloggedin');
var login_service_1 = require('../../services/login-service');
var user_service_1 = require('../../services/user/user-service');
var GarantiapListCmp = (function () {
    function GarantiapListCmp(_garantiapService, _loginService, _userService, router, routeParams) {
        this._garantiapService = _garantiapService;
        this._loginService = _loginService;
        this._userService = _userService;
        this.router = router;
        this.garantiapieza = [];
        this._selectedId = routeParams.get('id');
    }
    GarantiapListCmp.prototype.ngOnInit = function () {
        this._getAll();
    };
    GarantiapListCmp.prototype._getAll = function () {
        var _this = this;
        this._garantiapService
            .getAll()
            .subscribe(function (garantia) {
            _this.garantiapieza = garantia;
        });
    };
    GarantiapListCmp.prototype.isSelected = function (garantiap) {
        return garantiap._id === this._selectedId;
    };
    GarantiapListCmp.prototype.onSelect = function (garantiap) {
        this.router.navigate(['DetailsGarantiaP', { id: garantiap._id }]);
    };
    GarantiapListCmp.prototype.gproductos = function () {
        this.router.navigate(['/ListProductos']);
    };
    GarantiapListCmp.prototype.gpiezas = function () {
        this.router.navigate(['/ListPiezas']);
    };
    GarantiapListCmp.prototype.gmodelos = function () {
        this.router.navigate(['/ListModelos']);
    };
    GarantiapListCmp.prototype.gproveedores = function () {
        this.router.navigate(['/ListProveedores']);
    };
    GarantiapListCmp.prototype.gusuarios = function () {
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
    GarantiapListCmp.prototype.getProfile = function (name) {
        var _this = this;
        this._userService
            .getProfile(name)
            .subscribe(function (user) {
            _this.profile = user[0]._id;
            _this.router.navigate(['Perfil', { id: _this.profile }]);
        });
    };
    GarantiapListCmp.prototype.ggarantias = function () {
        this.router.navigate(['/ListGarantias']);
    };
    GarantiapListCmp.prototype.galmacenes = function () {
        this.router.navigate(['/ListAlmacenes']);
    };
    GarantiapListCmp.prototype.gclientes = function () {
        this.router.navigate(['/ListClientes']);
    };
    GarantiapListCmp.prototype.gpedidocompra = function () {
        this.router.navigate(['/ListCompras']);
    };
    GarantiapListCmp.prototype.logout = function () {
        this._loginService.logout();
        this.router.navigate(['/Login']);
    };
    GarantiapListCmp.prototype.compras = function () {
        this.router.navigate(['/Compras']);
    };
    GarantiapListCmp.prototype.ventas = function () {
        this.router.navigate(['/Ventas']);
    };
    GarantiapListCmp.prototype.almacen = function () {
        this.router.navigate(['/Almacen']);
    };
    GarantiapListCmp.prototype.admin = function () {
        this.router.navigate(['/Admin']);
    };
    GarantiapListCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/garantiapieza/templates/list.html',
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [garantiapieza_service_1.GarantiapService, login_service_1.LoginService, user_service_1.UserService]
        }),
        router_1.CanActivate(function () { return isloggedin_1.isLogged(); }), 
        __metadata('design:paramtypes', [garantiapieza_service_1.GarantiapService, login_service_1.LoginService, user_service_1.UserService, router_1.Router, router_1.RouteParams])
    ], GarantiapListCmp);
    return GarantiapListCmp;
}());
exports.GarantiapListCmp = GarantiapListCmp;
