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
var user_service_1 = require('../services/user/user-service');
var isloggedin_1 = require('../services/isloggedin');
var VentasCmp = (function () {
    function VentasCmp(_loginService, _userService, router) {
        this._loginService = _loginService;
        this._userService = _userService;
        this.router = router;
        this.title = "Ventas";
        this.logadmin = false;
        this.logadmin = isloggedin_1.isLoggedinAdmin();
    }
    VentasCmp.prototype.logout = function () {
        this._loginService.logout();
        this.router.navigate(['/Login']);
        this.logadmin = false;
    };
    VentasCmp.prototype.compras = function () {
        this.router.navigate(['/Compras']);
    };
    VentasCmp.prototype.ventas = function () {
        this.router.navigate(['/Ventas']);
    };
    VentasCmp.prototype.almacen = function () {
        this.router.navigate(['/Almacen']);
    };
    VentasCmp.prototype.admin = function () {
        this.router.navigate(['/Admin']);
    };
    VentasCmp.prototype.gproductos = function () {
        this.router.navigate(['/ListProductos']);
    };
    VentasCmp.prototype.gpiezas = function () {
        this.router.navigate(['/ListPiezas']);
    };
    VentasCmp.prototype.gmodelos = function () {
        this.router.navigate(['/ListModelos']);
    };
    VentasCmp.prototype.gproveedores = function () {
        this.router.navigate(['/ListProveedores']);
    };
    VentasCmp.prototype.ggarantias = function () {
        this.router.navigate(['/ListGarantias']);
    };
    VentasCmp.prototype.galmacenes = function () {
        this.router.navigate(['/ListAlmacenes']);
    };
    VentasCmp.prototype.gclientes = function () {
        this.router.navigate(['/ListClientes']);
    };
    VentasCmp.prototype.gventas = function () {
        this.router.navigate(['/ListVentas']);
    };
    VentasCmp.prototype.gdevoluciones = function () {
        this.router.navigate(['/ListDevoluciones']);
    };
    VentasCmp.prototype.ggarantiasp = function () {
        this.router.navigate(['/ListGarantiaP']);
    };
    VentasCmp.prototype.gsegsalidas = function () {
        this.router.navigate(['/ListSegSalidas']);
    };
    VentasCmp.prototype.gcontrolcalidad = function () {
        this.router.navigate(['/ListControlCalidad']);
    };
    VentasCmp.prototype.greparaciones = function () {
        this.router.navigate(['/ListReparaciones']);
    };
    VentasCmp.prototype.gpedidocompras = function () {
        this.router.navigate(['/ListCompras']);
    };
    VentasCmp.prototype.gusuarios = function () {
        if (localStorage.getItem(this.token) == "encargado") {
            var u = localStorage.key(1);
            if (u == "undefined") {
                var e = localStorage.key(0);
                this.getProfile(e);
            }
            else {
                this.getProfile(u);
            }
        }
        else {
            this.router.navigate(['/ListUsuarios']);
        }
    };
    VentasCmp.prototype.getProfile = function (name) {
        var _this = this;
        this._userService
            .getProfile(name)
            .subscribe(function (user) {
            _this.profile = user[0]._id;
            _this.router.navigate(['Perfil', { id: _this.profile }]);
        });
    };
    VentasCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/login/templates/ventas.html',
            providers: [login_service_1.LoginService, user_service_1.UserService]
        }),
        router_1.CanActivate(function () { return isloggedin_1.isLogged(); }),
        __param(0, core_1.Inject(login_service_1.LoginService)), 
        __metadata('design:paramtypes', [login_service_1.LoginService, user_service_1.UserService, router_1.Router])
    ], VentasCmp);
    return VentasCmp;
}());
exports.VentasCmp = VentasCmp;
