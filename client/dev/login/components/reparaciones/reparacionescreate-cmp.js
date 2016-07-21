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
var common_1 = require('angular2/common');
var router_1 = require('angular2/router');
var login_service_1 = require('../../services/login-service');
var user_service_1 = require('../../services/user/user-service');
var reparaciones_service_1 = require('../../services/reparaciones/reparaciones-service');
var isloggedin_1 = require('../../services/isloggedin');
var ReparacionCreateCmp = (function () {
    function ReparacionCreateCmp(fb, router, _routeParams, _loginService, _reparacionService, _userService) {
        this.router = router;
        this._routeParams = _routeParams;
        this._loginService = _loginService;
        this._reparacionService = _reparacionService;
        this._userService = _userService;
        this.reparacionForm = fb.group({
            "numincidencia": ["", common_1.Validators.required],
            "idproducto": ["", common_1.Validators.required],
            "estado": ["", common_1.Validators.required],
            "fechacambio": [""],
            "observaciones": [""]
        });
    }
    ReparacionCreateCmp.prototype.gotoIndex = function () {
        this.router.navigate(['/ListReparaciones']);
    };
    ReparacionCreateCmp.prototype.save = function (datos) {
        var _this = this;
        var numincidencia = this.reparacionForm.controls['numincidencia'].value;
        var idproducto = this.reparacionForm.controls['idproducto'].value;
        var estado = this.reparacionForm.controls['estado'].value;
        var fechacambio = this.reparacionForm.controls['fechacambio'].value;
        var observaciones = this.reparacionForm.controls['observaciones'].value;
        this._reparacionService
            .add(numincidencia, idproducto, estado, fechacambio, observaciones)
            .subscribe(function (m) {
            _this.reparacionForm.controls['numincidencia'].updateValue("");
            _this.reparacionForm.controls['idproducto'].updateValue("");
            _this.reparacionForm.controls['estado'].updateValue("");
            _this.reparacionForm.controls['fechacambio'].updateValue("");
            _this.reparacionForm.controls['observaciones'].updateValue("");
        });
        this.gotoIndex();
    };
    ReparacionCreateCmp.prototype.compras = function () {
        this.router.navigate(['/Compras']);
    };
    ReparacionCreateCmp.prototype.ventas = function () {
        this.router.navigate(['/Ventas']);
    };
    ReparacionCreateCmp.prototype.goalmacen = function () {
        this.router.navigate(['/Almacen']);
    };
    ReparacionCreateCmp.prototype.admin = function () {
        this.router.navigate(['/Admin']);
    };
    ReparacionCreateCmp.prototype.logout = function () {
        this._loginService.logout();
        this.router.navigate(['/Login']);
    };
    ReparacionCreateCmp.prototype.gproductos = function () {
        this.router.navigate(['/ListProductos']);
    };
    ReparacionCreateCmp.prototype.gpiezas = function () {
        this.router.navigate(['/ListPiezas']);
    };
    ReparacionCreateCmp.prototype.gmodelos = function () {
        this.router.navigate(['/ListModelos']);
    };
    ReparacionCreateCmp.prototype.gproveedores = function () {
        this.router.navigate(['/ListProveedores']);
    };
    ReparacionCreateCmp.prototype.ggarantias = function () {
        this.router.navigate(['/ListGarantias']);
    };
    ReparacionCreateCmp.prototype.galmacenes = function () {
        this.router.navigate(['/ListAlmacenes']);
    };
    ReparacionCreateCmp.prototype.gclientes = function () {
        this.router.navigate(['/ListClientes']);
    };
    ReparacionCreateCmp.prototype.gventas = function () {
        this.router.navigate(['/ListVentas']);
    };
    ReparacionCreateCmp.prototype.gdevoluciones = function () {
        this.router.navigate(['/ListDevoluciones']);
    };
    ReparacionCreateCmp.prototype.ggarantiasp = function () {
        this.router.navigate(['/ListGarantiaP']);
    };
    ReparacionCreateCmp.prototype.gsegsalidas = function () {
        this.router.navigate(['/ListSegSalidas']);
    };
    ReparacionCreateCmp.prototype.gcontrolcalidad = function () {
        this.router.navigate(['/ListControlCalidad']);
    };
    ReparacionCreateCmp.prototype.greparaciones = function () {
        this.router.navigate(['/ListReparaciones']);
    };
    ReparacionCreateCmp.prototype.gpedidocompras = function () {
        this.router.navigate(['/ListCompras']);
    };
    ReparacionCreateCmp.prototype.gusuarios = function () {
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
    ReparacionCreateCmp.prototype.getProfile = function (name) {
        var _this = this;
        this._userService
            .getProfile(name)
            .subscribe(function (user) {
            _this.profile = user[0]._id;
            _this.router.navigate(['Perfil', { id: _this.profile }]);
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', reparaciones_service_1.Reparacion)
    ], ReparacionCreateCmp.prototype, "reparacion", void 0);
    ReparacionCreateCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/reparaciones/templates/create.html',
            providers: [login_service_1.LoginService, reparaciones_service_1.ReparacionService, user_service_1.UserService]
        }),
        router_1.CanActivate(function () { return isloggedin_1.isLoggedinAdmin(); }),
        __param(0, core_1.Inject(common_1.FormBuilder)), 
        __metadata('design:paramtypes', [common_1.FormBuilder, router_1.Router, router_1.RouteParams, login_service_1.LoginService, reparaciones_service_1.ReparacionService, user_service_1.UserService])
    ], ReparacionCreateCmp);
    return ReparacionCreateCmp;
}());
exports.ReparacionCreateCmp = ReparacionCreateCmp;
