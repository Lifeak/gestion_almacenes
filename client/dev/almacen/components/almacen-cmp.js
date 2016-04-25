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
var almacen_service_1 = require('../services/almacen-service');
var login_service_1 = require('../../login/services/login-service');
var almacenlist_cmp_1 = require('./almacenlist-cmp');
var almacendetails_cmp_1 = require('./almacendetails-cmp');
var almacencreate_cmp_1 = require('./almacencreate-cmp');
var isloggedin_1 = require('../../login/services/isloggedin');
var AlmacenCmp = (function () {
    function AlmacenCmp(fb, _almacenService, _loginService, router) {
        this._almacenService = _almacenService;
        this._loginService = _loginService;
        this.router = router;
        this.almacens = [];
        this.almacenForm = fb.group({
            "nombre": ["", common_1.Validators.required],
            "direccion": ["", common_1.Validators.required],
            "ciudad": ["", common_1.Validators.required],
            "pais": ["", common_1.Validators.required],
            "telefono": ["", common_1.Validators.required],
            "encargado": ["", common_1.Validators.required]
        });
    }
    AlmacenCmp.prototype.ngOnInit = function () {
        this._getAll();
        this.router.navigate(['/ListAlmacen']);
    };
    AlmacenCmp.prototype._getAll = function () {
        var _this = this;
        this._almacenService
            .getAll()
            .subscribe(function (almacens) {
            _this.almacens = almacens;
            alert("almacen tiene todo esto  " + _this.almacens);
        });
    };
    AlmacenCmp.prototype.isSelected = function (almacen) {
        return almacen._id === this._selectedId;
    };
    AlmacenCmp.prototype.onSelect = function (almacen) {
        this.router.navigate(['DetailsAlmacen', { id: almacen._id }]);
    };
    AlmacenCmp.prototype.add = function (nombre, direccion, ciudad, pais, telefono, encargado) {
        var _this = this;
        this._almacenService
            .add(nombre, direccion, ciudad, pais, telefono, encargado)
            .subscribe(function (m) {
            _this.almacens.push(m);
            _this.almacenForm.controls['nombre'].updateValue("");
            _this.almacenForm.controls['direccion'].updateValue("");
            _this.almacenForm.controls['ciudad'].updateValue("");
            _this.almacenForm.controls['pais'].updateValue("");
            _this.almacenForm.controls['telefono'].updateValue("");
            _this.almacenForm.controls['encargado'].updateValue("");
        });
    };
    AlmacenCmp.prototype.remove = function (id) {
        var _this = this;
        this._almacenService
            .remove(id)
            .subscribe(function () {
            _this.almacens.forEach(function (t, i) {
                if (t._id === id)
                    return _this.almacens.splice(i, 1);
            });
        });
    };
    AlmacenCmp.prototype.logout = function () {
        this._loginService.logout();
        window.location.replace("http://localhost:3000/");
    };
    AlmacenCmp.prototype.compras = function () {
        window.location.replace("http://localhost:3000/#/compras");
    };
    AlmacenCmp.prototype.ventas = function () {
        window.location.replace("http://localhost:3000/#/ventas");
    };
    AlmacenCmp.prototype.goalmacen = function () {
        window.location.replace("http://localhost:3000/#/almacen");
    };
    AlmacenCmp.prototype.admin = function () {
        window.location.replace("http://localhost:3000/#/admin");
    };
    AlmacenCmp = __decorate([
        core_1.Component({
            selector: 'almacen-cmp',
            templateUrl: 'client/dev/almacen/templates/index.html',
            providers: [almacen_service_1.AlmacenService, login_service_1.LoginService, router_1.ROUTER_PROVIDERS],
            directives: [router_1.ROUTER_DIRECTIVES]
        }),
        router_1.RouteConfig([
            { path: '/ListAlmacen', name: 'ListAlmacen', component: almacenlist_cmp_1.AlmacenListCmp },
            { path: '/Create', name: 'CreateAlmacen', component: almacencreate_cmp_1.AlmacenCreateCmp },
            { path: '/Details', name: 'DetailsAlmacen', component: almacendetails_cmp_1.AlmacenDetailsCmp }
        ]),
        router_1.CanActivate(function () { return isloggedin_1.isLogged(); }),
        __param(0, core_1.Inject(common_1.FormBuilder)),
        __param(1, core_1.Inject(almacen_service_1.AlmacenService)),
        __param(2, core_1.Inject(login_service_1.LoginService)), 
        __metadata('design:paramtypes', [common_1.FormBuilder, almacen_service_1.AlmacenService, login_service_1.LoginService, router_1.Router])
    ], AlmacenCmp);
    return AlmacenCmp;
}());
exports.AlmacenCmp = AlmacenCmp;
