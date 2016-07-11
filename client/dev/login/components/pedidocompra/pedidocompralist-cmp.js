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
var pedidocompra_service_1 = require('../../services/pedidocompra/pedidocompra-service');
var isloggedin_1 = require('../../services/isloggedin');
var login_service_1 = require('../../services/login-service');
var user_service_1 = require('../../services/user/user-service');
var ComprasListCmp = (function () {
    function ComprasListCmp(_comprasService, _loginService, _userService, router, routeParams) {
        this._comprasService = _comprasService;
        this._loginService = _loginService;
        this._userService = _userService;
        this.router = router;
        this.pedidocompras = [];
        this.completo = [];
        this._selectedId = routeParams.get('id');
    }
    ComprasListCmp.prototype.ngOnInit = function () {
        this._getAll();
    };
    ComprasListCmp.prototype._getAll = function () {
        var _this = this;
        this._comprasService
            .getAll()
            .subscribe(function (pedidos) {
            _this.pedidocompras = pedidos;
            //Buscamos dentro de cada pedido, si todos los productos pedidos han llegado en su totalidad a nuestros
            //almacenes. En tal caso, completo será true. Si alguno o ningun producto ha llegado será false.
            for (var i = 0; i < _this.pedidocompras.length; i++) {
                _this.completo[i] = true;
                for (var j = 0; j < _this.pedidocompras[i].productos.length; j++) {
                    if (_this.pedidocompras[i].productos[j].udsPendientes > 0) {
                        _this.completo[i] = false;
                    }
                }
            }
        });
    };
    ComprasListCmp.prototype.isSelected = function (pedidocompra) {
        return pedidocompra._id === this._selectedId;
    };
    ComprasListCmp.prototype.onSelect = function (pedidocompra) {
        this.router.navigate(['DetailsCompra', { id: pedidocompra._id }]);
    };
    ComprasListCmp.prototype.gproductos = function () {
        this.router.navigate(['/ListProductos']);
    };
    ComprasListCmp.prototype.gpiezas = function () {
        this.router.navigate(['/ListPiezas']);
    };
    ComprasListCmp.prototype.gmodelos = function () {
        this.router.navigate(['/ListModelos']);
    };
    ComprasListCmp.prototype.gproveedores = function () {
        this.router.navigate(['/ListProveedores']);
    };
    ComprasListCmp.prototype.gusuarios = function () {
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
    ComprasListCmp.prototype.getProfile = function (name) {
        var _this = this;
        this._userService
            .getProfile(name)
            .subscribe(function (user) {
            _this.profile = user[0]._id;
            _this.router.navigate(['Perfil', { id: _this.profile }]);
        });
    };
    ComprasListCmp.prototype.ggarantias = function () {
        this.router.navigate(['/ListGarantias']);
    };
    ComprasListCmp.prototype.galmacenes = function () {
        this.router.navigate(['/ListAlmacenes']);
    };
    ComprasListCmp.prototype.gclientes = function () {
        this.router.navigate(['/ListClientes']);
    };
    ComprasListCmp.prototype.gpedidocompra = function () {
        this.router.navigate(['/ListCompras']);
    };
    ComprasListCmp.prototype.logout = function () {
        this._loginService.logout();
        this.router.navigate(['/Login']);
    };
    ComprasListCmp.prototype.compras = function () {
        this.router.navigate(['/Compras']);
    };
    ComprasListCmp.prototype.ventas = function () {
        this.router.navigate(['/Ventas']);
    };
    ComprasListCmp.prototype.almacen = function () {
        this.router.navigate(['/Almacen']);
    };
    ComprasListCmp.prototype.admin = function () {
        this.router.navigate(['/Admin']);
    };
    ComprasListCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/pedidocompra/templates/list.html',
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [pedidocompra_service_1.ComprasService, login_service_1.LoginService, user_service_1.UserService]
        }),
        router_1.CanActivate(function () { return isloggedin_1.isLogged(); }), 
        __metadata('design:paramtypes', [pedidocompra_service_1.ComprasService, login_service_1.LoginService, user_service_1.UserService, router_1.Router, router_1.RouteParams])
    ], ComprasListCmp);
    return ComprasListCmp;
}());
exports.ComprasListCmp = ComprasListCmp;
