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
var isloggedin_1 = require('../../login/services/isloggedin');
var ProductoCreateCmp = (function () {
    function ProductoCreateCmp(fb, _router, _routeParams, _productoService) {
        this._router = _router;
        this._routeParams = _routeParams;
        this._productoService = _productoService;
        this.modelos = [];
        this.productoForm = fb.group({
            "_id": ["", common_1.Validators.required],
            "nombre": ["", common_1.Validators.required],
            "modelo": ["", common_1.Validators.required],
            "estado": ["", common_1.Validators.required],
            "caracteristicas": [""],
            "almacen": ["", common_1.Validators.required],
            "vendido": ["", common_1.Validators.required],
            "carcasa": ["", common_1.Validators.required],
            "columna": ["", common_1.Validators.required],
            "precio": [""]
        });
        this.components = [];
    }
    ProductoCreateCmp.prototype.ngOnInit = function () {
        var _this = this;
        this._productoService
            .getModelos()
            .subscribe(function (modelos) {
            _this.modelos = modelos;
        });
    };
    ProductoCreateCmp.prototype.gotoIndex = function () {
        this._router.navigate(['/ListProductos']);
    };
    ProductoCreateCmp.prototype.goBack = function () {
        window.history.back();
    };
    ProductoCreateCmp.prototype.save = function (datos) {
        var _this = this;
        var _id = this.productoForm.controls['_id'].value;
        var nombre = this.productoForm.controls['nombre'].value;
        var modelo = this.productoForm.controls['modelo'].value;
        var estado = this.productoForm.controls['estado'].value;
        var caracteristicas = this.productoForm.controls['caracteristicas'].value;
        var almacen = this.productoForm.controls['almacen'].value;
        var vendido = this.productoForm.controls['vendido'].value;
        var carcasa = this.productoForm.controls['carcasa'].value;
        var columna = this.productoForm.controls['columna'].value;
        this.components.push(carcasa);
        this.components.push(columna);
        var compuestoPor = this.components;
        var precio = this.productoForm.controls['precio'].value;
        if (precio.toString().indexOf(',') != -1) {
            alert("El producto no se añadirá ya que el precio es incorrecto. Utiliza el . para los decimales.");
        }
        else {
            this._productoService
                .add(_id, nombre, modelo, estado, caracteristicas, almacen, vendido, compuestoPor, precio)
                .subscribe(function (m) {
                _this.productoForm.controls['_id'].updateValue("");
                _this.productoForm.controls['nombre'].updateValue("");
                _this.productoForm.controls['modelo'].updateValue("");
                _this.productoForm.controls['estado'].updateValue("");
                _this.productoForm.controls['caracteristicas'].updateValue("");
                _this.productoForm.controls['almacen'].updateValue("");
                _this.productoForm.controls['vendido'].updateValue("");
                _this.productoForm.controls['carcasa'].updateValue("");
                _this.productoForm.controls['columna'].updateValue("");
                _this.productoForm.controls['precio'].updateValue("");
            });
            this.gotoIndex();
        }
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', producto_service_1.Producto)
    ], ProductoCreateCmp.prototype, "producto", void 0);
    ProductoCreateCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/producto/templates/create.html',
            styleUrls: ['client/dev/producto/styles/cliente.css']
        }),
        router_1.CanActivate(function () { return isloggedin_1.isLogged(); }),
        __param(0, core_1.Inject(common_1.FormBuilder)), 
        __metadata('design:paramtypes', [common_1.FormBuilder, router_1.Router, router_1.RouteParams, producto_service_1.ProductoService])
    ], ProductoCreateCmp);
    return ProductoCreateCmp;
}());
exports.ProductoCreateCmp = ProductoCreateCmp;
