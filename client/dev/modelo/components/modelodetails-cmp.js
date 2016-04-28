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
var ModeloDetailsCmp = (function () {
    function ModeloDetailsCmp(fb, _router, _routeParams, _modeloService, _loginService) {
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
    ModeloDetailsCmp.prototype.ngOnInit = function () {
        var _this = this;
        var id = this._routeParams.get('id');
        //alert(id);
        this._modeloService
            .getModeloId(id)
            .subscribe(function (modelo) {
            _this.modelo = modelo;
        });
    };
    ModeloDetailsCmp.prototype.gotoIndex = function () {
        // let clienteId = this.modelo ? this.modelo._id : null;
        this._router.navigate(['/ListModelos']);
    };
    ModeloDetailsCmp.prototype._getAll = function () {
        var _this = this;
        this._modeloService
            .getAll()
            .subscribe(function (modelos) {
            _this.modelo = modelos;
        });
    };
    ModeloDetailsCmp.prototype.edit = function (modelo) {
        var _this = this;
        var id = this._routeParams.get('id');
        alert("el id del modelo que vamos a borrar es " + id);
        this._modeloService
            .add(modelo.nombre, modelo.refinterna, modelo.caracteristicas, modelo.modeloDe, modelo.compuestoPor, modelo.unidades)
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
    __decorate([
        core_1.Input(), 
        __metadata('design:type', modelo_service_1.Modelo)
    ], ModeloDetailsCmp.prototype, "modelo", void 0);
    ModeloDetailsCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/modelo/templates/details.html',
            styleUrls: ['client/dev/modelo/styles/cliente.css']
        }),
        __param(0, core_1.Inject(common_1.FormBuilder)),
        __param(4, core_1.Inject(login_service_1.LoginService)), 
        __metadata('design:paramtypes', [common_1.FormBuilder, router_1.Router, router_1.RouteParams, modelo_service_1.ModeloService, login_service_1.LoginService])
    ], ModeloDetailsCmp);
    return ModeloDetailsCmp;
}());
exports.ModeloDetailsCmp = ModeloDetailsCmp;
