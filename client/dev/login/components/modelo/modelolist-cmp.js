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
var isloggedin_1 = require('../../services/isloggedin');
var modelo_service_1 = require('../../services/modelo/modelo-service');
var user_service_1 = require('../../services/user/user-service');
var ModeloListCmp = (function () {
    function ModeloListCmp(_modeloService, _loginService, _userService, router, routeParams) {
        this._modeloService = _modeloService;
        this._loginService = _loginService;
        this._userService = _userService;
        this.router = router;
        this.modelos = [];
        this._selectedId = routeParams.get('id');
    }
    ModeloListCmp.prototype.ngOnInit = function () {
        this._getAll();
    };
    ModeloListCmp.prototype._getAll = function () {
        var _this = this;
        this._modeloService
            .getAll()
            .subscribe(function (modelos) {
            _this.modelos = modelos;
        });
    };
    ModeloListCmp.prototype.isSelected = function (modelo) {
        return modelo._id === this._selectedId;
    };
    ModeloListCmp.prototype.onSelect = function (modelo) {
        this.router.navigate(['/DetailsModelo', { id: modelo._id }]);
    };
    ModeloListCmp.prototype.logout = function () {
        this._loginService.logout();
        this.router.navigate(['/Login']);
    };
    ModeloListCmp.prototype.compras = function () {
        this.router.navigate(['/Compras']);
    };
    ModeloListCmp.prototype.ventas = function () {
        this.router.navigate(['/Ventas']);
    };
    ModeloListCmp.prototype.almacen = function () {
        this.router.navigate(['/Almacen']);
    };
    ModeloListCmp.prototype.admin = function () {
        this.router.navigate(['/Admin']);
    };
    ModeloListCmp.prototype.gusuarios = function () {
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
    ModeloListCmp.prototype.getProfile = function (name) {
        var _this = this;
        this._userService
            .getProfile(name)
            .subscribe(function (user) {
            _this.profile = user[0]._id;
            _this.router.navigate(['Perfil', { id: _this.profile }]);
        });
    };
    ModeloListCmp.prototype.gproductos = function () {
        this.router.navigate(['/ListProductos']);
    };
    ModeloListCmp.prototype.gpiezas = function () {
        this.router.navigate(['/ListPiezas']);
    };
    ModeloListCmp.prototype.gmodelos = function () {
        this.router.navigate(['/ListModelos']);
    };
    ModeloListCmp.prototype.gproveedores = function () {
        this.router.navigate(['/ListProveedores']);
    };
    ModeloListCmp.prototype.ggarantias = function () {
        this.router.navigate(['/ListGarantias']);
    };
    ModeloListCmp.prototype.galmacenes = function () {
        this.router.navigate(['/ListAlmacenes']);
    };
    ModeloListCmp.prototype.gclientes = function () {
        this.router.navigate(['/ListClientes']);
    };
    ModeloListCmp.prototype.gventas = function () {
        this.router.navigate(['/ListVentas']);
    };
    ModeloListCmp.prototype.gdevoluciones = function () {
        this.router.navigate(['/ListDevoluciones']);
    };
    ModeloListCmp.prototype.ggarantiasp = function () {
        this.router.navigate(['/ListGarantiaP']);
    };
    ModeloListCmp.prototype.gsegsalidas = function () {
        this.router.navigate(['/ListSegSalidas']);
    };
    ModeloListCmp.prototype.gcontrolcalidad = function () {
        this.router.navigate(['/ListControlCalidad']);
    };
    ModeloListCmp.prototype.greparaciones = function () {
        this.router.navigate(['/ListReparaciones']);
    };
    ModeloListCmp.prototype.gpedidocompras = function () {
        this.router.navigate(['/ListCompras']);
    };
    ModeloListCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/modelo/templates/list.html',
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [modelo_service_1.ModeloService, login_service_1.LoginService, user_service_1.UserService]
        }),
        router_1.CanActivate(function () { return isloggedin_1.isLogged(); }), 
        __metadata('design:paramtypes', [modelo_service_1.ModeloService, login_service_1.LoginService, user_service_1.UserService, router_1.Router, router_1.RouteParams])
    ], ModeloListCmp);
    return ModeloListCmp;
}());
exports.ModeloListCmp = ModeloListCmp;
