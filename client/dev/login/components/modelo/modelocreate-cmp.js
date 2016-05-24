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
var modelo_service_1 = require('../../services/modelo/modelo-service');
var ModeloCreateCmp = (function () {
    function ModeloCreateCmp(fb, router, _routeParams, _loginService, _modeloService) {
        this.router = router;
        this._routeParams = _routeParams;
        this._loginService = _loginService;
        this._modeloService = _modeloService;
        this.modelos = [];
        this.components = [];
        this.uds = [];
        this.modeloForm = fb.group({
            "nombre": ["", common_1.Validators.required],
            "refinterna": ["", common_1.Validators.required],
            "caracteristicas": ["", common_1.Validators.required],
            "modeloDe": ["", common_1.Validators.required],
            "compuestoPor": [""],
            "unidades": [""],
        });
    }
    ModeloCreateCmp.prototype.ngOnInit = function () {
        var _this = this;
        this._modeloService
            .getAll()
            .subscribe(function (modelos) {
            _this.modelos = modelos;
        });
    };
    ModeloCreateCmp.prototype.gotoIndex = function () {
        this.router.navigate(['/ListModelos']);
    };
    ModeloCreateCmp.prototype.goBack = function () {
        window.history.back();
    };
    ModeloCreateCmp.prototype.plus = function (data) {
        var nombre = this.modeloForm.controls['compuestoPor'].value;
        this.components.push(nombre);
        this.modeloForm.controls['compuestoPor'].updateValue("");
        var unidades = this.modeloForm.controls['unidades'].value;
        this.uds.push(unidades);
        this.modeloForm.controls['unidades'].updateValue("");
    };
    ModeloCreateCmp.prototype.minus = function (nombre) {
        this.components.splice(this.components.indexOf(nombre), 1);
        this.uds.splice(this.components.indexOf(nombre), 1);
    };
    ModeloCreateCmp.prototype.save = function (datos) {
        var _this = this;
        var nombre = this.modeloForm.controls['nombre'].value;
        var refinterna = this.modeloForm.controls['refinterna'].value;
        var caracteristicas = this.modeloForm.controls['caracteristicas'].value;
        var modeloDe = this.modeloForm.controls['modeloDe'].value;
        var compuestoPor = this.components;
        var unidades = this.uds;
        this._modeloService
            .add(nombre, refinterna, caracteristicas, modeloDe, compuestoPor, unidades)
            .subscribe(function (m) {
            _this.modeloForm.controls['nombre'].updateValue("");
            _this.modeloForm.controls['refinterna'].updateValue("");
            _this.modeloForm.controls['caracteristicas'].updateValue("");
            _this.modeloForm.controls['modeloDe'].updateValue("");
            _this.modeloForm.controls['compuestoPor'].updateValue("");
            _this.modeloForm.controls['unidades'].updateValue("");
        });
        this.gotoIndex();
    };
    ModeloCreateCmp.prototype.logout = function () {
        this._loginService.logout();
        this.router.navigate(['/Login']);
    };
    ModeloCreateCmp.prototype.compras = function () {
        this.router.navigate(['/Compras']);
    };
    ModeloCreateCmp.prototype.ventas = function () {
        this.router.navigate(['/Ventas']);
    };
    ModeloCreateCmp.prototype.almacen = function () {
        this.router.navigate(['/Almacen']);
    };
    ModeloCreateCmp.prototype.admin = function () {
        this.router.navigate(['/Admin']);
    };
    ModeloCreateCmp.prototype.gproductos = function () {
        this.router.navigate(['/ListProductos']);
    };
    ModeloCreateCmp.prototype.gpiezas = function () {
        this.router.navigate(['/ListPiezas']);
    };
    ModeloCreateCmp.prototype.gmodelos = function () {
        this.router.navigate(['/ListModelos']);
    };
    ModeloCreateCmp.prototype.gproveedores = function () {
        this.router.navigate(['/ListProveedores']);
    };
    ModeloCreateCmp.prototype.gusuarios = function () {
        this.router.navigate(['/ListUsuarios']);
    };
    ModeloCreateCmp.prototype.ggarantias = function () {
        this.router.navigate(['/ListGarantias']);
    };
    ModeloCreateCmp.prototype.galmacenes = function () {
        this.router.navigate(['/ListAlmacenes']);
    };
    ModeloCreateCmp.prototype.gclientes = function () {
        this.router.navigate(['/ListClientes']);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', modelo_service_1.Modelo)
    ], ModeloCreateCmp.prototype, "modelo", void 0);
    ModeloCreateCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/modelo/templates/create.html'
        }),
        router_1.CanActivate(function () { return isloggedin_1.isLogged(); }),
        __param(0, core_1.Inject(common_1.FormBuilder)), 
        __metadata('design:paramtypes', [common_1.FormBuilder, router_1.Router, router_1.RouteParams, login_service_1.LoginService, modelo_service_1.ModeloService])
    ], ModeloCreateCmp);
    return ModeloCreateCmp;
}());
exports.ModeloCreateCmp = ModeloCreateCmp;
