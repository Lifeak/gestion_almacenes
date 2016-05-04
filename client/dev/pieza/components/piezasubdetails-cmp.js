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
        this.modelos = [];
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
        this.components = [];
    }
    PiezaSubDetailsCmp.prototype.ngOnInit = function () {
        var _this = this;
        var id = this._routeParams.get('_id');
        this._piezaService
            .getPiezaId(id)
            .subscribe(function (pieza) {
            _this.pieza = pieza;
            _this.components = _this.pieza.compuestoPor;
        });
        this._piezaService
            .getModelos()
            .subscribe(function (modelos) {
            _this.modelos = modelos;
        });
    };
    PiezaSubDetailsCmp.prototype.gotoIndex = function () {
        this._router.navigate(['/ListPiezas']);
    };
    PiezaSubDetailsCmp.prototype.goBack = function () {
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
    PiezaSubDetailsCmp.prototype.buscar = function (numserie) {
        alert("buscamos esta pieza " + numserie);
        this._router.navigate(['DetailsSubPieza', { _id: numserie }]);
    };
    PiezaSubDetailsCmp.prototype.edit = function (pieza) {
        var _this = this;
        var id = this._routeParams.get('_id');
        if (pieza.precio == null) {
            this._piezaService
                .remove(id)
                .subscribe(function () {
                return _this.pieza;
            });
            var compuestoPor = this.components;
            this._piezaService
                .add(pieza._id, pieza.modelo, pieza.estado, pieza.lote, pieza.caracterisiticas, pieza.almacen, pieza.almacenOrigen, pieza.vendido, pieza.compuestoPor, pieza.precio)
                .subscribe(function (m) {
                _this.piezaForm.controls['_id'].updateValue("");
                _this.piezaForm.controls['modelo'].updateValue("");
                _this.piezaForm.controls['estado'].updateValue("");
                _this.piezaForm.controls['lote'].updateValue("");
                _this.piezaForm.controls['caracteristicas'].updateValue("");
                _this.piezaForm.controls['almacen'].updateValue("");
                _this.piezaForm.controls['almacenOrigen'].updateValue("");
                _this.piezaForm.controls['vendido'].updateValue("");
                _this.piezaForm.controls['precio'].updateValue("");
            });
        }
        else if (pieza.precio.toString().indexOf(',') != -1) {
            alert("Error.La pieza no se puede modificar ya que el precio es incorrecto. Utiliza el . para los decimales.");
        }
        else {
            this._piezaService
                .remove(id)
                .subscribe(function () {
                return _this.pieza;
            });
            var compuestoPor = this.components;
            this._piezaService
                .add(pieza._id, pieza.modelo, pieza.estado, pieza.lote, pieza.caracterisiticas, pieza.almacen, pieza.almacenOrigen, pieza.vendido, pieza.compuestoPor, pieza.precio)
                .subscribe(function (m) {
                _this.piezaForm.controls['_id'].updateValue("");
                _this.piezaForm.controls['modelo'].updateValue("");
                _this.piezaForm.controls['estado'].updateValue("");
                _this.piezaForm.controls['lote'].updateValue("");
                _this.piezaForm.controls['caracteristicas'].updateValue("");
                _this.piezaForm.controls['almacen'].updateValue("");
                _this.piezaForm.controls['almacenOrigen'].updateValue("");
                _this.piezaForm.controls['vendido'].updateValue("");
                _this.piezaForm.controls['precio'].updateValue("");
            });
        }
    };
    PiezaSubDetailsCmp.prototype.plus = function (data) {
        var nombre = this.piezaForm.controls['compuestoPor'].value;
        this.components.push(nombre);
        this.piezaForm.controls['compuestoPor'].updateValue("");
    };
    PiezaSubDetailsCmp.prototype.minus = function (nombre) {
        this.components.splice(this.components.indexOf(nombre), 1);
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
