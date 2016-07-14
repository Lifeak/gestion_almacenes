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
var devolucion_service_1 = require('../../services/devolucion/devolucion-service');
var isloggedin_1 = require('../../services/isloggedin');
var login_service_1 = require('../../services/login-service');
var user_service_1 = require('../../services/user/user-service');
var DevolucionListCmp = (function () {
    function DevolucionListCmp(_devolucionService, _loginService, _userService, router, routeParams) {
        this._devolucionService = _devolucionService;
        this._loginService = _loginService;
        this._userService = _userService;
        this.router = router;
        this.devolucion = [];
        this._selectedId = routeParams.get('id');
    }
    DevolucionListCmp.prototype.ngOnInit = function () {
        this._getAllPopulate();
    };
    DevolucionListCmp.prototype._getAll = function () {
        var _this = this;
        this._devolucionService
            .getAll()
            .subscribe(function (devolucion) {
            _this.devolucion = devolucion;
        });
    };
    DevolucionListCmp.prototype._getAllPopulate = function () {
        var _this = this;
        this._devolucionService
            .getAllPopulate()
            .subscribe(function (devolucion) {
            _this.devolucion = devolucion;
            //alert("el listado de devoluciones son "+JSON.stringify(this.devolucion));
        });
    };
    DevolucionListCmp.prototype.isSelected = function (devolucion) {
        return devolucion._id === this._selectedId;
    };
    DevolucionListCmp.prototype.onSelect = function (devolucion) {
        this.router.navigate(['DetailsDevolucion', { id: devolucion._id }]);
    };
    DevolucionListCmp.prototype.gproductos = function () {
        this.router.navigate(['/ListProductos']);
    };
    DevolucionListCmp.prototype.gpiezas = function () {
        this.router.navigate(['/ListPiezas']);
    };
    DevolucionListCmp.prototype.gmodelos = function () {
        this.router.navigate(['/ListModelos']);
    };
    DevolucionListCmp.prototype.gproveedores = function () {
        this.router.navigate(['/ListProveedores']);
    };
    DevolucionListCmp.prototype.gusuarios = function () {
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
    DevolucionListCmp.prototype.getProfile = function (name) {
        var _this = this;
        this._userService
            .getProfile(name)
            .subscribe(function (user) {
            _this.profile = user[0]._id;
            _this.router.navigate(['Perfil', { id: _this.profile }]);
        });
    };
    DevolucionListCmp.prototype.ggarantias = function () {
        this.router.navigate(['/ListGarantias']);
    };
    DevolucionListCmp.prototype.galmacenes = function () {
        this.router.navigate(['/ListAlmacenes']);
    };
    DevolucionListCmp.prototype.gclientes = function () {
        this.router.navigate(['/ListClientes']);
    };
    DevolucionListCmp.prototype.gpedidocompra = function () {
        this.router.navigate(['/ListCompras']);
    };
    DevolucionListCmp.prototype.logout = function () {
        this._loginService.logout();
        this.router.navigate(['/Login']);
    };
    DevolucionListCmp.prototype.compras = function () {
        this.router.navigate(['/Compras']);
    };
    DevolucionListCmp.prototype.ventas = function () {
        this.router.navigate(['/Ventas']);
    };
    DevolucionListCmp.prototype.almacen = function () {
        this.router.navigate(['/Almacen']);
    };
    DevolucionListCmp.prototype.admin = function () {
        this.router.navigate(['/Admin']);
    };
    DevolucionListCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/devolucion/templates/list.html',
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [devolucion_service_1.DevolucionService, login_service_1.LoginService, user_service_1.UserService]
        }),
        router_1.CanActivate(function () { return isloggedin_1.isLogged(); }), 
        __metadata('design:paramtypes', [devolucion_service_1.DevolucionService, login_service_1.LoginService, user_service_1.UserService, router_1.Router, router_1.RouteParams])
    ], DevolucionListCmp);
    return DevolucionListCmp;
}());
exports.DevolucionListCmp = DevolucionListCmp;
