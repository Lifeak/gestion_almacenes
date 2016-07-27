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
var cliente_service_1 = require('../../services/cliente/cliente-service');
var login_service_1 = require('../../services/login-service');
var user_service_1 = require('../../services/user/user-service');
var ClienteListCmp = (function () {
    function ClienteListCmp(_clienteService, _userService, _loginService, router, routeParams) {
        this._clienteService = _clienteService;
        this._userService = _userService;
        this._loginService = _loginService;
        this.router = router;
        this.clientes = [];
        this._selectedId = routeParams.get('id');
    }
    ClienteListCmp.prototype.ngOnInit = function () {
        this._getAll();
    };
    ClienteListCmp.prototype._getAll = function () {
        var _this = this;
        this._clienteService
            .getAll()
            .subscribe(function (clientes) {
            _this.clientes = clientes;
        });
    };
    ClienteListCmp.prototype.isSelected = function (cliente) {
        return cliente._id === this._selectedId;
    };
    ClienteListCmp.prototype.onSelect = function (cliente) {
        this.router.navigate(['DetailsCliente', { id: cliente._id }]);
    };
    ClienteListCmp.prototype.logout = function () {
        this._loginService.logout();
        this.router.navigate(['/Login']);
    };
    ClienteListCmp.prototype.compras = function () {
        this.router.navigate(['/Compras']);
    };
    ClienteListCmp.prototype.ventas = function () {
        this.router.navigate(['/Ventas']);
    };
    ClienteListCmp.prototype.almacen = function () {
        this.router.navigate(['/Almacen']);
    };
    ClienteListCmp.prototype.admin = function () {
        this.router.navigate(['/Admin']);
    };
    ClienteListCmp.prototype.gusuarios = function () {
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
    ClienteListCmp.prototype.getProfile = function (name) {
        var _this = this;
        this._userService
            .getProfile(name)
            .subscribe(function (user) {
            _this.profile = user[0]._id;
            _this.router.navigate(['Perfil', { id: _this.profile }]);
        });
    };
    ClienteListCmp.prototype.gproductos = function () {
        this.router.navigate(['/ListProductos']);
    };
    ClienteListCmp.prototype.gpiezas = function () {
        this.router.navigate(['/ListPiezas']);
    };
    ClienteListCmp.prototype.gmodelos = function () {
        this.router.navigate(['/ListModelos']);
    };
    ClienteListCmp.prototype.gproveedores = function () {
        this.router.navigate(['/ListProveedores']);
    };
    ClienteListCmp.prototype.ggarantias = function () {
        this.router.navigate(['/ListGarantias']);
    };
    ClienteListCmp.prototype.galmacenes = function () {
        this.router.navigate(['/ListAlmacenes']);
    };
    ClienteListCmp.prototype.gclientes = function () {
        this.router.navigate(['/ListClientes']);
    };
    ClienteListCmp.prototype.gventas = function () {
        this.router.navigate(['/ListVentas']);
    };
    ClienteListCmp.prototype.gdevoluciones = function () {
        this.router.navigate(['/ListDevoluciones']);
    };
    ClienteListCmp.prototype.ggarantiasp = function () {
        this.router.navigate(['/ListGarantiaP']);
    };
    ClienteListCmp.prototype.gsegsalidas = function () {
        this.router.navigate(['/ListSegSalidas']);
    };
    ClienteListCmp.prototype.gcontrolcalidad = function () {
        this.router.navigate(['/ListControlCalidad']);
    };
    ClienteListCmp.prototype.greparaciones = function () {
        this.router.navigate(['/ListReparaciones']);
    };
    ClienteListCmp.prototype.gpedidocompras = function () {
        this.router.navigate(['/ListCompras']);
    };
    ClienteListCmp.prototype.gtransportes = function () {
        this.router.navigate(['/ListTransportes']);
    };
    ClienteListCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/cliente/templates/list.html',
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [cliente_service_1.ClienteService, login_service_1.LoginService, user_service_1.UserService]
        }),
        router_1.CanActivate(function () { return isloggedin_1.isLogged(); }), 
        __metadata('design:paramtypes', [cliente_service_1.ClienteService, user_service_1.UserService, login_service_1.LoginService, router_1.Router, router_1.RouteParams])
    ], ClienteListCmp);
    return ClienteListCmp;
}());
exports.ClienteListCmp = ClienteListCmp;
