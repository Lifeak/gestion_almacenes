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
var modelo_service_1 = require('../services/modelo-service');
var ModeloListCmp = (function () {
    function ModeloListCmp(_modeloService, _router, routeParams) {
        this._modeloService = _modeloService;
        this._router = _router;
        this.modelos = [];
        this._selectedId = routeParams.get('id');
    }
    ModeloListCmp.prototype.ngOnInit = function () {
        this._getAll();
    };
    ModeloListCmp.prototype._getAll = function () {
        var _this = this;
        this._modeloService
            .getAll()
            .subscribe(function (modelos) {
            _this.modelos = modelos;
        });
    };
    ModeloListCmp.prototype.isSelected = function (modelo) {
        return modelo._id === this._selectedId;
    };
    ModeloListCmp.prototype.onSelect = function (modelo) {
        this._router.navigate(['DetailsModelo', { id: modelo._id }]);
    };
    ModeloListCmp = __decorate([
        core_1.Component({
            selector: 'ListModelos',
            templateUrl: 'client/dev/modelo/templates/list.html',
            styleUrls: ['client/dev/modelo/styles/cliente.css'],
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [modelo_service_1.ModeloService]
        }), 
        __metadata('design:paramtypes', [modelo_service_1.ModeloService, router_1.Router, router_1.RouteParams])
    ], ModeloListCmp);
    return ModeloListCmp;
}());
exports.ModeloListCmp = ModeloListCmp;
