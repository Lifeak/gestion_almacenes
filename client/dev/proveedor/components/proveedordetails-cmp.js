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
var proveedor_service_1 = require('../services/proveedor-service');
var login_service_1 = require('../../login/services/login-service');
var ProveedorDetailsCmp = (function () {
    function ProveedorDetailsCmp(fb, _router, _routeParams, _proveedorService, _loginService) {
        this._router = _router;
        this._routeParams = _routeParams;
        this._proveedorService = _proveedorService;
        this._loginService = _loginService;
        this.mat = [];
        this.proveedorForm = fb.group({
            "nombre": ["", common_1.Validators.required],
            "direccion": ["", common_1.Validators.required],
            "ciudad": ["", common_1.Validators.required],
            "pais": ["", common_1.Validators.required],
            "telefono": ["", common_1.Validators.required],
            "valoracion": ["", common_1.Validators.required],
            "pieza": [""],
            "refexterna": [""],
            "coste1": [""],
            "coste2": [""],
            "val": [""]
        });
    }
    ProveedorDetailsCmp.prototype.ngOnInit = function () {
        var _this = this;
        var id = this._routeParams.get('id');
        this._proveedorService
            .getProveedorId(id)
            .subscribe(function (proveedor) {
            _this.proveedor = proveedor;
            alert("details " + JSON.stringify(_this.proveedor));
            _this.mat = _this.proveedor.materiales;
        });
    };
    ProveedorDetailsCmp.prototype.gotoIndex = function () {
        this._router.navigate(['/ListProveedores']);
    };
    ProveedorDetailsCmp.prototype._getAll = function () {
        var _this = this;
        this._proveedorService
            .getAll()
            .subscribe(function (proveedores) {
            _this.proveedor = proveedores;
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', proveedor_service_1.Proveedor)
    ], ProveedorDetailsCmp.prototype, "proveedor", void 0);
    ProveedorDetailsCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/proveedor/templates/details.html',
            styleUrls: ['client/dev/proveedor/styles/cliente.css']
        }),
        __param(0, core_1.Inject(common_1.FormBuilder)),
        __param(4, core_1.Inject(login_service_1.LoginService)), 
        __metadata('design:paramtypes', [common_1.FormBuilder, router_1.Router, router_1.RouteParams, proveedor_service_1.ProveedorService, login_service_1.LoginService])
    ], ProveedorDetailsCmp);
    return ProveedorDetailsCmp;
}());
exports.ProveedorDetailsCmp = ProveedorDetailsCmp;
