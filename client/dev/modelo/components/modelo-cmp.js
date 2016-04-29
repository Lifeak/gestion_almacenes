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
var modelolist_cmp_1 = require('./modelolist-cmp');
var modelodetails_cmp_1 = require('./modelodetails-cmp');
var modelosubdetails_cmp_1 = require('./modelosubdetails-cmp');
var modelocreate_cmp_1 = require('./modelocreate-cmp');
var ModeloCmp = (function () {
    function ModeloCmp(fb, _modeloService, _loginService, router) {
        this._modeloService = _modeloService;
        this._loginService = _loginService;
        this.router = router;
        this.modelos = [];
        this.modeloForm = fb.group({
            "nombre": ["", common_1.Validators.required],
            "refinterna": ["", common_1.Validators.required],
            "caracteristicas": ["", common_1.Validators.required],
            "modeloDe": ["", common_1.Validators.required],
            "compuestoPor": [""],
            "unidades": [""],
        });
    }
    ModeloCmp.prototype.ngOnInit = function () {
        this._getAll();
        this.router.navigate(['/ListModelos']);
    };
    ModeloCmp.prototype._getAll = function () {
        var _this = this;
        this._modeloService
            .getAll()
            .subscribe(function (modelos) {
            _this.modelos = modelos;
        });
    };
    ModeloCmp.prototype.isSelected = function (modelo) {
        return modelo._id === this._selectedId;
    };
    ModeloCmp.prototype.onSelect = function (modelo) {
        this.router.navigate(['DetailsModelo', { id: modelo._id }]);
    };
    ModeloCmp.prototype.add = function (nombre, refinterna, caracteristicas, modeloDe, compuestoPor, unidades) {
        var _this = this;
        this._modeloService
            .add(nombre, refinterna, caracteristicas, modeloDe, compuestoPor, unidades)
            .subscribe(function (m) {
            _this.modelos.push(m);
            _this.modeloForm.controls['nombre'].updateValue("");
            _this.modeloForm.controls['refinterna'].updateValue("");
            _this.modeloForm.controls['caracteristicas'].updateValue("");
            _this.modeloForm.controls['modeloDe'].updateValue("");
            _this.modeloForm.controls['compuestoPor'].updateValue("");
            _this.modeloForm.controls['unidades'].updateValue("");
        });
    };
    ModeloCmp.prototype.remove = function (id) {
        var _this = this;
        this._modeloService
            .remove(id)
            .subscribe(function () {
            _this.modelos.forEach(function (t, i) {
                if (t._id === id)
                    return _this.modelos.splice(i, 1);
            });
        });
    };
    ModeloCmp.prototype.logout = function () {
        this._loginService.logout();
        window.location.replace("http://localhost:3000/");
    };
    ModeloCmp.prototype.compras = function () {
        window.location.replace("http://localhost:3000/#/compras");
    };
    ModeloCmp.prototype.ventas = function () {
        window.location.replace("http://localhost:3000/#/ventas");
    };
    ModeloCmp.prototype.almacen = function () {
        window.location.replace("http://localhost:3000/#/almacen");
    };
    ModeloCmp.prototype.admin = function () {
        window.location.replace("http://localhost:3000/#/admin");
    };
    ModeloCmp = __decorate([
        core_1.Component({
            selector: 'modelo-cmp',
            templateUrl: 'client/dev/modelo/templates/index.html',
            styleUrls: ['client/dev/modelo/styles/cliente.css'],
            providers: [modelo_service_1.ModeloService, login_service_1.LoginService, router_1.ROUTER_PROVIDERS],
            directives: [router_1.ROUTER_DIRECTIVES]
        }),
        router_1.RouteConfig([
            { path: '/Modelos', name: 'ListModelos', component: modelolist_cmp_1.ModeloListCmp },
            { path: '/Create', name: 'CreateModelo', component: modelocreate_cmp_1.ModeloCreateCmp },
            { path: '/Details', name: 'DetailsModelo', component: modelodetails_cmp_1.ModeloDetailsCmp },
            { path: '/Detailss', name: 'DetailsSubModelo', component: modelosubdetails_cmp_1.ModeloSubDetailsCmp }
        ]),
        __param(0, core_1.Inject(common_1.FormBuilder)),
        __param(1, core_1.Inject(modelo_service_1.ModeloService)),
        __param(2, core_1.Inject(login_service_1.LoginService)), 
        __metadata('design:paramtypes', [common_1.FormBuilder, modelo_service_1.ModeloService, login_service_1.LoginService, router_1.Router])
    ], ModeloCmp);
    return ModeloCmp;
}());
exports.ModeloCmp = ModeloCmp;
