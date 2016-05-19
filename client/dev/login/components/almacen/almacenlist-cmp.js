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
var core_1 = require('angular2/core');
var router_1 = require('angular2/router');
var almacen_service_1 = require('../../services/almacen/almacen-service');
var isloggedin_1 = require('../../services/isloggedin');
var AlmacenListCmp = (function () {
    function AlmacenListCmp(_almacenService, _router, routeParams) {
        this._almacenService = _almacenService;
        this._router = _router;
        this.almacens = [];
        this._selectedId = routeParams.get('id');
    }
    AlmacenListCmp.prototype.ngOnInit = function () {
        this._getAll();
    };
    AlmacenListCmp.prototype._getAll = function () {
        var _this = this;
        this._almacenService
            .getAll()
            .subscribe(function (almacens) {
            _this.almacens = almacens;
        });
    };
    AlmacenListCmp.prototype.isSelected = function (almacen) {
        return almacen._id === this._selectedId;
    };
    AlmacenListCmp.prototype.onSelect = function (almacen) {
        this._router.navigate(['DetailsAlmacen', { id: almacen._id }]);
    };
    AlmacenListCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/almacen/templates/list.html',
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [almacen_service_1.AlmacenService]
        }),
        router_1.CanActivate(function () { return isloggedin_1.isLogged(); }), 
        __metadata('design:paramtypes', [almacen_service_1.AlmacenService, router_1.Router, router_1.RouteParams])
    ], AlmacenListCmp);
    return AlmacenListCmp;
}());
exports.AlmacenListCmp = AlmacenListCmp;
