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
var garantiapieza_service_1 = require('../../services/garantiapieza/garantiapieza-service');
var login_service_1 = require('../../services/login-service');
var user_service_1 = require('../../services/user/user-service');
var GarantiapDetailsCmp = (function () {
    function GarantiapDetailsCmp(fb, router, _routeParams, _userService, _garantiapService, _loginService) {
        this.router = router;
        this._routeParams = _routeParams;
        this._userService = _userService;
        this._garantiapService = _garantiapService;
        this._loginService = _loginService;
        this.garantiapForm = fb.group({
            "idp": ["", common_1.Validators.required],
            "fingarantia": ["", common_1.Validators.required]
        });
    }
    GarantiapDetailsCmp.prototype.ngOnInit = function () {
        var _this = this;
        var id = this._routeParams.get('id');
        this._garantiapService
            .getGarantiapiezaID(id)
            .subscribe(function (devolucion) {
            _this.garantiap = devolucion;
            _this.myDate = _this.garantiap.fingarantia;
        });
    };
    GarantiapDetailsCmp.prototype.gotoIndex = function () {
        this.router.navigate(['/ListGarantiaP']);
    };
    GarantiapDetailsCmp.prototype._getAll = function () {
        var _this = this;
        this._garantiapService
            .getAll()
            .subscribe(function (garantia) {
            _this.garantiap = garantia;
        });
    };
    GarantiapDetailsCmp.prototype.edit = function (garantiap) {
        var _this = this;
        var fingarantia = this.garantiapForm.controls['idp'].value;
        if (fingarantia == null) {
            garantiap.fingarantia = this.myDate;
        }
        this._garantiapService
            .add(garantiap.idp, garantiap.fingarantia)
            .subscribe(function (m) {
            _this.garantiapForm.controls['idp'].updateValue("");
            _this.garantiapForm.controls['fingarantia'].updateValue("");
        });
        this._garantiapService
            .remove(garantiap._id)
            .subscribe(function () {
            return _this.garantiap;
        });
        this.router.navigate(['/ListGarantiaP']);
    };
    GarantiapDetailsCmp.prototype.delete = function (garantiap) {
        var _this = this;
        this._garantiapService
            .remove(garantiap._id)
            .subscribe(function () {
            return _this.garantiap;
        });
        this.router.navigate(['/ListGarantiaP']);
    };
    GarantiapDetailsCmp.prototype.logout = function () {
        this._loginService.logout();
        this.router.navigate(['/Login']);
    };
    GarantiapDetailsCmp.prototype.compras = function () {
        this.router.navigate(['/Compras']);
    };
    GarantiapDetailsCmp.prototype.ventas = function () {
        this.router.navigate(['/Ventas']);
    };
    GarantiapDetailsCmp.prototype.almacen = function () {
        this.router.navigate(['/Almacen']);
    };
    GarantiapDetailsCmp.prototype.admin = function () {
        this.router.navigate(['/Admin']);
    };
    GarantiapDetailsCmp.prototype.gproductos = function () {
        this.router.navigate(['/ListProductos']);
    };
    GarantiapDetailsCmp.prototype.gpiezas = function () {
        this.router.navigate(['/ListPiezas']);
    };
    GarantiapDetailsCmp.prototype.gmodelos = function () {
        this.router.navigate(['/ListModelos']);
    };
    GarantiapDetailsCmp.prototype.gproveedores = function () {
        this.router.navigate(['/ListProveedores']);
    };
    GarantiapDetailsCmp.prototype.gusuarios = function () {
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
    GarantiapDetailsCmp.prototype.getProfile = function (name) {
        var _this = this;
        this._userService
            .getProfile(name)
            .subscribe(function (user) {
            _this.profile = user[0]._id;
            _this.router.navigate(['Perfil', { id: _this.profile }]);
        });
    };
    GarantiapDetailsCmp.prototype.ggarantias = function () {
        this.router.navigate(['/ListGarantias']);
    };
    GarantiapDetailsCmp.prototype.galmacenes = function () {
        this.router.navigate(['/ListAlmacenes']);
    };
    GarantiapDetailsCmp.prototype.gclientes = function () {
        this.router.navigate(['/ListClientes']);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', garantiapieza_service_1.Garantiapieza)
    ], GarantiapDetailsCmp.prototype, "garantiap", void 0);
    GarantiapDetailsCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/garantiapieza/templates/details.html',
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [login_service_1.LoginService, user_service_1.UserService, garantiapieza_service_1.GarantiapService]
        }),
        router_1.CanActivate(function () { return isloggedin_1.isLogged(); }),
        __param(0, core_1.Inject(common_1.FormBuilder)),
        __param(5, core_1.Inject(login_service_1.LoginService)), 
        __metadata('design:paramtypes', [common_1.FormBuilder, router_1.Router, router_1.RouteParams, user_service_1.UserService, garantiapieza_service_1.GarantiapService, login_service_1.LoginService])
    ], GarantiapDetailsCmp);
    return GarantiapDetailsCmp;
}());
exports.GarantiapDetailsCmp = GarantiapDetailsCmp;
