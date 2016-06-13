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
var proveedor_service_1 = require('../../services/proveedor/proveedor-service');
var isloggedin_1 = require('../../services/isloggedin');
var login_service_1 = require('../../services/login-service');
var user_service_1 = require('../../services/user/user-service');
var ProveedorListCmp = (function () {
    function ProveedorListCmp(_proveedorService, _loginService, _userService, router, routeParams) {
        this._proveedorService = _proveedorService;
        this._loginService = _loginService;
        this._userService = _userService;
        this.router = router;
        this.proveedors = [];
        this._selectedId = routeParams.get('id');
    }
    ProveedorListCmp.prototype.ngOnInit = function () {
        this._getAll();
    };
    ProveedorListCmp.prototype._getAll = function () {
        var _this = this;
        this._proveedorService
            .getAll()
            .subscribe(function (proveedores) {
            _this.proveedors = proveedores;
        });
    };
    ProveedorListCmp.prototype.isSelected = function (proveedor) {
        return proveedor._id === this._selectedId;
    };
    ProveedorListCmp.prototype.onSelect = function (proveedor) {
        this.router.navigate(['DetailsProveedor', { id: proveedor._id }]);
    };
    ProveedorListCmp.prototype.gproductos = function () {
        this.router.navigate(['/ListProductos']);
    };
    ProveedorListCmp.prototype.gpiezas = function () {
        this.router.navigate(['/ListPiezas']);
    };
    ProveedorListCmp.prototype.gmodelos = function () {
        this.router.navigate(['/ListModelos']);
    };
    ProveedorListCmp.prototype.gproveedores = function () {
        this.router.navigate(['/ListProveedores']);
    };
    ProveedorListCmp.prototype.gusuarios = function () {
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
    ProveedorListCmp.prototype.getProfile = function (name) {
        var _this = this;
        this._userService
            .getProfile(name)
            .subscribe(function (user) {
            _this.profile = user[0]._id;
            _this.router.navigate(['Perfil', { id: _this.profile }]);
        });
    };
    ProveedorListCmp.prototype.ggarantias = function () {
        this.router.navigate(['/ListGarantias']);
    };
    ProveedorListCmp.prototype.galmacenes = function () {
        this.router.navigate(['/ListAlmacenes']);
    };
    ProveedorListCmp.prototype.gclientes = function () {
        this.router.navigate(['/ListClientes']);
    };
    ProveedorListCmp.prototype.logout = function () {
        this._loginService.logout();
        this.router.navigate(['/Login']);
    };
    ProveedorListCmp.prototype.compras = function () {
        this.router.navigate(['/Compras']);
    };
    ProveedorListCmp.prototype.ventas = function () {
        this.router.navigate(['/Ventas']);
    };
    ProveedorListCmp.prototype.almacen = function () {
        this.router.navigate(['/Almacen']);
    };
    ProveedorListCmp.prototype.admin = function () {
        this.router.navigate(['/Admin']);
    };
    ProveedorListCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/proveedor/templates/list.html',
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [proveedor_service_1.ProveedorService, login_service_1.LoginService, user_service_1.UserService]
        }),
        router_1.CanActivate(function () { return isloggedin_1.isLogged(); }), 
        __metadata('design:paramtypes', [proveedor_service_1.ProveedorService, login_service_1.LoginService, user_service_1.UserService, router_1.Router, router_1.RouteParams])
    ], ProveedorListCmp);
    return ProveedorListCmp;
}());
exports.ProveedorListCmp = ProveedorListCmp;
