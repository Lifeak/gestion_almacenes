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
var controlcalidad_service_1 = require('../../services/controlcalidad/controlcalidad-service');
var isloggedin_1 = require('../../services/isloggedin');
var ControlListCmp = (function () {
    function ControlListCmp(_controlService, _userService, _loginService, router, routeParams) {
        this._controlService = _controlService;
        this._userService = _userService;
        this._loginService = _loginService;
        this.router = router;
        this.controles = [];
        this._selectedId = routeParams.get('id');
    }
    ControlListCmp.prototype.ngOnInit = function () {
        this._getAll();
    };
    ControlListCmp.prototype._getAll = function () {
        var _this = this;
        this._controlService
            .getAll()
            .subscribe(function (controles) {
            _this.controles = controles;
        });
    };
    ControlListCmp.prototype.isSelected = function (control) {
        return control._id === this._selectedId;
    };
    ControlListCmp.prototype.onSelect = function (control) {
        this.router.navigate(['DetailsControlCalidad', { id: control._id }]);
    };
    ControlListCmp.prototype.compras = function () {
        this.router.navigate(['/Compras']);
    };
    ControlListCmp.prototype.ventas = function () {
        this.router.navigate(['/Ventas']);
    };
    ControlListCmp.prototype.goalmacen = function () {
        this.router.navigate(['/Almacen']);
    };
    ControlListCmp.prototype.admin = function () {
        this.router.navigate(['/Admin']);
    };
    ControlListCmp.prototype.logout = function () {
        this._loginService.logout();
        this.router.navigate(['/Login']);
    };
    ControlListCmp.prototype.gproductos = function () {
        this.router.navigate(['/ListProductos']);
    };
    ControlListCmp.prototype.gpiezas = function () {
        this.router.navigate(['/ListPiezas']);
    };
    ControlListCmp.prototype.gmodelos = function () {
        this.router.navigate(['/ListModelos']);
    };
    ControlListCmp.prototype.gproveedores = function () {
        this.router.navigate(['/ListProveedores']);
    };
    ControlListCmp.prototype.ggarantias = function () {
        this.router.navigate(['/ListGarantias']);
    };
    ControlListCmp.prototype.galmacenes = function () {
        this.router.navigate(['/ListAlmacenes']);
    };
    ControlListCmp.prototype.gclientes = function () {
        this.router.navigate(['/ListClientes']);
    };
    ControlListCmp.prototype.gventas = function () {
        this.router.navigate(['/ListVentas']);
    };
    ControlListCmp.prototype.gdevoluciones = function () {
        this.router.navigate(['/ListDevoluciones']);
    };
    ControlListCmp.prototype.ggarantiasp = function () {
        this.router.navigate(['/ListGarantiaP']);
    };
    ControlListCmp.prototype.gsegsalidas = function () {
        this.router.navigate(['/ListSegSalidas']);
    };
    ControlListCmp.prototype.gcontrolcalidad = function () {
        this.router.navigate(['/ListControlCalidad']);
    };
    ControlListCmp.prototype.greparaciones = function () {
        this.router.navigate(['/ListReparaciones']);
    };
    ControlListCmp.prototype.gpedidocompras = function () {
        this.router.navigate(['/ListCompras']);
    };
    ControlListCmp.prototype.gusuarios = function () {
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
    ControlListCmp.prototype.getProfile = function (name) {
        var _this = this;
        this._userService
            .getProfile(name)
            .subscribe(function (user) {
            _this.profile = user[0]._id;
            _this.router.navigate(['Perfil', { id: _this.profile }]);
        });
    };
    ControlListCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/controlcalidad/templates/list.html',
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [controlcalidad_service_1.ControlService, login_service_1.LoginService, user_service_1.UserService]
        }),
        router_1.CanActivate(function () { return isloggedin_1.isLogged(); }), 
        __metadata('design:paramtypes', [controlcalidad_service_1.ControlService, user_service_1.UserService, login_service_1.LoginService, router_1.Router, router_1.RouteParams])
    ], ControlListCmp);
    return ControlListCmp;
}());
exports.ControlListCmp = ControlListCmp;
