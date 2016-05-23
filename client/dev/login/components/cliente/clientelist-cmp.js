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
var isloggedin_1 = require('../../services/isloggedin');
var cliente_service_1 = require('../../services/cliente/cliente-service');
var ClienteListCmp = (function () {
    function ClienteListCmp(_clienteService, _router, routeParams) {
        this._clienteService = _clienteService;
        this._router = _router;
        this.clientes = [];
        this._selectedId = routeParams.get('id');
    }
    ClienteListCmp.prototype.ngOnInit = function () {
        this._getAll();
    };
    ClienteListCmp.prototype._getAll = function () {
        var _this = this;
        this._clienteService
            .getAll()
            .subscribe(function (clientes) {
            _this.clientes = clientes;
        });
    };
    ClienteListCmp.prototype.isSelected = function (cliente) {
        return cliente._id === this._selectedId;
    };
    ClienteListCmp.prototype.onSelect = function (cliente) {
        this._router.navigate(['DetailsCliente', { id: cliente._id }]);
    };
    ClienteListCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/cliente/templates/list.html',
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [cliente_service_1.ClienteService]
        }),
        router_1.CanActivate(function () { return isloggedin_1.isLogged(); }), 
        __metadata('design:paramtypes', [cliente_service_1.ClienteService, router_1.Router, router_1.RouteParams])
    ], ClienteListCmp);
    return ClienteListCmp;
}());
exports.ClienteListCmp = ClienteListCmp;
