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
var isloggedin_1 = require('../../services/isloggedin');
var ventas_service_1 = require('../../services/ventas/ventas-service');
var login_service_1 = require('../../services/login-service');
var user_service_1 = require('../../services/user/user-service');
var VentasListCmp = (function () {
    function VentasListCmp(_ventaService, _userService, _loginService, router, routeParams) {
        this._ventaService = _ventaService;
        this._userService = _userService;
        this._loginService = _loginService;
        this.router = router;
        this.venta = [];
        this._selectedId = routeParams.get('id');
    }
    VentasListCmp.prototype.ngOnInit = function () {
        this._getAll();
    };
    VentasListCmp.prototype._getAll = function () {
        var _this = this;
        this._ventaService
            .getAll()
            .subscribe(function (venta) {
            _this.venta = venta;
        });
    };
    VentasListCmp.prototype.isSelected = function (venta) {
        return venta._id === this._selectedId;
    };
    VentasListCmp.prototype.onSelect = function (venta) {
        this.router.navigate(['DetailsVenta', { id: venta._id }]);
    };
    VentasListCmp.prototype.logout = function () {
        this._loginService.logout();
        this.router.navigate(['/Login']);
    };
    VentasListCmp.prototype.compras = function () {
        this.router.navigate(['/Compras']);
    };
    VentasListCmp.prototype.ventas = function () {
        this.router.navigate(['/Ventas']);
    };
    VentasListCmp.prototype.almacen = function () {
        this.router.navigate(['/Almacen']);
    };
    VentasListCmp.prototype.admin = function () {
        this.router.navigate(['/Admin']);
    };
    VentasListCmp.prototype.gproductos = function () {
        this.router.navigate(['/ListProductos']);
    };
    VentasListCmp.prototype.gpiezas = function () {
        this.router.navigate(['/ListPiezas']);
    };
    VentasListCmp.prototype.gmodelos = function () {
        this.router.navigate(['/ListModelos']);
    };
    VentasListCmp.prototype.gproveedores = function () {
        this.router.navigate(['/ListProveedores']);
    };
    VentasListCmp.prototype.gusuarios = function () {
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
    VentasListCmp.prototype.getProfile = function (name) {
        var _this = this;
        this._userService
            .getProfile(name)
            .subscribe(function (user) {
            _this.profile = user[0]._id;
            _this.router.navigate(['Perfil', { id: _this.profile }]);
        });
    };
    VentasListCmp.prototype.ggarantias = function () {
        this.router.navigate(['/ListGarantias']);
    };
    VentasListCmp.prototype.galmacenes = function () {
        this.router.navigate(['/ListAlmacenes']);
    };
    VentasListCmp.prototype.gclientes = function () {
        this.router.navigate(['/ListClientes']);
    };
    VentasListCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/ventas/templates/list.html',
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [ventas_service_1.VentasService, login_service_1.LoginService, user_service_1.UserService]
        }),
        router_1.CanActivate(function () { return isloggedin_1.isLogged(); }), 
        __metadata('design:paramtypes', [ventas_service_1.VentasService, user_service_1.UserService, login_service_1.LoginService, router_1.Router, router_1.RouteParams])
    ], VentasListCmp);
    return VentasListCmp;
}());
exports.VentasListCmp = VentasListCmp;
