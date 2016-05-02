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
var pieza_service_1 = require('../services/pieza-service');
var login_service_1 = require('../../login/services/login-service');
var PiezaSubDetailsCmp = (function () {
    function PiezaSubDetailsCmp(fb, _router, _routeParams, _piezaService, _loginService) {
        this._router = _router;
        this._routeParams = _routeParams;
        this._piezaService = _piezaService;
        this._loginService = _loginService;
        this.piezaForm = fb.group({
            "_id": ["", common_1.Validators.required],
            "modelo": ["", common_1.Validators.required],
            "estado": ["", common_1.Validators.required],
            "lote": ["", common_1.Validators.required],
            "caracteristicas": [""],
            "almacen": ["", common_1.Validators.required],
            "almacenOrigen": ["", common_1.Validators.required],
            "vendido": ["", common_1.Validators.required],
            "compuestoPor": [""],
            "precio": [""]
        });
    }
    PiezaSubDetailsCmp.prototype.ngOnInit = function () {
        var _this = this;
        this._piezaService
            .getPiezaName(name)
            .subscribe(function (pieza) {
            _this.pieza = pieza;
        });
    };
    PiezaSubDetailsCmp.prototype.gotoIndex = function () {
        var clienteName = this.pieza ? this.pieza._id : null;
        //this._router.navigate(['/ListModelos']);
        window.history.back();
    };
    PiezaSubDetailsCmp.prototype._getAll = function () {
        var _this = this;
        this._piezaService
            .getAll()
            .subscribe(function (piezas) {
            _this.pieza = piezas;
        });
    };
    PiezaSubDetailsCmp.prototype.buscar = function (nombre) {
        //alert("buscamos este nombre "+nombre);
        this._router.navigate(['DetailsSubPieza', { nombre: nombre }]);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', pieza_service_1.Pieza)
    ], PiezaSubDetailsCmp.prototype, "pieza", void 0);
    PiezaSubDetailsCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/pieza/templates/detailss.html',
            styleUrls: ['client/dev/pieza/styles/cliente.css']
        }),
        __param(0, core_1.Inject(common_1.FormBuilder)),
        __param(4, core_1.Inject(login_service_1.LoginService)), 
        __metadata('design:paramtypes', [common_1.FormBuilder, router_1.Router, router_1.RouteParams, pieza_service_1.PiezaService, login_service_1.LoginService])
    ], PiezaSubDetailsCmp);
    return PiezaSubDetailsCmp;
}());
exports.PiezaSubDetailsCmp = PiezaSubDetailsCmp;
