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
var piezalist_cmp_1 = require('./piezalist-cmp');
var piezadetails_cmp_1 = require('./piezadetails-cmp');
var piezasubdetails_cmp_1 = require('./piezasubdetails-cmp');
var piezacreate_cmp_1 = require('./piezacreate-cmp');
var PiezaCmp = (function () {
    function PiezaCmp(fb, _piezaService, _loginService, router) {
        this._piezaService = _piezaService;
        this._loginService = _loginService;
        this.router = router;
        this.piezas = [];
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
            "precio": [""],
        });
    }
    PiezaCmp.prototype.ngOnInit = function () {
        this._getAll();
        this.router.navigate(['/ListPiezas']);
    };
    PiezaCmp.prototype._getAll = function () {
        var _this = this;
        this._piezaService
            .getAll()
            .subscribe(function (piezas) {
            _this.piezas = piezas;
        });
    };
    PiezaCmp.prototype.isSelected = function (pieza) {
        return pieza._id === this._selectedId;
    };
    PiezaCmp.prototype.onSelect = function (pieza) {
        this.router.navigate(['DetailsPieza', { id: pieza._id }]);
    };
    PiezaCmp.prototype.add = function (_id, modelo, estado, lote, caracteristicas, almcen, almacenOrigen, vendido, compuestoPor, precio) {
        var _this = this;
        this._piezaService
            .add(_id, modelo, estado, lote, caracteristicas, almcen, almacenOrigen, vendido, compuestoPor, precio)
            .subscribe(function (m) {
            _this.piezas.push(m);
            _this.piezaForm.controls['_id'].updateValue("");
            _this.piezaForm.controls['modelo'].updateValue("");
            _this.piezaForm.controls['estado'].updateValue("");
            _this.piezaForm.controls['lote'].updateValue("");
            _this.piezaForm.controls['caracteristicas'].updateValue("");
            _this.piezaForm.controls['almacen'].updateValue("");
            _this.piezaForm.controls['almacenOrigen'].updateValue("");
            _this.piezaForm.controls['vendido'].updateValue("");
            _this.piezaForm.controls['compuestoPor'].updateValue("");
            _this.piezaForm.controls['precio'].updateValue("");
        });
    };
    PiezaCmp.prototype.remove = function (id) {
        var _this = this;
        this._piezaService
            .remove(id)
            .subscribe(function () {
            _this.piezas.forEach(function (t, i) {
                if (t._id === id)
                    return _this.piezas.splice(i, 1);
            });
        });
    };
    PiezaCmp.prototype.logout = function () {
        this._loginService.logout();
        window.location.replace("http://localhost:3000/");
    };
    PiezaCmp.prototype.compras = function () {
        window.location.replace("http://localhost:3000/#/compras");
    };
    PiezaCmp.prototype.ventas = function () {
        window.location.replace("http://localhost:3000/#/ventas");
    };
    PiezaCmp.prototype.almacen = function () {
        window.location.replace("http://localhost:3000/#/almacen");
    };
    PiezaCmp.prototype.admin = function () {
        window.location.replace("http://localhost:3000/#/admin");
    };
    PiezaCmp = __decorate([
        core_1.Component({
            selector: 'pieza-cmp',
            templateUrl: 'client/dev/pieza/templates/index.html',
            styleUrls: ['client/dev/pieza/styles/cliente.css'],
            providers: [pieza_service_1.PiezaService, login_service_1.LoginService, router_1.ROUTER_PROVIDERS],
            directives: [router_1.ROUTER_DIRECTIVES]
        }),
        router_1.RouteConfig([
            { path: '/Piezas', name: 'ListPiezas', component: piezalist_cmp_1.PiezaListCmp },
            { path: '/Create', name: 'CreatePieza', component: piezacreate_cmp_1.PiezaCreateCmp },
            { path: '/Details', name: 'DetailsPieza', component: piezadetails_cmp_1.PiezaDetailsCmp },
            { path: '/Detailss', name: 'DetailsSubPieza', component: piezasubdetails_cmp_1.PiezaSubDetailsCmp }
        ]),
        __param(0, core_1.Inject(common_1.FormBuilder)),
        __param(1, core_1.Inject(pieza_service_1.PiezaService)),
        __param(2, core_1.Inject(login_service_1.LoginService)), 
        __metadata('design:paramtypes', [common_1.FormBuilder, pieza_service_1.PiezaService, login_service_1.LoginService, router_1.Router])
    ], PiezaCmp);
    return PiezaCmp;
}());
exports.PiezaCmp = PiezaCmp;
