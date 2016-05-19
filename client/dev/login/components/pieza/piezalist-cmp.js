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
var pieza_service_1 = require('../services/pieza-service');
var isloggedin_1 = require('../../login/services/isloggedin');
var PiezaListCmp = (function () {
    function PiezaListCmp(_piezaService, _router, routeParams) {
        this._piezaService = _piezaService;
        this._router = _router;
        this.piezas = [];
        this._selectedId = routeParams.get('id');
    }
    PiezaListCmp.prototype.ngOnInit = function () {
        this._getAll();
    };
    PiezaListCmp.prototype._getAll = function () {
        var _this = this;
        this._piezaService
            .getAll()
            .subscribe(function (piezas) {
            _this.piezas = piezas;
        });
    };
    PiezaListCmp.prototype.isSelected = function (pieza) {
        return pieza._id === this._selectedId;
    };
    PiezaListCmp.prototype.onSelect = function (pieza) {
        this._router.navigate(['DetailsPieza', { id: pieza._id }]);
    };
    PiezaListCmp = __decorate([
        core_1.Component({
            selector: 'ListPiezas',
            templateUrl: 'client/dev/pieza/templates/list.html',
            styleUrls: ['client/dev/pieza/styles/cliente.css'],
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [pieza_service_1.PiezaService]
        }),
        router_1.CanActivate(function () { return isloggedin_1.isLogged(); }), 
        __metadata('design:paramtypes', [pieza_service_1.PiezaService, router_1.Router, router_1.RouteParams])
    ], PiezaListCmp);
    return PiezaListCmp;
}());
exports.PiezaListCmp = PiezaListCmp;
