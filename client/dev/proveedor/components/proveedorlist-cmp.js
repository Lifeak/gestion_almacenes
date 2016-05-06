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
var proveedor_service_1 = require('../services/proveedor-service');
var ProveedorListCmp = (function () {
    function ProveedorListCmp(_proveedorService, _router, routeParams) {
        this._proveedorService = _proveedorService;
        this._router = _router;
        this.proveedors = [];
        this._selectedId = routeParams.get('id');
    }
    ProveedorListCmp.prototype.ngOnInit = function () {
        this._getAll();
    };
    ProveedorListCmp.prototype._getAll = function () {
        var _this = this;
        this._proveedorService
            .getAll()
            .subscribe(function (proveedores) {
            _this.proveedors = proveedores;
            alert("proveedores son" + _this.proveedors[1].nombre);
        });
    };
    ProveedorListCmp.prototype.isSelected = function (proveedor) {
        return proveedor._id === this._selectedId;
    };
    ProveedorListCmp.prototype.onSelect = function (proveedor) {
        this._router.navigate(['DetailsProveedor', { id: proveedor._id }]);
    };
    ProveedorListCmp = __decorate([
        core_1.Component({
            selector: 'ListProveedores',
            templateUrl: 'client/dev/proveedor/templates/list.html',
            styleUrls: ['client/dev/proveedor/styles/cliente.css'],
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [proveedor_service_1.ProveedorService]
        }), 
        __metadata('design:paramtypes', [proveedor_service_1.ProveedorService, router_1.Router, router_1.RouteParams])
    ], ProveedorListCmp);
    return ProveedorListCmp;
}());
exports.ProveedorListCmp = ProveedorListCmp;
