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
var producto_service_1 = require('../services/producto-service');
var login_service_1 = require('../../login/services/login-service');
var productolist_cmp_1 = require('./productolist-cmp');
var productodetails_cmp_1 = require('./productodetails-cmp');
var productosubdetails_cmp_1 = require('./productosubdetails-cmp');
var productocreate_cmp_1 = require('./productocreate-cmp');
var ProductoCmp = (function () {
    function ProductoCmp(fb, _productoService, _loginService, router) {
        this._productoService = _productoService;
        this._loginService = _loginService;
        this.router = router;
        this.productos = [];
        this.productoForm = fb.group({
            "_id": ["", common_1.Validators.required],
            "nombre": ["", common_1.Validators.required],
            "modelo": ["", common_1.Validators.required],
            "estado": ["", common_1.Validators.required],
            "caracteristicas": [""],
            "almacen": ["", common_1.Validators.required],
            "vendido": ["", common_1.Validators.required],
            "compuestoPor": [""],
            "precio": [""],
        });
    }
    ProductoCmp.prototype.ngOnInit = function () {
        this._getAll();
        this.router.navigate(['/ListProductos']);
    };
    ProductoCmp.prototype._getAll = function () {
        var _this = this;
        this._productoService
            .getAll()
            .subscribe(function (productos) {
            _this.productos = productos;
        });
    };
    ProductoCmp.prototype.isSelected = function (producto) {
        return producto._id === this._selectedId;
    };
    ProductoCmp.prototype.onSelect = function (producto) {
        this.router.navigate(['DetailsProducto', { id: producto._id }]);
    };
    ProductoCmp.prototype.add = function (_id, nombre, modelo, estado, caracteristicas, almacen, vendido, compuestoPor, precio) {
        var _this = this;
        this._productoService
            .add(_id, nombre, modelo, estado, caracteristicas, almacen, vendido, compuestoPor, precio)
            .subscribe(function (m) {
            _this.productos.push(m);
            _this.productoForm.controls['_id'].updateValue("");
            _this.productoForm.controls['nombre'].updateValue("");
            _this.productoForm.controls['modelo'].updateValue("");
            _this.productoForm.controls['estado'].updateValue("");
            _this.productoForm.controls['caracteristicas'].updateValue("");
            _this.productoForm.controls['almacen'].updateValue("");
            _this.productoForm.controls['vendido'].updateValue("");
            _this.productoForm.controls['compuestoPor'].updateValue("");
            _this.productoForm.controls['precio'].updateValue("");
        });
    };
    ProductoCmp.prototype.remove = function (id) {
        var _this = this;
        this._productoService
            .remove(id)
            .subscribe(function () {
            _this.productos.forEach(function (t, i) {
                if (t._id === id)
                    return _this.productos.splice(i, 1);
            });
        });
    };
    ProductoCmp.prototype.logout = function () {
        this._loginService.logout();
        window.location.replace("http://localhost:3000/");
    };
    ProductoCmp.prototype.compras = function () {
        window.location.replace("http://localhost:3000/#/compras");
    };
    ProductoCmp.prototype.ventas = function () {
        window.location.replace("http://localhost:3000/#/ventas");
    };
    ProductoCmp.prototype.almacen = function () {
        window.location.replace("http://localhost:3000/#/almacen");
    };
    ProductoCmp.prototype.admin = function () {
        window.location.replace("http://localhost:3000/#/admin");
    };
    ProductoCmp = __decorate([
        core_1.Component({
            selector: 'producto-cmp',
            templateUrl: 'client/dev/producto/templates/index.html',
            styleUrls: ['client/dev/producto/styles/cliente.css'],
            providers: [producto_service_1.ProductoService, login_service_1.LoginService, router_1.ROUTER_PROVIDERS],
            directives: [router_1.ROUTER_DIRECTIVES]
        }),
        router_1.RouteConfig([
            { path: '/Productos', name: 'ListProductos', component: productolist_cmp_1.ProductoListCmp },
            { path: '/Create', name: 'CreateProducto', component: productocreate_cmp_1.ProductoCreateCmp },
            { path: '/Details', name: 'DetailsProducto', component: productodetails_cmp_1.ProductoDetailsCmp },
            { path: '/Detailss', name: 'DetailsSubProducto', component: productosubdetails_cmp_1.ProductoSubDetailsCmp }
        ]),
        __param(0, core_1.Inject(common_1.FormBuilder)),
        __param(1, core_1.Inject(producto_service_1.ProductoService)),
        __param(2, core_1.Inject(login_service_1.LoginService)), 
        __metadata('design:paramtypes', [common_1.FormBuilder, producto_service_1.ProductoService, login_service_1.LoginService, router_1.Router])
    ], ProductoCmp);
    return ProductoCmp;
}());
exports.ProductoCmp = ProductoCmp;
