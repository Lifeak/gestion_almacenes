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
var almacen_service_1 = require('../../services/almacen/almacen-service');
var isloggedin_1 = require('../../services/isloggedin');
var AlmacenCreateCmp = (function () {
    function AlmacenCreateCmp(fb, _router, _routeParams, _almacenService) {
        this._router = _router;
        this._routeParams = _routeParams;
        this._almacenService = _almacenService;
        this.almacenForm = fb.group({
            "nombre": ["", common_1.Validators.required],
            "direccion": ["", common_1.Validators.required],
            "ciudad": ["", common_1.Validators.required],
            "pais": ["", common_1.Validators.required],
            "telefono": ["", common_1.Validators.required],
            "encargado": ["", common_1.Validators.required]
        });
    }
    AlmacenCreateCmp.prototype.gotoIndex = function () {
        var userId = this.almacen ? this.almacen._id : null;
        this._router.navigate(['/ListAlmacen']);
    };
    AlmacenCreateCmp.prototype.goBack = function () {
        window.history.back();
    };
    AlmacenCreateCmp.prototype.save = function (datos) {
        var _this = this;
        var nombre = this.almacenForm.controls['nombre'].value;
        var direccion = this.almacenForm.controls['direccion'].value;
        var ciudad = this.almacenForm.controls['ciudad'].value;
        var pais = this.almacenForm.controls['pais'].value;
        var telefono = this.almacenForm.controls['telefono'].value;
        var encargado = this.almacenForm.controls['encargado'].value;
        this._almacenService
            .add(nombre, direccion, ciudad, pais, telefono, encargado)
            .subscribe(function (m) {
            _this.almacenForm.controls['nombre'].updateValue("");
            _this.almacenForm.controls['direccion'].updateValue("");
            _this.almacenForm.controls['ciudad'].updateValue("");
            _this.almacenForm.controls['pais'].updateValue("");
            _this.almacenForm.controls['telefono'].updateValue("");
            _this.almacenForm.controls['encargado'].updateValue("");
        });
        this.gotoIndex();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', almacen_service_1.Almacen)
    ], AlmacenCreateCmp.prototype, "almacen", void 0);
    AlmacenCreateCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/almacen/templates/create.html'
        }),
        router_1.CanActivate(function () { return isloggedin_1.isLoggedinAdmin(); }),
        __param(0, core_1.Inject(common_1.FormBuilder)), 
        __metadata('design:paramtypes', [common_1.FormBuilder, router_1.Router, router_1.RouteParams, almacen_service_1.AlmacenService])
    ], AlmacenCreateCmp);
    return AlmacenCreateCmp;
}());
exports.AlmacenCreateCmp = AlmacenCreateCmp;
