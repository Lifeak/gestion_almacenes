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
var isloggedin_1 = require('../../services/isloggedin');
var login_service_1 = require('../../services/login-service');
var proveedor_service_1 = require('../../services/proveedor/proveedor-service');
var user_service_1 = require('../../services/user/user-service');
var ProveedorCreateCmp = (function () {
    function ProveedorCreateCmp(fb, router, _loginService, _userService, _routeParams, _proveedorService) {
        this.router = router;
        this._loginService = _loginService;
        this._userService = _userService;
        this._routeParams = _routeParams;
        this._proveedorService = _proveedorService;
        this.mat = [];
        this.cuenta = [];
        this.proveedorForm = fb.group({
            "nombre": ["", common_1.Validators.required],
            "direccion": ["", common_1.Validators.required],
            "ciudad": ["", common_1.Validators.required],
            "pais": ["", common_1.Validators.required],
            "telefono": ["", common_1.Validators.required],
            "valoracion": [""],
            "pieza": [""],
            "refexterna": [""],
            "coste1": [""],
            "coste2": [""],
            "val": [""]
        });
    }
    ProveedorCreateCmp.prototype.gotoIndex = function () {
        this.router.navigate(['/ListProveedores']);
    };
    ProveedorCreateCmp.prototype.goBack = function () {
        window.history.back();
    };
    ProveedorCreateCmp.prototype.plus = function (datos) {
        var pieza = this.proveedorForm.controls['pieza'].value;
        var refexterna = this.proveedorForm.controls['refexterna'].value;
        var coste1 = this.proveedorForm.controls['coste1'].value;
        var coste2 = this.proveedorForm.controls['coste2'].value;
        var val = this.proveedorForm.controls['val'].value;
        if (pieza == "" || refexterna == "" || coste1.toString() == "") {
            alert("Debes rellenar todos los campos sobre la pieza a añadir");
        }
        else {
            this.proveedorForm.controls['pieza'].updateValue("");
            this.proveedorForm.controls['refexterna'].updateValue("");
            this.proveedorForm.controls['coste1'].updateValue("");
            this.proveedorForm.controls['coste2'].updateValue("");
            this.proveedorForm.controls['val'].updateValue("");
            this.cuenta.push(pieza);
            var m = { pieza: pieza, refexterna: refexterna, coste1: coste1, coste2: coste2, val: val };
            alert("añadimos el material " + JSON.stringify(m));
            this.mat.push(m);
            m = [];
        }
    };
    ProveedorCreateCmp.prototype.minus = function (pos) {
        this.mat.splice(pos, 1);
        this.cuenta.splice(pos, 1);
    };
    ProveedorCreateCmp.prototype.save = function (datos) {
        var _this = this;
        alert("entramos a guardar el proveedor");
        var nombre = this.proveedorForm.controls['nombre'].value;
        var direccion = this.proveedorForm.controls['direccion'].value;
        var ciudad = this.proveedorForm.controls['ciudad'].value;
        var pais = this.proveedorForm.controls['pais'].value;
        var telefono = this.proveedorForm.controls['telefono'].value;
        var valoracion = this.proveedorForm.controls['valoracion'].value;
        var pieza = this.proveedorForm.controls['pieza'].value;
        var refexterna = this.proveedorForm.controls['refexterna'].value;
        var coste1 = this.proveedorForm.controls['coste1'].value;
        var coste2 = this.proveedorForm.controls['coste2'].value;
        var val = this.proveedorForm.controls['val'].value;
        var materiales = this.mat;
        this._proveedorService
            .add(nombre, direccion, ciudad, pais, telefono, valoracion, materiales)
            .subscribe(function (m) {
            _this.proveedorForm.controls['nombre'].updateValue("");
            _this.proveedorForm.controls['direccion'].updateValue("");
            _this.proveedorForm.controls['ciudad'].updateValue("");
            _this.proveedorForm.controls['pais'].updateValue("");
            _this.proveedorForm.controls['telefono'].updateValue("");
            _this.proveedorForm.controls['valoracion'].updateValue("");
            _this.proveedorForm.controls['pieza'].updateValue("");
            _this.proveedorForm.controls['refexterna'].updateValue("");
            _this.proveedorForm.controls['coste1'].updateValue("");
        });
        this.gotoIndex();
    };
    ProveedorCreateCmp.prototype.logout = function () {
        this._loginService.logout();
        this.router.navigate(['/Login']);
    };
    ProveedorCreateCmp.prototype.compras = function () {
        this.router.navigate(['/Compras']);
    };
    ProveedorCreateCmp.prototype.ventas = function () {
        this.router.navigate(['/Ventas']);
    };
    ProveedorCreateCmp.prototype.almacen = function () {
        this.router.navigate(['/Almacen']);
    };
    ProveedorCreateCmp.prototype.admin = function () {
        this.router.navigate(['/Admin']);
    };
    ProveedorCreateCmp.prototype.gproductos = function () {
        this.router.navigate(['/ListProductos']);
    };
    ProveedorCreateCmp.prototype.gpiezas = function () {
        this.router.navigate(['/ListPiezas']);
    };
    ProveedorCreateCmp.prototype.gmodelos = function () {
        this.router.navigate(['/ListModelos']);
    };
    ProveedorCreateCmp.prototype.gproveedores = function () {
        this.router.navigate(['/ListProveedores']);
    };
    ProveedorCreateCmp.prototype.gusuarios = function () {
        if (localStorage.getItem(this.token) == "encargado") {
            var u = localStorage.key(1);
            if (u == "undefined") {
                var o = localStorage.key(0);
                this.getProfile(o);
            }
            else {
                this.getProfile(u);
            }
        }
        else {
            this.router.navigate(['/ListUsuarios']);
        }
    };
    ProveedorCreateCmp.prototype.getProfile = function (name) {
        var _this = this;
        this._userService
            .getProfile(name)
            .subscribe(function (user) {
            _this.profile = user[0]._id;
            _this.router.navigate(['Perfil', { id: _this.profile }]);
        });
    };
    ProveedorCreateCmp.prototype.ggarantias = function () {
        this.router.navigate(['/ListGarantias']);
    };
    ProveedorCreateCmp.prototype.galmacenes = function () {
        this.router.navigate(['/ListAlmacenes']);
    };
    ProveedorCreateCmp.prototype.gclientes = function () {
        this.router.navigate(['/ListClientes']);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', proveedor_service_1.Proveedor)
    ], ProveedorCreateCmp.prototype, "proveedor", void 0);
    ProveedorCreateCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/proveedor/templates/create.html',
            providers: [login_service_1.LoginService, user_service_1.UserService, proveedor_service_1.ProveedorService]
        }),
        router_1.CanActivate(function () { return isloggedin_1.isLogged(); }),
        __param(0, core_1.Inject(common_1.FormBuilder)), 
        __metadata('design:paramtypes', [common_1.FormBuilder, router_1.Router, login_service_1.LoginService, user_service_1.UserService, router_1.RouteParams, proveedor_service_1.ProveedorService])
    ], ProveedorCreateCmp);
    return ProveedorCreateCmp;
}());
exports.ProveedorCreateCmp = ProveedorCreateCmp;
