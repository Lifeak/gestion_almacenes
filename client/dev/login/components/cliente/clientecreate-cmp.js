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
var isloggedin_1 = require('../../login/services/isloggedin');
var cliente_service_1 = require('../services/cliente-service');
var ClienteCreateCmp = (function () {
    function ClienteCreateCmp(fb, _router, _routeParams, _clienteService) {
        this._router = _router;
        this._routeParams = _routeParams;
        this._clienteService = _clienteService;
        this.clienteForm = fb.group({
            "_id": ["", common_1.Validators.required],
            "nombre": ["", common_1.Validators.required],
            "direccion": ["", common_1.Validators.required],
            "ciudad": ["", common_1.Validators.required],
            "pais": ["", common_1.Validators.required],
            "telefono1": ["", common_1.Validators.required],
            "telefono2": [""],
            "puestoTrabajo": ["", common_1.Validators.required],
            "email": ["", common_1.Validators.required],
            "detalles": [""]
        });
    }
    ClienteCreateCmp.prototype.gotoIndex = function () {
        var clienteId = this.cliente ? this.cliente._id : null;
        this._router.navigate(['/ListClientes']);
    };
    ClienteCreateCmp.prototype.goBack = function () {
        window.history.back();
    };
    ClienteCreateCmp.prototype.save = function (datos) {
        var _this = this;
        var _id = this.clienteForm.controls['_id'].value;
        var nombre = this.clienteForm.controls['nombre'].value;
        var direccion = this.clienteForm.controls['direccion'].value;
        var ciudad = this.clienteForm.controls['ciudad'].value;
        var pais = this.clienteForm.controls['pais'].value;
        var telefono1 = this.clienteForm.controls['telefono1'].value;
        var telefono2 = this.clienteForm.controls['telefono2'].value;
        var puestoTrabajo = this.clienteForm.controls['puestoTrabajo'].value;
        var email = this.clienteForm.controls['email'].value;
        var detalles = this.clienteForm.controls['detalles'].value;
        this._clienteService
            .add(_id, nombre, direccion, ciudad, pais, telefono1, telefono2, puestoTrabajo, email, detalles)
            .subscribe(function (m) {
            _this.clienteForm.controls['_id'].updateValue("");
            _this.clienteForm.controls['nombre'].updateValue("");
            _this.clienteForm.controls['direccion'].updateValue("");
            _this.clienteForm.controls['ciudad'].updateValue("");
            _this.clienteForm.controls['pais'].updateValue("");
            _this.clienteForm.controls['telefono1'].updateValue("");
            _this.clienteForm.controls['telefono2'].updateValue("");
            _this.clienteForm.controls['puestoTrabajo'].updateValue("");
            _this.clienteForm.controls['email'].updateValue("");
            _this.clienteForm.controls['detalles'].updateValue("");
        });
        this.gotoIndex();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', cliente_service_1.Cliente)
    ], ClienteCreateCmp.prototype, "cliente", void 0);
    ClienteCreateCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/cliente/templates/create.html',
            styleUrls: ['client/dev/cliente/styles/cliente.css']
        }),
        router_1.CanActivate(function () { return isloggedin_1.isLogged(); }),
        __param(0, core_1.Inject(common_1.FormBuilder)), 
        __metadata('design:paramtypes', [common_1.FormBuilder, router_1.Router, router_1.RouteParams, cliente_service_1.ClienteService])
    ], ClienteCreateCmp);
    return ClienteCreateCmp;
}());
exports.ClienteCreateCmp = ClienteCreateCmp;
