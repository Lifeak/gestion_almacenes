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
var isloggedin_1 = require('../../services/isloggedin');
var garantia_service_1 = require('../../services/garantia/garantia-service');
var login_service_1 = require('../../services/login-service');
var GarantiaDetailsCmp = (function () {
    function GarantiaDetailsCmp(fb, _router, _routeParams, _garantiaService, _loginService) {
        this._router = _router;
        this._routeParams = _routeParams;
        this._garantiaService = _garantiaService;
        this._loginService = _loginService;
        this.garantiaForm = fb.group({
            "_id": ["", common_1.Validators.required],
            "tiempo": ["", common_1.Validators.required]
        });
    }
    GarantiaDetailsCmp.prototype.ngOnInit = function () {
        var _this = this;
        var id = this._routeParams.get('id');
        this._garantiaService
            .getGarantiaId(id)
            .subscribe(function (garantia) {
            _this.garantia = garantia;
        });
    };
    GarantiaDetailsCmp.prototype.gotoIndex = function () {
        var userId = this.garantia ? this.garantia._id : null;
        this._router.navigate(['/ListGarantias']);
    };
    GarantiaDetailsCmp.prototype._getAll = function () {
        var _this = this;
        this._garantiaService
            .getAll()
            .subscribe(function (garantia) {
            _this.garantia = garantia;
        });
    };
    GarantiaDetailsCmp.prototype.edit = function (garantia) {
        var _this = this;
        var id = this._routeParams.get('id');
        alert("nos llega a editar:" + garantia._id + " pero vamos a borrar " + id);
        this._garantiaService
            .remove(id)
            .subscribe(function () {
            return _this.garantia;
        });
        this._garantiaService
            .add(garantia._id, garantia.tiempo)
            .subscribe(function (m) {
            _this.garantiaForm.controls['_id'].updateValue("");
            _this.garantiaForm.controls['tiempo'].updateValue("");
        });
        this.gotoIndex();
    };
    GarantiaDetailsCmp.prototype.delete = function (garantia) {
        var _this = this;
        this._garantiaService
            .remove(garantia._id)
            .subscribe(function () {
            return _this.garantia;
        });
        this.gotoIndex();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', garantia_service_1.Garantia)
    ], GarantiaDetailsCmp.prototype, "garantia", void 0);
    GarantiaDetailsCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/garantia/templates/details.html'
        }),
        router_1.CanActivate(function () { return isloggedin_1.isLogged(); }),
        __param(0, core_1.Inject(common_1.FormBuilder)),
        __param(4, core_1.Inject(login_service_1.LoginService)), 
        __metadata('design:paramtypes', [common_1.FormBuilder, router_1.Router, router_1.RouteParams, garantia_service_1.GarantiaService, login_service_1.LoginService])
    ], GarantiaDetailsCmp);
    return GarantiaDetailsCmp;
}());
exports.GarantiaDetailsCmp = GarantiaDetailsCmp;
