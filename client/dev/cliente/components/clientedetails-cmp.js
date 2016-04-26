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
var cliente_service_1 = require('../services/cliente-service');
var login_service_1 = require('../../login/services/login-service');
var ClienteDetailsCmp = (function () {
    function ClienteDetailsCmp(fb, _router, _routeParams, _clienteService, _loginService) {
        this._router = _router;
        this._routeParams = _routeParams;
        this._clienteService = _clienteService;
        this._loginService = _loginService;
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
    ClienteDetailsCmp.prototype.ngOnInit = function () {
        var _this = this;
        var id = this._routeParams.get('id');
        alert(id);
        this._clienteService
            .getClienteId(id)
            .subscribe(function (cliente) {
            _this.cliente = cliente;
        });
    };
    ClienteDetailsCmp.prototype.gotoIndex = function () {
        var clienteId = this.cliente ? this.cliente._id : null;
        this._router.navigate(['/ListClientes']);
    };
    ClienteDetailsCmp.prototype._getAll = function () {
        var _this = this;
        this._clienteService
            .getAll()
            .subscribe(function (clientes) {
            _this.cliente = clientes;
        });
    };
    ClienteDetailsCmp.prototype.edit = function (cliente) {
        var _this = this;
        this._clienteService
            .remove(cliente._id)
            .subscribe(function () {
            return _this.cliente;
        });
        this._clienteService
            .add(cliente._id, cliente.nombre, cliente.direccion, cliente.ciudad, cliente.pais, cliente.telefono1, cliente.telefono2, cliente.puestoTrabajo, cliente.email, cliente.detalles)
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
    ClienteDetailsCmp.prototype.delete = function (cliente) {
        var _this = this;
        this._clienteService
            .remove(cliente._id)
            .subscribe(function () {
            return _this.cliente;
        });
        this.gotoIndex();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', cliente_service_1.Cliente)
    ], ClienteDetailsCmp.prototype, "cliente", void 0);
    ClienteDetailsCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/cliente/templates/details.html',
            styleUrls: ['client/dev/cliente/styles/cliente.css']
        }),
        __param(0, core_1.Inject(common_1.FormBuilder)),
        __param(4, core_1.Inject(login_service_1.LoginService)), 
        __metadata('design:paramtypes', [common_1.FormBuilder, router_1.Router, router_1.RouteParams, cliente_service_1.ClienteService, login_service_1.LoginService])
    ], ClienteDetailsCmp);
    return ClienteDetailsCmp;
}());
exports.ClienteDetailsCmp = ClienteDetailsCmp;