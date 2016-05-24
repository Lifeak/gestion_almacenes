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
var producto_service_1 = require('../../services/producto/producto-service');
var login_service_1 = require('../../services/login-service');
var isloggedin_1 = require('../../services/isloggedin');
var ProductoSubDetailsCmp = (function () {
    function ProductoSubDetailsCmp(fb, router, _routeParams, _productoService, _loginService) {
        this.router = router;
        this._routeParams = _routeParams;
        this._productoService = _productoService;
        this._loginService = _loginService;
        this.productoForm = fb.group({
            "_id": ["", common_1.Validators.required],
            "nombre": ["", common_1.Validators.required],
            "modelo": ["", common_1.Validators.required],
            "estado": ["", common_1.Validators.required],
            "caracteristicas": [""],
            "almacen": ["", common_1.Validators.required],
            "vendido": ["", common_1.Validators.required],
            "compuestoPor": ["", common_1.Validators.required],
            "precio": [""]
        });
    }
    ProductoSubDetailsCmp.prototype.ngOnInit = function () {
        var _this = this;
        this._productoService
            .getProductoName(name)
            .subscribe(function (producto) {
            _this.producto = producto;
        });
    };
    ProductoSubDetailsCmp.prototype.gotoIndex = function () {
        var productoName = this.producto ? this.producto._id : null;
        window.history.back();
    };
    ProductoSubDetailsCmp.prototype._getAll = function () {
        var _this = this;
        this._productoService
            .getAll()
            .subscribe(function (productos) {
            _this.producto = productos;
        });
    };
    ProductoSubDetailsCmp.prototype.buscar = function (nombre) {
        //alert("buscamos este nombre "+nombre);
        this.router.navigate(['DetailsSubProducto', { nombre: nombre }]);
    };
    ProductoSubDetailsCmp.prototype.logout = function () {
        this._loginService.logout();
        this.router.navigate(['/Login']);
    };
    ProductoSubDetailsCmp.prototype.compras = function () {
        this.router.navigate(['/Compras']);
    };
    ProductoSubDetailsCmp.prototype.ventas = function () {
        this.router.navigate(['/Ventas']);
    };
    ProductoSubDetailsCmp.prototype.almacen = function () {
        this.router.navigate(['/Almacen']);
    };
    ProductoSubDetailsCmp.prototype.admin = function () {
        this.router.navigate(['/Admin']);
    };
    ProductoSubDetailsCmp.prototype.gproductos = function () {
        this.router.navigate(['/ListProductos']);
    };
    ProductoSubDetailsCmp.prototype.gpiezas = function () {
        this.router.navigate(['/ListPiezas']);
    };
    ProductoSubDetailsCmp.prototype.gmodelos = function () {
        this.router.navigate(['/ListModelos']);
    };
    ProductoSubDetailsCmp.prototype.gproveedores = function () {
        this.router.navigate(['/ListProveedores']);
    };
    ProductoSubDetailsCmp.prototype.gusuarios = function () {
        this.router.navigate(['/ListUsuarios']);
    };
    ProductoSubDetailsCmp.prototype.ggarantias = function () {
        this.router.navigate(['/ListGarantias']);
    };
    ProductoSubDetailsCmp.prototype.galmacenes = function () {
        this.router.navigate(['/ListAlmacenes']);
    };
    ProductoSubDetailsCmp.prototype.gclientes = function () {
        this.router.navigate(['/ListClientes']);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', producto_service_1.Producto)
    ], ProductoSubDetailsCmp.prototype, "producto", void 0);
    ProductoSubDetailsCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/producto/templates/detailss.html'
        }),
        router_1.CanActivate(function () { return isloggedin_1.isLogged(); }),
        __param(0, core_1.Inject(common_1.FormBuilder)),
        __param(4, core_1.Inject(login_service_1.LoginService)), 
        __metadata('design:paramtypes', [common_1.FormBuilder, router_1.Router, router_1.RouteParams, producto_service_1.ProductoService, login_service_1.LoginService])
    ], ProductoSubDetailsCmp);
    return ProductoSubDetailsCmp;
}());
exports.ProductoSubDetailsCmp = ProductoSubDetailsCmp;