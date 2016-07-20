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
var isloggedin_1 = require('../../services/isloggedin');
var reparaciones_service_1 = require('../../services/reparaciones/reparaciones-service');
var login_service_1 = require('../../services/login-service');
var user_service_1 = require('../../services/user/user-service');
var ReparacionDetailsCmp = (function () {
    function ReparacionDetailsCmp(fb, router, _routeParams, _reparacionService, _loginService, _userService) {
        this.router = router;
        this._routeParams = _routeParams;
        this._reparacionService = _reparacionService;
        this._loginService = _loginService;
        this._userService = _userService;
        this.reparacionForm = fb.group({
            "numincidencia": ["", common_1.Validators.required],
            "idproducto": ["", common_1.Validators.required],
            "estado": ["", common_1.Validators.required],
            "fechacambio": ["", common_1.Validators.required],
            "observaciones": ["", common_1.Validators.required]
        });
    }
    ReparacionDetailsCmp.prototype.ngOnInit = function () {
        var _this = this;
        var id = this._routeParams.get('id');
        this.myDate = null;
        this._reparacionService
            .getReparacionId(id)
            .subscribe(function (reparacion) {
            _this.reparacion = reparacion;
            if (_this.reparacion.fechacambio != null)
                _this.myDate = _this.reparacion.fechacambio;
        });
    };
    ReparacionDetailsCmp.prototype.gotoIndex = function () {
        this.router.navigate(['/ListReparaciones']);
    };
    ReparacionDetailsCmp.prototype.edit = function (reparacion) {
        var _this = this;
        if (reparacion.fechacambio == null) {
            reparacion.fechacambio = this.myDate;
        }
        this._reparacionService
            .add(reparacion.numincidencia, reparacion.idproducto, reparacion.estado, reparacion.fechacambio, reparacion.observaciones)
            .subscribe(function (m) {
            _this.reparacionForm.controls['numincidencia'].updateValue("");
            _this.reparacionForm.controls['idproducto'].updateValue("");
            _this.reparacionForm.controls['estado'].updateValue("");
            _this.reparacionForm.controls['fechacambio'].updateValue("");
            _this.reparacionForm.controls['observaciones'].updateValue("");
        });
        this._reparacionService
            .remove(reparacion._id)
            .subscribe(function () {
            return _this.reparacion;
        });
        this.gotoIndex();
    };
    ReparacionDetailsCmp.prototype.delete = function (reparacion) {
        var _this = this;
        this._reparacionService
            .remove(reparacion._id)
            .subscribe(function () {
            return _this.reparacion;
        });
        this.gotoIndex();
    };
    ReparacionDetailsCmp.prototype.compras = function () {
        this.router.navigate(['/Compras']);
    };
    ReparacionDetailsCmp.prototype.ventas = function () {
        this.router.navigate(['/Ventas']);
    };
    ReparacionDetailsCmp.prototype.goalmacen = function () {
        this.router.navigate(['/Almacen']);
    };
    ReparacionDetailsCmp.prototype.admin = function () {
        this.router.navigate(['/Admin']);
    };
    ReparacionDetailsCmp.prototype.logout = function () {
        this._loginService.logout();
        localStorage.clear();
        this.router.navigate(['/Login']);
    };
    ReparacionDetailsCmp.prototype.galmacenes = function () {
        this.router.navigate(['/ListAlmacenes']);
    };
    ReparacionDetailsCmp.prototype.ggarantias = function () {
        this.router.navigate(['/ListGarantias']);
    };
    ReparacionDetailsCmp.prototype.gusuarios = function () {
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
    ReparacionDetailsCmp.prototype.getProfile = function (name) {
        var _this = this;
        this._userService
            .getProfile(name)
            .subscribe(function (user) {
            _this.profile = user[0]._id;
            _this.router.navigate(['Perfil', { id: _this.profile }]);
        });
    };
    ReparacionDetailsCmp.prototype.gproductos = function () {
        this.router.navigate(['/ListProductos']);
    };
    ReparacionDetailsCmp.prototype.gpiezas = function () {
        this.router.navigate(['/ListPiezas']);
    };
    ReparacionDetailsCmp.prototype.gmodelos = function () {
        this.router.navigate(['/ListModelos']);
    };
    ReparacionDetailsCmp.prototype.gproveedores = function () {
        this.router.navigate(['/ListProveedores']);
    };
    ReparacionDetailsCmp.prototype.gclientes = function () {
        this.router.navigate(['/ListClientes']);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', reparaciones_service_1.Reparacion)
    ], ReparacionDetailsCmp.prototype, "reparacion", void 0);
    ReparacionDetailsCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/reparaciones/templates/details.html',
            providers: [user_service_1.UserService, reparaciones_service_1.ReparacionService, login_service_1.LoginService]
        }),
        router_1.CanActivate(function () { return isloggedin_1.isLoggedinAdmin(); }),
        __param(0, core_1.Inject(common_1.FormBuilder)),
        __param(4, core_1.Inject(login_service_1.LoginService)), 
        __metadata('design:paramtypes', [common_1.FormBuilder, router_1.Router, router_1.RouteParams, reparaciones_service_1.ReparacionService, login_service_1.LoginService, user_service_1.UserService])
    ], ReparacionDetailsCmp);
    return ReparacionDetailsCmp;
}());
exports.ReparacionDetailsCmp = ReparacionDetailsCmp;
