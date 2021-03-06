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
var pieza_service_1 = require('../../services/pieza/pieza-service');
var user_service_1 = require('../../services/user/user-service');
var isloggedin_1 = require('../../services/isloggedin');
var PiezaListCmp = (function () {
    function PiezaListCmp(_piezaService, _loginService, _userService, router, routeParams) {
        this._piezaService = _piezaService;
        this._loginService = _loginService;
        this._userService = _userService;
        this.router = router;
        this.piezas = [];
        this._selectedId = routeParams.get('id');
    }
    PiezaListCmp.prototype.ngOnInit = function () {
        this._getAll();
    };
    PiezaListCmp.prototype._getAll = function () {
        var _this = this;
        this._piezaService
            .getAll()
            .subscribe(function (piezas) {
            _this.piezas = piezas;
        });
    };
    PiezaListCmp.prototype.isSelected = function (pieza) {
        return pieza._id === this._selectedId;
    };
    PiezaListCmp.prototype.onSelect = function (pieza) {
        this.router.navigate(['DetailsPieza', { id: pieza._id }]);
    };
    PiezaListCmp.prototype.logout = function () {
        this._loginService.logout();
        this.router.navigate(['/Login']);
    };
    PiezaListCmp.prototype.compras = function () {
        this.router.navigate(['/Compras']);
    };
    PiezaListCmp.prototype.ventas = function () {
        this.router.navigate(['/Ventas']);
    };
    PiezaListCmp.prototype.almacen = function () {
        this.router.navigate(['/Almacen']);
    };
    PiezaListCmp.prototype.admin = function () {
        this.router.navigate(['/Admin']);
    };
    PiezaListCmp.prototype.gproductos = function () {
        this.router.navigate(['/ListProductos']);
    };
    PiezaListCmp.prototype.gpiezas = function () {
        this.router.navigate(['/ListPiezas']);
    };
    PiezaListCmp.prototype.gmodelos = function () {
        this.router.navigate(['/ListModelos']);
    };
    PiezaListCmp.prototype.gproveedores = function () {
        this.router.navigate(['/ListProveedores']);
    };
    PiezaListCmp.prototype.ggarantias = function () {
        this.router.navigate(['/ListGarantias']);
    };
    PiezaListCmp.prototype.galmacenes = function () {
        this.router.navigate(['/ListAlmacenes']);
    };
    PiezaListCmp.prototype.gclientes = function () {
        this.router.navigate(['/ListClientes']);
    };
    PiezaListCmp.prototype.gventas = function () {
        this.router.navigate(['/ListVentas']);
    };
    PiezaListCmp.prototype.gdevoluciones = function () {
        this.router.navigate(['/ListDevoluciones']);
    };
    PiezaListCmp.prototype.ggarantiasp = function () {
        this.router.navigate(['/ListGarantiaP']);
    };
    PiezaListCmp.prototype.gsegsalidas = function () {
        this.router.navigate(['/ListSegSalidas']);
    };
    PiezaListCmp.prototype.gcontrolcalidad = function () {
        this.router.navigate(['/ListControlCalidad']);
    };
    PiezaListCmp.prototype.greparaciones = function () {
        this.router.navigate(['/ListReparaciones']);
    };
    PiezaListCmp.prototype.gpedidocompras = function () {
        this.router.navigate(['/ListCompras']);
    };
    PiezaListCmp.prototype.gtransportes = function () {
        this.router.navigate(['/ListTransportes']);
    };
    PiezaListCmp.prototype.gusuarios = function () {
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
    PiezaListCmp.prototype.getProfile = function (name) {
        var _this = this;
        this._userService
            .getProfile(name)
            .subscribe(function (user) {
            _this.profile = user[0]._id;
            _this.router.navigate(['Perfil', { id: _this.profile }]);
        });
    };
    PiezaListCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/pieza/templates/list.html',
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [pieza_service_1.PiezaService, login_service_1.LoginService, user_service_1.UserService]
        }),
        router_1.CanActivate(function () { return isloggedin_1.isLogged(); }), 
        __metadata('design:paramtypes', [pieza_service_1.PiezaService, login_service_1.LoginService, user_service_1.UserService, router_1.Router, router_1.RouteParams])
    ], PiezaListCmp);
    return PiezaListCmp;
}());
exports.PiezaListCmp = PiezaListCmp;
