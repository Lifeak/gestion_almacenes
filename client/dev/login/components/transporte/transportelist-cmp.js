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
var transporte_service_1 = require('../../services/transporte/transporte-service');
var login_service_1 = require('../../services/login-service');
var user_service_1 = require('../../services/user/user-service');
var TransporteListCmp = (function () {
    function TransporteListCmp(_transporteService, _userService, _loginService, router, routeParams) {
        this._transporteService = _transporteService;
        this._userService = _userService;
        this._loginService = _loginService;
        this.router = router;
        this.transportes = [];
        this._selectedId = routeParams.get('id');
    }
    TransporteListCmp.prototype.ngOnInit = function () {
        this._getAll();
    };
    TransporteListCmp.prototype._getAll = function () {
        var _this = this;
        this._transporteService
            .getAll()
            .subscribe(function (transportes) {
            _this.transportes = transportes;
        });
    };
    TransporteListCmp.prototype.isSelected = function (transporte) {
        return transporte._id === this._selectedId;
    };
    TransporteListCmp.prototype.onSelect = function (transporte) {
        this.router.navigate(['/DetailsTransporte', { id: transporte._id }]);
    };
    TransporteListCmp.prototype.logout = function () {
        this._loginService.logout();
        this.router.navigate(['/Login']);
    };
    TransporteListCmp.prototype.compras = function () {
        this.router.navigate(['/Compras']);
    };
    TransporteListCmp.prototype.ventas = function () {
        this.router.navigate(['/Ventas']);
    };
    TransporteListCmp.prototype.almacen = function () {
        this.router.navigate(['/Almacen']);
    };
    TransporteListCmp.prototype.admin = function () {
        this.router.navigate(['/Admin']);
    };
    TransporteListCmp.prototype.gusuarios = function () {
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
    TransporteListCmp.prototype.getProfile = function (name) {
        var _this = this;
        this._userService
            .getProfile(name)
            .subscribe(function (user) {
            _this.profile = user[0]._id;
            _this.router.navigate(['Perfil', { id: _this.profile }]);
        });
    };
    TransporteListCmp.prototype.gproductos = function () {
        this.router.navigate(['/ListProductos']);
    };
    TransporteListCmp.prototype.gpiezas = function () {
        this.router.navigate(['/ListPiezas']);
    };
    TransporteListCmp.prototype.gmodelos = function () {
        this.router.navigate(['/ListModelos']);
    };
    TransporteListCmp.prototype.gproveedores = function () {
        this.router.navigate(['/ListProveedores']);
    };
    TransporteListCmp.prototype.ggarantias = function () {
        this.router.navigate(['/ListGarantias']);
    };
    TransporteListCmp.prototype.galmacenes = function () {
        this.router.navigate(['/ListAlmacenes']);
    };
    TransporteListCmp.prototype.gclientes = function () {
        this.router.navigate(['/ListClientes']);
    };
    TransporteListCmp.prototype.gventas = function () {
        this.router.navigate(['/ListVentas']);
    };
    TransporteListCmp.prototype.gdevoluciones = function () {
        this.router.navigate(['/ListDevoluciones']);
    };
    TransporteListCmp.prototype.ggarantiasp = function () {
        this.router.navigate(['/ListGarantiaP']);
    };
    TransporteListCmp.prototype.gsegsalidas = function () {
        this.router.navigate(['/ListSegSalidas']);
    };
    TransporteListCmp.prototype.gcontrolcalidad = function () {
        this.router.navigate(['/ListControlCalidad']);
    };
    TransporteListCmp.prototype.greparaciones = function () {
        this.router.navigate(['/ListReparaciones']);
    };
    TransporteListCmp.prototype.gpedidocompras = function () {
        this.router.navigate(['/ListCompras']);
    };
    TransporteListCmp.prototype.gtransportes = function () {
        this.router.navigate(['/ListTransportes']);
    };
    TransporteListCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/transporte/templates/list.html',
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [transporte_service_1.TransporteService, login_service_1.LoginService, user_service_1.UserService]
        }),
        router_1.CanActivate(function () { return isloggedin_1.isLogged(); }), 
        __metadata('design:paramtypes', [transporte_service_1.TransporteService, user_service_1.UserService, login_service_1.LoginService, router_1.Router, router_1.RouteParams])
    ], TransporteListCmp);
    return TransporteListCmp;
}());
exports.TransporteListCmp = TransporteListCmp;
