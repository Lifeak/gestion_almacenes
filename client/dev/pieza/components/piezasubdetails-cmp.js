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
var modelo_service_1 = require('../services/modelo-service');
var login_service_1 = require('../../login/services/login-service');
var ModeloSubDetailsCmp = (function () {
    function ModeloSubDetailsCmp(fb, _router, _routeParams, _modeloService, _loginService) {
        this._router = _router;
        this._routeParams = _routeParams;
        this._modeloService = _modeloService;
        this._loginService = _loginService;
        this.modeloForm = fb.group({
            "nombre": ["", common_1.Validators.required],
            "refinterna": ["", common_1.Validators.required],
            "caracteristicas": ["", common_1.Validators.required],
            "modeloDe": ["", common_1.Validators.required],
            "compuestoPor": [""],
            "unidades": [""]
        });
    }
    ModeloSubDetailsCmp.prototype.ngOnInit = function () {
        var _this = this;
        var name = this._routeParams.get('nombre');
        //alert("al subdetails le llega:  "+name);
        this._modeloService
            .getModeloName(name)
            .subscribe(function (modelo) {
            _this.modelo = modelo;
        });
    };
    ModeloSubDetailsCmp.prototype.gotoIndex = function () {
        var clienteName = this.modelo ? this.modelo.nombre : null;
        //this._router.navigate(['/ListModelos']);
        window.history.back();
    };
    ModeloSubDetailsCmp.prototype._getAll = function () {
        var _this = this;
        this._modeloService
            .getAll()
            .subscribe(function (modelos) {
            _this.modelo = modelos;
        });
    };
    ModeloSubDetailsCmp.prototype.buscar = function (nombre) {
        //alert("buscamos este nombre "+nombre);
        this._router.navigate(['DetailsSubModelo', { nombre: nombre }]);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', (typeof (_a = typeof modelo_service_1.Modelo !== 'undefined' && modelo_service_1.Modelo) === 'function' && _a) || Object)
    ], ModeloSubDetailsCmp.prototype, "modelo", void 0);
    ModeloSubDetailsCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/modelo/templates/detailss.html',
            styleUrls: ['client/dev/modelo/styles/cliente.css']
        }),
        __param(0, core_1.Inject(common_1.FormBuilder)),
        __param(4, core_1.Inject(login_service_1.LoginService)), 
        __metadata('design:paramtypes', [common_1.FormBuilder, router_1.Router, router_1.RouteParams, (typeof (_b = typeof modelo_service_1.ModeloService !== 'undefined' && modelo_service_1.ModeloService) === 'function' && _b) || Object, login_service_1.LoginService])
    ], ModeloSubDetailsCmp);
    return ModeloSubDetailsCmp;
    var _a, _b;
}());
exports.ModeloSubDetailsCmp = ModeloSubDetailsCmp;
