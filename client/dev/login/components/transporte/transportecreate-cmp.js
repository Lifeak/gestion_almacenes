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
var isloggedin_1 = require('../../services/isloggedin');
var transporte_service_1 = require('../../services/transporte/transporte-service');
var user_service_1 = require('../../services/user/user-service');
var TransporteCreateCmp = (function () {
    function TransporteCreateCmp(fb, router, _routeParams, _userService, _transporteService, _loginService) {
        this.router = router;
        this._routeParams = _routeParams;
        this._userService = _userService;
        this._transporteService = _transporteService;
        this._loginService = _loginService;
        this.transporteForm = fb.group({
            "nombre": ["", common_1.Validators.required],
            "direccion": ["", common_1.Validators.required],
            "ciudad": ["", common_1.Validators.required],
            "pais": ["", common_1.Validators.required],
            "telefono": ["", common_1.Validators.required],
            "email": ["", common_1.Validators.required],
            "detalles": [""],
            "valoracion": [""]
        });
    }
    TransporteCreateCmp.prototype.gotoIndex = function () {
        this.router.navigate(['/ListTransportes']);
    };
    TransporteCreateCmp.prototype.goBack = function () {
        window.history.back();
    };
    TransporteCreateCmp.prototype.save = function (datos) {
        var _this = this;
        var nombre = this.transporteForm.controls['nombre'].value;
        var direccion = this.transporteForm.controls['direccion'].value;
        var ciudad = this.transporteForm.controls['ciudad'].value;
        var pais = this.transporteForm.controls['pais'].value;
        var telefono = this.transporteForm.controls['telefono'].value;
        var email = this.transporteForm.controls['email'].value;
        var detalles = this.transporteForm.controls['detalles'].value;
        var valoracion = this.transporteForm.controls['valoracion'].value;
        this._transporteService
            .add(nombre, direccion, ciudad, pais, telefono, email, detalles, valoracion)
            .subscribe(function (m) {
            _this.transporteForm.controls['nombre'].updateValue("");
            _this.transporteForm.controls['direccion'].updateValue("");
            _this.transporteForm.controls['ciudad'].updateValue("");
            _this.transporteForm.controls['pais'].updateValue("");
            _this.transporteForm.controls['telefono'].updateValue("");
            _this.transporteForm.controls['email'].updateValue("");
            _this.transporteForm.controls['detalles'].updateValue("");
            _this.transporteForm.controls['valoracion'].updateValue("");
        });
        this.gotoIndex();
    };
    TransporteCreateCmp.prototype.logout = function () {
        this._loginService.logout();
        this.router.navigate(['/Login']);
    };
    TransporteCreateCmp.prototype.compras = function () {
        this.router.navigate(['/Compras']);
    };
    TransporteCreateCmp.prototype.ventas = function () {
        this.router.navigate(['/Ventas']);
    };
    TransporteCreateCmp.prototype.almacen = function () {
        this.router.navigate(['/Almacen']);
    };
    TransporteCreateCmp.prototype.admin = function () {
        this.router.navigate(['/Admin']);
    };
    TransporteCreateCmp.prototype.gusuarios = function () {
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
    TransporteCreateCmp.prototype.getProfile = function (name) {
        var _this = this;
        this._userService
            .getProfile(name)
            .subscribe(function (user) {
            _this.profile = user[0]._id;
            _this.router.navigate(['Perfil', { id: _this.profile }]);
        });
    };
    TransporteCreateCmp.prototype.gproductos = function () {
        this.router.navigate(['/ListProductos']);
    };
    TransporteCreateCmp.prototype.gpiezas = function () {
        this.router.navigate(['/ListPiezas']);
    };
    TransporteCreateCmp.prototype.gmodelos = function () {
        this.router.navigate(['/ListModelos']);
    };
    TransporteCreateCmp.prototype.gproveedores = function () {
        this.router.navigate(['/ListProveedores']);
    };
    TransporteCreateCmp.prototype.ggarantias = function () {
        this.router.navigate(['/ListGarantias']);
    };
    TransporteCreateCmp.prototype.galmacenes = function () {
        this.router.navigate(['/ListAlmacenes']);
    };
    TransporteCreateCmp.prototype.gclientes = function () {
        this.router.navigate(['/ListClientes']);
    };
    TransporteCreateCmp.prototype.gventas = function () {
        this.router.navigate(['/ListVentas']);
    };
    TransporteCreateCmp.prototype.gdevoluciones = function () {
        this.router.navigate(['/ListDevoluciones']);
    };
    TransporteCreateCmp.prototype.ggarantiasp = function () {
        this.router.navigate(['/ListGarantiaP']);
    };
    TransporteCreateCmp.prototype.gsegsalidas = function () {
        this.router.navigate(['/ListSegSalidas']);
    };
    TransporteCreateCmp.prototype.gcontrolcalidad = function () {
        this.router.navigate(['/ListControlCalidad']);
    };
    TransporteCreateCmp.prototype.greparaciones = function () {
        this.router.navigate(['/ListReparaciones']);
    };
    TransporteCreateCmp.prototype.gpedidocompras = function () {
        this.router.navigate(['/ListCompras']);
    };
    TransporteCreateCmp.prototype.gtransportes = function () {
        this.router.navigate(['/ListTransportes']);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', transporte_service_1.Transporte)
    ], TransporteCreateCmp.prototype, "transporte", void 0);
    TransporteCreateCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/transporte/templates/create.html',
            providers: [login_service_1.LoginService, user_service_1.UserService, transporte_service_1.TransporteService]
        }),
        router_1.CanActivate(function () { return isloggedin_1.isLogged(); }),
        __param(0, core_1.Inject(common_1.FormBuilder)), 
        __metadata('design:paramtypes', [common_1.FormBuilder, router_1.Router, router_1.RouteParams, user_service_1.UserService, transporte_service_1.TransporteService, login_service_1.LoginService])
    ], TransporteCreateCmp);
    return TransporteCreateCmp;
}());
exports.TransporteCreateCmp = TransporteCreateCmp;
