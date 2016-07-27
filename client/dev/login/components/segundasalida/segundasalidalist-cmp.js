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
var segundasalida_service_1 = require('../../services/segundasalida/segundasalida-service');
var isloggedin_1 = require('../../services/isloggedin');
var login_service_1 = require('../../services/login-service');
var user_service_1 = require('../../services/user/user-service');
var SegundaSalidaListCmp = (function () {
    function SegundaSalidaListCmp(_segsalidaService, _loginService, _userService, router, routeParams) {
        this._segsalidaService = _segsalidaService;
        this._loginService = _loginService;
        this._userService = _userService;
        this.router = router;
        this.segsalidas = [];
        this._selectedId = routeParams.get('id');
    }
    SegundaSalidaListCmp.prototype.ngOnInit = function () {
        this._getAllPopulate();
    };
    SegundaSalidaListCmp.prototype._getAll = function () {
        var _this = this;
        this._segsalidaService
            .getAll()
            .subscribe(function (segsalidas) {
            _this.segsalidas = segsalidas;
        });
    };
    SegundaSalidaListCmp.prototype._getAllPopulate = function () {
        var _this = this;
        this._segsalidaService
            .getAllPopulate()
            .subscribe(function (segsalidas) {
            _this.segsalidas = segsalidas;
        });
    };
    SegundaSalidaListCmp.prototype.isSelected = function (segsalida) {
        return segsalida._id === this._selectedId;
    };
    SegundaSalidaListCmp.prototype.onSelect = function (segsalida) {
        this.router.navigate(['/DetailsSegSalida', { id: segsalida._id }]);
    };
    SegundaSalidaListCmp.prototype.gproductos = function () {
        this.router.navigate(['/ListProductos']);
    };
    SegundaSalidaListCmp.prototype.gpiezas = function () {
        this.router.navigate(['/ListPiezas']);
    };
    SegundaSalidaListCmp.prototype.gmodelos = function () {
        this.router.navigate(['/ListModelos']);
    };
    SegundaSalidaListCmp.prototype.gproveedores = function () {
        this.router.navigate(['/ListProveedores']);
    };
    SegundaSalidaListCmp.prototype.ggarantias = function () {
        this.router.navigate(['/ListGarantias']);
    };
    SegundaSalidaListCmp.prototype.galmacenes = function () {
        this.router.navigate(['/ListAlmacenes']);
    };
    SegundaSalidaListCmp.prototype.gclientes = function () {
        this.router.navigate(['/ListClientes']);
    };
    SegundaSalidaListCmp.prototype.gventas = function () {
        this.router.navigate(['/ListVentas']);
    };
    SegundaSalidaListCmp.prototype.gdevoluciones = function () {
        this.router.navigate(['/ListDevoluciones']);
    };
    SegundaSalidaListCmp.prototype.ggarantiasp = function () {
        this.router.navigate(['/ListGarantiaP']);
    };
    SegundaSalidaListCmp.prototype.gsegsalidas = function () {
        this.router.navigate(['/ListSegSalidas']);
    };
    SegundaSalidaListCmp.prototype.gcontrolcalidad = function () {
        this.router.navigate(['/ListControlCalidad']);
    };
    SegundaSalidaListCmp.prototype.greparaciones = function () {
        this.router.navigate(['/ListReparaciones']);
    };
    SegundaSalidaListCmp.prototype.gpedidocompras = function () {
        this.router.navigate(['/ListCompras']);
    };
    SegundaSalidaListCmp.prototype.gtransportes = function () {
        this.router.navigate(['/ListTransportes']);
    };
    SegundaSalidaListCmp.prototype.gusuarios = function () {
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
    SegundaSalidaListCmp.prototype.getProfile = function (name) {
        var _this = this;
        this._userService
            .getProfile(name)
            .subscribe(function (user) {
            _this.profile = user[0]._id;
            _this.router.navigate(['Perfil', { id: _this.profile }]);
        });
    };
    SegundaSalidaListCmp.prototype.logout = function () {
        this._loginService.logout();
        this.router.navigate(['/Login']);
    };
    SegundaSalidaListCmp.prototype.compras = function () {
        this.router.navigate(['/Compras']);
    };
    SegundaSalidaListCmp.prototype.ventas = function () {
        this.router.navigate(['/Ventas']);
    };
    SegundaSalidaListCmp.prototype.almacen = function () {
        this.router.navigate(['/Almacen']);
    };
    SegundaSalidaListCmp.prototype.admin = function () {
        this.router.navigate(['/Admin']);
    };
    SegundaSalidaListCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/segundasalida/templates/list.html',
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [segundasalida_service_1.SegundaSalidaService, login_service_1.LoginService, user_service_1.UserService]
        }),
        router_1.CanActivate(function () { return isloggedin_1.isLogged(); }), 
        __metadata('design:paramtypes', [segundasalida_service_1.SegundaSalidaService, login_service_1.LoginService, user_service_1.UserService, router_1.Router, router_1.RouteParams])
    ], SegundaSalidaListCmp);
    return SegundaSalidaListCmp;
}());
exports.SegundaSalidaListCmp = SegundaSalidaListCmp;
