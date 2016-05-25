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
var modelo_service_1 = require('../../services/modelo/modelo-service');
var login_service_1 = require('../../services/login-service');
var ModeloDetailsCmp = (function () {
    function ModeloDetailsCmp(fb, router, _routeParams, _modeloService, _loginService) {
        this.router = router;
        this._routeParams = _routeParams;
        this._modeloService = _modeloService;
        this._loginService = _loginService;
        this.modelos = [];
        this.components = [];
        this.uds = [];
        this.modeloForm = fb.group({
            "nombre": ["", common_1.Validators.required],
            "refinterna": ["", common_1.Validators.required],
            "caracteristicas": [""],
            "modeloDe": ["", common_1.Validators.required],
            "compuestoPor": [""],
            "unidades": [""]
        });
    }
    ModeloDetailsCmp.prototype.ngOnInit = function () {
        var _this = this;
        //alert("ya estoy en los detalless");
        var id = this._routeParams.get('id');
        this._modeloService
            .getModeloId(id)
            .subscribe(function (modelo) {
            _this.modelo = modelo;
            _this.components = _this.modelo.compuestoPor;
            _this.uds = _this.modelo.unidades;
        });
        this._modeloService
            .getAll()
            .subscribe(function (modelos) {
            _this.modelos = modelos;
        });
    };
    ModeloDetailsCmp.prototype.gotoIndex = function () {
        this.router.navigate(['/ListModelos']);
    };
    ModeloDetailsCmp.prototype._getAll = function () {
        var _this = this;
        this._modeloService
            .getAll()
            .subscribe(function (modelos) {
            _this.modelo = modelos;
        });
    };
    ModeloDetailsCmp.prototype.buscar = function (nombre) {
        //alert("buscamos este nombre "+nombre);
        this.router.navigate(['/DetailsSubModelo', { nombre: nombre }]);
    };
    ModeloDetailsCmp.prototype.edit = function (modelo) {
        var _this = this;
        var id = this._routeParams.get('id');
        var compuestoPor = this.components;
        var unidades = this.uds;
        this._modeloService
            .add(modelo.nombre, modelo.refinterna, modelo.caracteristicas, modelo.modeloDe, compuestoPor, unidades)
            .subscribe(function (m) {
            _this.modeloForm.controls['nombre'].updateValue("");
            _this.modeloForm.controls['refinterna'].updateValue("");
            _this.modeloForm.controls['caracteristicas'].updateValue("");
            _this.modeloForm.controls['modeloDe'].updateValue("");
            _this.modeloForm.controls['compuestoPor'].updateValue("");
            _this.modeloForm.controls['unidades'].updateValue("");
        });
        this._modeloService
            .remove(id)
            .subscribe(function () {
            return _this.modelo;
        });
        this.gotoIndex();
    };
    ModeloDetailsCmp.prototype.delete = function (modelo) {
        var _this = this;
        var id = this._routeParams.get('id');
        this._modeloService
            .remove(id)
            .subscribe(function () {
            return _this.modelo;
        });
        this.gotoIndex();
    };
    ModeloDetailsCmp.prototype.plus = function (data) {
        var nombre = this.modeloForm.controls['compuestoPor'].value;
        // alert("entramos a plus con nombre " + nombre);
        this.components.push(nombre);
        this.modeloForm.controls['compuestoPor'].updateValue("");
        var unidades = this.modeloForm.controls['unidades'].value;
        this.uds.push(unidades);
        this.modeloForm.controls['unidades'].updateValue("");
    };
    ModeloDetailsCmp.prototype.minus = function (nombre) {
        this.components.splice(this.components.indexOf(nombre), 1);
        this.uds.splice(this.components.indexOf(nombre), 1);
    };
    ModeloDetailsCmp.prototype.logout = function () {
        this._loginService.logout();
        this.router.navigate(['/Login']);
    };
    ModeloDetailsCmp.prototype.compras = function () {
        this.router.navigate(['/Compras']);
    };
    ModeloDetailsCmp.prototype.ventas = function () {
        this.router.navigate(['/Ventas']);
    };
    ModeloDetailsCmp.prototype.almacen = function () {
        this.router.navigate(['/Almacen']);
    };
    ModeloDetailsCmp.prototype.admin = function () {
        this.router.navigate(['/Admin']);
    };
    ModeloDetailsCmp.prototype.gproductos = function () {
        this.router.navigate(['/ListProductos']);
    };
    ModeloDetailsCmp.prototype.gpiezas = function () {
        this.router.navigate(['/ListPiezas']);
    };
    ModeloDetailsCmp.prototype.gmodelos = function () {
        this.router.navigate(['/ListModelos']);
    };
    ModeloDetailsCmp.prototype.gproveedores = function () {
        this.router.navigate(['/ListProveedores']);
    };
    ModeloDetailsCmp.prototype.gusuarios = function () {
        this.router.navigate(['/ListUsuarios']);
    };
    ModeloDetailsCmp.prototype.ggarantias = function () {
        this.router.navigate(['/ListGarantias']);
    };
    ModeloDetailsCmp.prototype.galmacenes = function () {
        this.router.navigate(['/ListAlmacenes']);
    };
    ModeloDetailsCmp.prototype.gclientes = function () {
        this.router.navigate(['/ListClientes']);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', modelo_service_1.Modelo)
    ], ModeloDetailsCmp.prototype, "modelo", void 0);
    ModeloDetailsCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/modelo/templates/details.html'
        }),
        router_1.CanActivate(function () { return isloggedin_1.isLogged(); }),
        __param(0, core_1.Inject(common_1.FormBuilder)),
        __param(4, core_1.Inject(login_service_1.LoginService)), 
        __metadata('design:paramtypes', [common_1.FormBuilder, router_1.Router, router_1.RouteParams, modelo_service_1.ModeloService, login_service_1.LoginService])
    ], ModeloDetailsCmp);
    return ModeloDetailsCmp;
}());
exports.ModeloDetailsCmp = ModeloDetailsCmp;
