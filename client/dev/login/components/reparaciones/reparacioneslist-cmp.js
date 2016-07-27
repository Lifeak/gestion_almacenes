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
var user_service_1 = require('../../services/user/user-service');
var reparaciones_service_1 = require('../../services/reparaciones/reparaciones-service');
var isloggedin_1 = require('../../services/isloggedin');
var ReparacionListCmp = (function () {
    function ReparacionListCmp(_reparacionService, _userService, _loginService, router, routeParams) {
        this._reparacionService = _reparacionService;
        this._userService = _userService;
        this._loginService = _loginService;
        this.router = router;
        this.reparacions = [];
        this._selectedId = routeParams.get('id');
    }
    ReparacionListCmp.prototype.ngOnInit = function () {
        this._getAll();
    };
    ReparacionListCmp.prototype._getAll = function () {
        var _this = this;
        this._reparacionService
            .getAll()
            .subscribe(function (reparaciones) {
            _this.reparacions = reparaciones;
        });
    };
    ReparacionListCmp.prototype.isSelected = function (reparacion) {
        return reparacion._id === this._selectedId;
    };
    ReparacionListCmp.prototype.onSelect = function (reparacion) {
        this.router.navigate(['DetailsReparacion', { id: reparacion._id }]);
    };
    ReparacionListCmp.prototype.compras = function () {
        this.router.navigate(['/Compras']);
    };
    ReparacionListCmp.prototype.ventas = function () {
        this.router.navigate(['/Ventas']);
    };
    ReparacionListCmp.prototype.goalmacen = function () {
        this.router.navigate(['/Almacen']);
    };
    ReparacionListCmp.prototype.admin = function () {
        this.router.navigate(['/Admin']);
    };
    ReparacionListCmp.prototype.logout = function () {
        this._loginService.logout();
        this.router.navigate(['/Login']);
    };
    ReparacionListCmp.prototype.gproductos = function () {
        this.router.navigate(['/ListProductos']);
    };
    ReparacionListCmp.prototype.gpiezas = function () {
        this.router.navigate(['/ListPiezas']);
    };
    ReparacionListCmp.prototype.gmodelos = function () {
        this.router.navigate(['/ListModelos']);
    };
    ReparacionListCmp.prototype.gproveedores = function () {
        this.router.navigate(['/ListProveedores']);
    };
    ReparacionListCmp.prototype.ggarantias = function () {
        this.router.navigate(['/ListGarantias']);
    };
    ReparacionListCmp.prototype.galmacenes = function () {
        this.router.navigate(['/ListAlmacenes']);
    };
    ReparacionListCmp.prototype.gclientes = function () {
        this.router.navigate(['/ListClientes']);
    };
    ReparacionListCmp.prototype.gventas = function () {
        this.router.navigate(['/ListVentas']);
    };
    ReparacionListCmp.prototype.gdevoluciones = function () {
        this.router.navigate(['/ListDevoluciones']);
    };
    ReparacionListCmp.prototype.ggarantiasp = function () {
        this.router.navigate(['/ListGarantiaP']);
    };
    ReparacionListCmp.prototype.gsegsalidas = function () {
        this.router.navigate(['/ListSegSalidas']);
    };
    ReparacionListCmp.prototype.gcontrolcalidad = function () {
        this.router.navigate(['/ListControlCalidad']);
    };
    ReparacionListCmp.prototype.greparaciones = function () {
        this.router.navigate(['/ListReparaciones']);
    };
    ReparacionListCmp.prototype.gpedidocompras = function () {
        this.router.navigate(['/ListCompras']);
    };
    ReparacionListCmp.prototype.gtransportes = function () {
        this.router.navigate(['/ListTransportes']);
    };
    ReparacionListCmp.prototype.gusuarios = function () {
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
    ReparacionListCmp.prototype.getProfile = function (name) {
        var _this = this;
        this._userService
            .getProfile(name)
            .subscribe(function (user) {
            _this.profile = user[0]._id;
            _this.router.navigate(['Perfil', { id: _this.profile }]);
        });
    };
    ReparacionListCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/reparaciones/templates/list.html',
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [reparaciones_service_1.ReparacionService, login_service_1.LoginService, user_service_1.UserService]
        }),
        router_1.CanActivate(function () { return isloggedin_1.isLogged(); }), 
        __metadata('design:paramtypes', [reparaciones_service_1.ReparacionService, user_service_1.UserService, login_service_1.LoginService, router_1.Router, router_1.RouteParams])
    ], ReparacionListCmp);
    return ReparacionListCmp;
}());
exports.ReparacionListCmp = ReparacionListCmp;
