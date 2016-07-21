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
var controlcalidad_service_1 = require('../../services/controlcalidad/controlcalidad-service');
var login_service_1 = require('../../services/login-service');
var user_service_1 = require('../../services/user/user-service');
var ControlDetailsCmp = (function () {
    function ControlDetailsCmp(fb, router, _routeParams, _controlService, _loginService, _userService) {
        this.router = router;
        this._routeParams = _routeParams;
        this._controlService = _controlService;
        this._loginService = _loginService;
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
    ControlDetailsCmp.prototype.ngOnInit = function () {
        var _this = this;
        var id = this._routeParams.get('id');
        this.myDate = null;
        this._controlService
            .getControlId(id)
            .subscribe(function (control) {
            _this.control = control;
        });
    };
    ControlDetailsCmp.prototype.gotoIndex = function () {
        this.router.navigate(['/ListControlCalidad']);
    };
    ControlDetailsCmp.prototype.edit = function (control) {
        var _this = this;
        this._controlService
            .add(control.albaran, control.udsEntregadas, control.udsRevisadas, control.noconformes, control.revisionfin, control.pctnoconf, control.noconformesfin, control.udsConformes, control.LCI, control.LC, control.LCS)
            .subscribe(function (m) {
            _this.controlForm.controls['albaran'].updateValue("");
            _this.controlForm.controls['udsEntregadas'].updateValue("");
            _this.controlForm.controls['udsRevisadas'].updateValue("");
            _this.controlForm.controls['noconformes'].updateValue("");
            _this.controlForm.controls['revisionfin'].updateValue("");
            _this.controlForm.controls['pctnoconf'].updateValue("");
            _this.controlForm.controls['noconformesfin'].updateValue("");
            _this.controlForm.controls['udsConformes'].updateValue("");
            _this.controlForm.controls['LCI'].updateValue("");
            _this.controlForm.controls['LC'].updateValue("");
            _this.controlForm.controls['LCS'].updateValue("");
        });
        this._controlService
            .remove(control._id)
            .subscribe(function () {
            return _this.control;
        });
        this.gotoIndex();
    };
    ControlDetailsCmp.prototype.delete = function (control) {
        var _this = this;
        this._controlService
            .remove(control._id)
            .subscribe(function () {
            return _this.control;
        });
        this.gotoIndex();
    };
    ControlDetailsCmp.prototype.compras = function () {
        this.router.navigate(['/Compras']);
    };
    ControlDetailsCmp.prototype.ventas = function () {
        this.router.navigate(['/Ventas']);
    };
    ControlDetailsCmp.prototype.goalmacen = function () {
        this.router.navigate(['/Almacen']);
    };
    ControlDetailsCmp.prototype.admin = function () {
        this.router.navigate(['/Admin']);
    };
    ControlDetailsCmp.prototype.logout = function () {
        this._loginService.logout();
        localStorage.clear();
        this.router.navigate(['/Login']);
    };
    ControlDetailsCmp.prototype.gusuarios = function () {
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
    ControlDetailsCmp.prototype.getProfile = function (name) {
        var _this = this;
        this._userService
            .getProfile(name)
            .subscribe(function (user) {
            _this.profile = user[0]._id;
            _this.router.navigate(['Perfil', { id: _this.profile }]);
        });
    };
    ControlDetailsCmp.prototype.gproductos = function () {
        this.router.navigate(['/ListProductos']);
    };
    ControlDetailsCmp.prototype.gpiezas = function () {
        this.router.navigate(['/ListPiezas']);
    };
    ControlDetailsCmp.prototype.gmodelos = function () {
        this.router.navigate(['/ListModelos']);
    };
    ControlDetailsCmp.prototype.gproveedores = function () {
        this.router.navigate(['/ListProveedores']);
    };
    ControlDetailsCmp.prototype.ggarantias = function () {
        this.router.navigate(['/ListGarantias']);
    };
    ControlDetailsCmp.prototype.galmacenes = function () {
        this.router.navigate(['/ListAlmacenes']);
    };
    ControlDetailsCmp.prototype.gclientes = function () {
        this.router.navigate(['/ListClientes']);
    };
    ControlDetailsCmp.prototype.gventas = function () {
        this.router.navigate(['/ListVentas']);
    };
    ControlDetailsCmp.prototype.gdevoluciones = function () {
        this.router.navigate(['/ListDevoluciones']);
    };
    ControlDetailsCmp.prototype.ggarantiasp = function () {
        this.router.navigate(['/ListGarantiaP']);
    };
    ControlDetailsCmp.prototype.gsegsalidas = function () {
        this.router.navigate(['/ListSegSalidas']);
    };
    ControlDetailsCmp.prototype.gcontrolcalidad = function () {
        this.router.navigate(['/ListControlCalidad']);
    };
    ControlDetailsCmp.prototype.greparaciones = function () {
        this.router.navigate(['/ListReparaciones']);
    };
    ControlDetailsCmp.prototype.gpedidocompras = function () {
        this.router.navigate(['/ListCompras']);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', controlcalidad_service_1.ControlCalidad)
    ], ControlDetailsCmp.prototype, "control", void 0);
    ControlDetailsCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/controlcalidad/templates/details.html',
            providers: [user_service_1.UserService, controlcalidad_service_1.ControlService, login_service_1.LoginService]
        }),
        router_1.CanActivate(function () { return isloggedin_1.isLoggedinAdmin(); }),
        __param(0, core_1.Inject(common_1.FormBuilder)),
        __param(4, core_1.Inject(login_service_1.LoginService)), 
        __metadata('design:paramtypes', [common_1.FormBuilder, router_1.Router, router_1.RouteParams, controlcalidad_service_1.ControlService, login_service_1.LoginService, user_service_1.UserService])
    ], ControlDetailsCmp);
    return ControlDetailsCmp;
}());
exports.ControlDetailsCmp = ControlDetailsCmp;
