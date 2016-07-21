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
var controlcalidad_service_1 = require('../../services/controlcalidad/controlcalidad-service');
var isloggedin_1 = require('../../services/isloggedin');
var ControlCreateCmp = (function () {
    function ControlCreateCmp(fb, router, _routeParams, _loginService, _controlService, _userService) {
        this.router = router;
        this._routeParams = _routeParams;
        this._loginService = _loginService;
        this._controlService = _controlService;
        this._userService = _userService;
        this.controlForm = fb.group({
            "albaran": ["", common_1.Validators.required],
            "udsEntregadas": ["", common_1.Validators.required],
            "udsRevisadas": ["", common_1.Validators.required],
            "noconformes": [""],
            "revisionfin": ["", common_1.Validators.required],
            "pctnoconf": [""],
            "noconformesfin": [""],
            "udsConformes": [""],
            "LCI": [""],
            "LC": [""],
            "LCS": [""]
        });
    }
    ControlCreateCmp.prototype.gotoIndex = function () {
        this.router.navigate(['/ListControlCalidad']);
    };
    ControlCreateCmp.prototype.save = function (datos) {
        var _this = this;
        var albaran = this.controlForm.controls['albaran'].value;
        var udsEntregadas = this.controlForm.controls['udsEntregadas'].value;
        var udsRevisadas = this.controlForm.controls['udsRevisadas'].value;
        var noconformes = this.controlForm.controls['noconformes'].value;
        var revisionfin = this.controlForm.controls['revisionfin'].value;
        var pctnoconf;
        var noconformesfin = this.controlForm.controls['noconformesfin'].value;
        var udsConformes = null;
        if (revisionfin == "No") {
            pctnoconf = (noconformes / udsRevisadas) * 100;
        }
        else {
            pctnoconf = (noconformes / udsEntregadas) * 100;
            udsConformes = udsEntregadas - noconformesfin;
        }
        var LCI = this.controlForm.controls['LCI'].value;
        var LC = this.controlForm.controls['LC'].value;
        var LCS = this.controlForm.controls['LCS'].value;
        this._controlService
            .add(albaran, udsEntregadas, udsRevisadas, noconformes, revisionfin, pctnoconf, noconformesfin, udsConformes, LCI, LC, LCS)
            .subscribe(function (m) {
            _this.controlForm.controls['albaran'].updateValue("");
            _this.controlForm.controls['udsEntregadas'].updateValue("");
            _this.controlForm.controls['udsRevisadas'].updateValue("");
            _this.controlForm.controls['noconformes'].updateValue("");
            _this.controlForm.controls['revisionfin'].updateValue("");
            _this.controlForm.controls['noconformesfin'].updateValue("");
            _this.controlForm.controls['LCI'].updateValue("");
            _this.controlForm.controls['LC'].updateValue("");
            _this.controlForm.controls['LCS'].updateValue("");
        });
        this.gotoIndex();
    };
    ControlCreateCmp.prototype.compras = function () {
        this.router.navigate(['/Compras']);
    };
    ControlCreateCmp.prototype.ventas = function () {
        this.router.navigate(['/Ventas']);
    };
    ControlCreateCmp.prototype.goalmacen = function () {
        this.router.navigate(['/Almacen']);
    };
    ControlCreateCmp.prototype.admin = function () {
        this.router.navigate(['/Admin']);
    };
    ControlCreateCmp.prototype.logout = function () {
        this._loginService.logout();
        this.router.navigate(['/Login']);
    };
    ControlCreateCmp.prototype.gusuarios = function () {
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
    ControlCreateCmp.prototype.getProfile = function (name) {
        var _this = this;
        this._userService
            .getProfile(name)
            .subscribe(function (user) {
            _this.profile = user[0]._id;
            _this.router.navigate(['Perfil', { id: _this.profile }]);
        });
    };
    ControlCreateCmp.prototype.gproductos = function () {
        this.router.navigate(['/ListProductos']);
    };
    ControlCreateCmp.prototype.gpiezas = function () {
        this.router.navigate(['/ListPiezas']);
    };
    ControlCreateCmp.prototype.gmodelos = function () {
        this.router.navigate(['/ListModelos']);
    };
    ControlCreateCmp.prototype.gproveedores = function () {
        this.router.navigate(['/ListProveedores']);
    };
    ControlCreateCmp.prototype.ggarantias = function () {
        this.router.navigate(['/ListGarantias']);
    };
    ControlCreateCmp.prototype.galmacenes = function () {
        this.router.navigate(['/ListAlmacenes']);
    };
    ControlCreateCmp.prototype.gclientes = function () {
        this.router.navigate(['/ListClientes']);
    };
    ControlCreateCmp.prototype.gventas = function () {
        this.router.navigate(['/ListVentas']);
    };
    ControlCreateCmp.prototype.gdevoluciones = function () {
        this.router.navigate(['/ListDevoluciones']);
    };
    ControlCreateCmp.prototype.ggarantiasp = function () {
        this.router.navigate(['/ListGarantiaP']);
    };
    ControlCreateCmp.prototype.gsegsalidas = function () {
        this.router.navigate(['/ListSegSalidas']);
    };
    ControlCreateCmp.prototype.gcontrolcalidad = function () {
        this.router.navigate(['/ListControlCalidad']);
    };
    ControlCreateCmp.prototype.greparaciones = function () {
        this.router.navigate(['/ListReparaciones']);
    };
    ControlCreateCmp.prototype.gpedidocompras = function () {
        this.router.navigate(['/ListCompras']);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', controlcalidad_service_1.ControlCalidad)
    ], ControlCreateCmp.prototype, "controlcalidad", void 0);
    ControlCreateCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/controlcalidad/templates/create.html',
            providers: [login_service_1.LoginService, controlcalidad_service_1.ControlService, user_service_1.UserService]
        }),
        router_1.CanActivate(function () { return isloggedin_1.isLoggedinAdmin(); }),
        __param(0, core_1.Inject(common_1.FormBuilder)), 
        __metadata('design:paramtypes', [common_1.FormBuilder, router_1.Router, router_1.RouteParams, login_service_1.LoginService, controlcalidad_service_1.ControlService, user_service_1.UserService])
    ], ControlCreateCmp);
    return ControlCreateCmp;
}());
exports.ControlCreateCmp = ControlCreateCmp;
