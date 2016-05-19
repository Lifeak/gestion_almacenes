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
var login_service_1 = require('../../services/login-service');
var producto_service_1 = require('../../services/producto/producto-service');
var ProductoListCmp = (function () {
    function ProductoListCmp(_productoService, _loginService, _router, routeParams) {
        this._productoService = _productoService;
        this._loginService = _loginService;
        this._router = _router;
        this.productos = [];
        this._selectedId = routeParams.get('id');
    }
    ProductoListCmp.prototype.ngOnInit = function () {
        this._getAll();
    };
    ProductoListCmp.prototype._getAll = function () {
        var _this = this;
        this._productoService
            .getAll()
            .subscribe(function (productos) {
            _this.productos = productos;
        });
    };
    ProductoListCmp.prototype.isSelected = function (producto) {
        return producto._id === this._selectedId;
    };
    ProductoListCmp.prototype.onSelect = function (producto) {
        this._router.navigate(['DetailsProducto', { id: producto._id }]);
    };
    ProductoListCmp = __decorate([
        core_1.Component({
            selector: 'ListProductos',
            templateUrl: 'client/dev/producto/templates/list.html',
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [producto_service_1.ProductoService]
        }),
        router_1.CanActivate(function () { return isloggedin_1.isLogged(); }), 
        __metadata('design:paramtypes', [producto_service_1.ProductoService, login_service_1.LoginService, router_1.Router, router_1.RouteParams])
    ], ProductoListCmp);
    return ProductoListCmp;
}());
exports.ProductoListCmp = ProductoListCmp;
