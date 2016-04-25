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
var cliente_service_1 = require('../services/cliente-service');
var ClienteCmp = (function () {
    function ClienteCmp(fb, _clienteService) {
        this._clienteService = _clienteService;
        this.title = "SuperPrueba";
        this.clientes = [];
        this.clienteForm = fb.group({
            "clienteMessage": ["", common_1.Validators.required]
        });
    }
    ClienteCmp.prototype.ngOnInit = function () {
        this._getAll();
    };
    ClienteCmp.prototype._getAll = function () {
        var _this = this;
        this._clienteService
            .getAll()
            .subscribe(function (clientes) {
            _this.clientes = clientes;
        });
    };
    ClienteCmp.prototype.add = function (message) {
        var _this = this;
        this._clienteService
            .add(message)
            .subscribe(function (m) {
            _this.clientes.push(m);
            _this.clienteForm.controls['clienteMessage'].updateValue("");
        });
    };
    ClienteCmp.prototype.remove = function (id) {
        var _this = this;
        this._clienteService
            .remove(id)
            .subscribe(function () {
            _this.clientes.forEach(function (t, i) {
                if (t._id === id)
                    return _this.clientes.splice(i, 1);
            });
        });
    };
    ClienteCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/cliente/templates/cliente.html',
            styleUrls: ['client/dev/cliente/styles/cliente.css'],
            providers: [cliente_service_1.ClienteService]
        }),
        __param(0, core_1.Inject(common_1.FormBuilder)),
        __param(1, core_1.Inject(cliente_service_1.ClienteService)), 
        __metadata('design:paramtypes', [common_1.FormBuilder, cliente_service_1.ClienteService])
    ], ClienteCmp);
    return ClienteCmp;
}());
exports.ClienteCmp = ClienteCmp;
