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
var ProductoDetailsCmp = (function () {
    function ProductoDetailsCmp(fb, _router, _routeParams, _productoService, _loginService) {
        this._router = _router;
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
            "carcasa": ["", common_1.Validators.required],
            "columna": ["", common_1.Validators.required],
            "precio": [""]
        });
    }
    ProductoDetailsCmp.prototype.ngOnInit = function () {
        var _this = this;
        var id = this._routeParams.get('id');
        this._productoService
            .getProductoId(id)
            .subscribe(function (producto) {
            _this.producto = producto;
        });
    };
    ProductoDetailsCmp.prototype.gotoIndex = function () {
        var productoId = this.producto ? this.producto._id : null;
        this._router.navigate(['/ListProductos']);
    };
    ProductoDetailsCmp.prototype._getAll = function () {
        var _this = this;
        this._productoService
            .getAll()
            .subscribe(function (productos) {
            _this.producto = productos;
        });
    };
    ProductoDetailsCmp.prototype.buscar = function (nombre) {
        //alert("buscamos este nombre "+nombre);
        this._router.navigate(['DetailsSubPieza', { nombre: nombre }]);
    };
    ProductoDetailsCmp.prototype.edit = function (producto) {
        var _this = this;
        var id = this._routeParams.get('id');
        if (producto.precio.toString().indexOf(',') != -1) {
            alert("Error.El producto no se puede modificar ya que el precio es incorrecto. Utiliza el . para los decimales.");
        }
        else {
            this._productoService
                .remove(id)
                .subscribe(function () {
                return _this.producto;
            });
            this._productoService
                .add(producto._id, producto.nombre, producto.modelo, producto.estado, producto.caracteristicas, producto.almacen, producto.vendido, producto.compuestoPor, producto.precio)
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
    ProductoDetailsCmp.prototype.delete = function (producto) {
        var _this = this;
        var id = this._routeParams.get('id');
        this._productoService
            .remove(id)
            .subscribe(function () {
            return _this.producto;
        });
        this.gotoIndex();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', producto_service_1.Producto)
    ], ProductoDetailsCmp.prototype, "producto", void 0);
    ProductoDetailsCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/producto/templates/details.html',
            styleUrls: ['client/dev/producto/styles/cliente.css']
        }),
        router_1.CanActivate(function () { return isloggedin_1.isLogged(); }),
        __param(0, core_1.Inject(common_1.FormBuilder)),
        __param(4, core_1.Inject(login_service_1.LoginService)), 
        __metadata('design:paramtypes', [common_1.FormBuilder, router_1.Router, router_1.RouteParams, producto_service_1.ProductoService, login_service_1.LoginService])
    ], ProductoDetailsCmp);
    return ProductoDetailsCmp;
}());
exports.ProductoDetailsCmp = ProductoDetailsCmp;
