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
var garantia_service_1 = require('../services/garantia-service');
var login_service_1 = require('../../login/services/login-service');
var garantialist_cmp_1 = require('./garantialist-cmp');
var garantiadetails_cmp_1 = require('./garantiadetails-cmp');
var garantiacreate_cmp_1 = require('./garantiacreate-cmp');
var isloggedin_1 = require('../../login/services/isloggedin');
var GarantiaCmp = (function () {
    function GarantiaCmp(fb, _garantiaService, _loginService, router) {
        this._garantiaService = _garantiaService;
        this._loginService = _loginService;
        this.router = router;
        this.garantias = [];
        this.garantiaForm = fb.group({
            "_id": ["", common_1.Validators.required],
            "tiempo": ["", common_1.Validators.required]
        });
    }
    GarantiaCmp.prototype.ngOnInit = function () {
        this._getAll();
        this.router.navigate(['/ListGarantias']);
    };
    GarantiaCmp.prototype._getAll = function () {
        var _this = this;
        this._garantiaService
            .getAll()
            .subscribe(function (garantias) {
            _this.garantias = garantias;
        });
    };
    GarantiaCmp.prototype.isSelected = function (garantia) {
        return garantia._id === this._selectedId;
    };
    GarantiaCmp.prototype.onSelect = function (garantia) {
        this.router.navigate(['DetailsGarantia', { id: garantia._id }]);
    };
    GarantiaCmp.prototype.add = function (_id, tiempo) {
        var _this = this;
        this._garantiaService
            .add(_id, tiempo)
            .subscribe(function (m) {
            _this.garantias.push(m);
            _this.garantiaForm.controls['_id'].updateValue("");
            _this.garantiaForm.controls['tiempo'].updateValue("");
        });
    };
    GarantiaCmp.prototype.remove = function (id) {
        var _this = this;
        this._garantiaService
            .remove(id)
            .subscribe(function () {
            _this.garantias.forEach(function (t, i) {
                if (t._id === id)
                    return _this.garantias.splice(i, 1);
            });
        });
    };
    GarantiaCmp.prototype.logout = function () {
        this._loginService.logout();
        window.location.replace("http://localhost:3000/");
    };
    GarantiaCmp.prototype.compras = function () {
        window.location.replace("http://localhost:3000/#/compras");
    };
    GarantiaCmp.prototype.ventas = function () {
        window.location.replace("http://localhost:3000/#/ventas");
    };
    GarantiaCmp.prototype.goalmacen = function () {
        window.location.replace("http://localhost:3000/#/almacen");
    };
    GarantiaCmp.prototype.admin = function () {
        window.location.replace("http://localhost:3000/#/admin");
    };
    GarantiaCmp = __decorate([
        core_1.Component({
            selector: 'garantia-cmp',
            templateUrl: 'client/dev/garantia/templates/index.html',
            providers: [garantia_service_1.GarantiaService, login_service_1.LoginService, router_1.ROUTER_PROVIDERS],
            directives: [router_1.ROUTER_DIRECTIVES]
        }),
        router_1.RouteConfig([
            { path: '/ListGarantias', name: 'ListGarantias', component: garantialist_cmp_1.GarantiaListCmp },
            { path: '/Create', name: 'CreateGarantia', component: garantiacreate_cmp_1.GarantiaCreateCmp },
            { path: '/Details', name: 'DetailsGarantia', component: garantiadetails_cmp_1.GarantiaDetailsCmp }
        ]),
        router_1.CanActivate(function () { return isloggedin_1.isLogged(); }),
        __param(0, core_1.Inject(common_1.FormBuilder)),
        __param(1, core_1.Inject(garantia_service_1.GarantiaService)),
        __param(2, core_1.Inject(login_service_1.LoginService)), 
        __metadata('design:paramtypes', [common_1.FormBuilder, garantia_service_1.GarantiaService, login_service_1.LoginService, router_1.Router])
    ], GarantiaCmp);
    return GarantiaCmp;
}());
exports.GarantiaCmp = GarantiaCmp;
