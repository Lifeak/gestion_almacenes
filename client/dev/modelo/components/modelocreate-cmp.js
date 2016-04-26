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
var ModeloCreateCmp = (function () {
    function ModeloCreateCmp(fb, _router, _routeParams, _modeloService) {
        this._router = _router;
        this._routeParams = _routeParams;
        this._modeloService = _modeloService;
        this.modeloForm = fb.group({
            "nombre": ["", common_1.Validators.required],
            "refinterna": ["", common_1.Validators.required],
            "caracteristicas": ["", common_1.Validators.required],
            "modeloDe": ["", common_1.Validators.required],
            "compuestoPor": ["", common_1.Validators.required],
            "unidades": ["", common_1.Validators.required],
        });
    }
    ModeloCreateCmp.prototype.gotoIndex = function () {
        this._router.navigate(['/ListModelos']);
    };
    ModeloCreateCmp.prototype.goBack = function () {
        window.history.back();
    };
    ModeloCreateCmp.prototype.save = function (datos) {
        var _this = this;
        var nombre = this.modeloForm.controls['nombre'].value;
        var refinterna = this.modeloForm.controls['refinterna'].value;
        var caracteristicas = this.modeloForm.controls['caracteristicas'].value;
        var modeloDe = this.modeloForm.controls['modeloDe'].value;
        var compuestoPor = this.modeloForm.controls['compuestoPor'].value;
        var unidades = this.modeloForm.controls['unidades'].value;
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
    __decorate([
        core_1.Input(), 
        __metadata('design:type', modelo_service_1.Modelo)
    ], ModeloCreateCmp.prototype, "modelo", void 0);
    ModeloCreateCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/modelo/templates/create.html',
            styleUrls: ['client/dev/modelo/styles/cliente.css']
        }),
        __param(0, core_1.Inject(common_1.FormBuilder)), 
        __metadata('design:paramtypes', [common_1.FormBuilder, router_1.Router, router_1.RouteParams, modelo_service_1.ModeloService])
    ], ModeloCreateCmp);
    return ModeloCreateCmp;
}());
exports.ModeloCreateCmp = ModeloCreateCmp;