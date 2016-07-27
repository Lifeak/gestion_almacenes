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
var login_service_1 = require('../../services/login-service');
var pieza_service_1 = require('../../services/pieza/pieza-service');
var user_service_1 = require('../../services/user/user-service');
var isloggedin_1 = require('../../services/isloggedin');
var PiezaCreateCmp = (function () {
    function PiezaCreateCmp(fb, router, _routeParams, _userService, _piezaService, _loginService) {
        this.router = router;
        this._routeParams = _routeParams;
        this._userService = _userService;
        this._piezaService = _piezaService;
        this._loginService = _loginService;
        this.modelos = [];
        this.piezaForm = fb.group({
            "_id": ["", common_1.Validators.required],
            "modelo": ["", common_1.Validators.required],
            "estado": ["", common_1.Validators.required],
            "lote": ["", common_1.Validators.required],
            "caracteristicas": [""],
            "almacen": ["", common_1.Validators.required],
            "almacenOrigen": ["", common_1.Validators.required],
            "vendido": ["", common_1.Validators.required],
            "compuestoPor": [""],
            "precio": [""]
        });
        this.components = [];
    }
    PiezaCreateCmp.prototype.ngOnInit = function () {
        var _this = this;
        this._piezaService
            .getModelos()
            .subscribe(function (modelos) {
            _this.modelos = modelos;
        });
    };
    PiezaCreateCmp.prototype.gotoIndex = function () {
        this.router.navigate(['/ListPiezas']);
    };
    PiezaCreateCmp.prototype.goBack = function () {
        window.history.back();
    };
    PiezaCreateCmp.prototype.save = function (datos) {
        var _this = this;
        var _id = this.piezaForm.controls['_id'].value;
        var modelo = this.piezaForm.controls['modelo'].value;
        var estado = this.piezaForm.controls['estado'].value;
        var lote = this.piezaForm.controls['lote'].value;
        var caracteristicas = this.piezaForm.controls['caracteristicas'].value;
        var almacen = this.piezaForm.controls['almacen'].value;
        var almacenOrigen = this.piezaForm.controls['almacenOrigen'].value;
        var vendido = this.piezaForm.controls['vendido'].value;
        var compuestoPor = this.components;
        var precio = this.piezaForm.controls['precio'].value;
        this._piezaService
            .add(_id, modelo, estado, lote, caracteristicas, almacen, almacenOrigen, vendido, compuestoPor, precio)
            .subscribe(function (m) {
            _this.piezaForm.controls['_id'].updateValue("");
            _this.piezaForm.controls['modelo'].updateValue("");
            _this.piezaForm.controls['estado'].updateValue("");
            _this.piezaForm.controls['lote'].updateValue("");
            _this.piezaForm.controls['caracteristicas'].updateValue("");
            _this.piezaForm.controls['almacen'].updateValue("");
            _this.piezaForm.controls['almacenOrigen'].updateValue("");
            _this.piezaForm.controls['vendido'].updateValue("");
            _this.piezaForm.controls['precio'].updateValue("");
        });
        this.gotoIndex();
    };
    PiezaCreateCmp.prototype.plus = function (data) {
        var nombre = this.piezaForm.controls['compuestoPor'].value;
        if (nombre == "") {
            alert("El número de serie de la pieza no puede ser vacío.");
        }
        else {
            this.components.push(nombre);
            this.piezaForm.controls['compuestoPor'].updateValue("");
        }
    };
    PiezaCreateCmp.prototype.minus = function (nombre) {
        this.components.splice(this.components.indexOf(nombre), 1);
    };
    PiezaCreateCmp.prototype.logout = function () {
        this._loginService.logout();
        this.router.navigate(['/Login']);
    };
    PiezaCreateCmp.prototype.compras = function () {
        this.router.navigate(['/Compras']);
    };
    PiezaCreateCmp.prototype.ventas = function () {
        this.router.navigate(['/Ventas']);
    };
    PiezaCreateCmp.prototype.almacen = function () {
        this.router.navigate(['/Almacen']);
    };
    PiezaCreateCmp.prototype.admin = function () {
        this.router.navigate(['/Admin']);
    };
    PiezaCreateCmp.prototype.gproductos = function () {
        this.router.navigate(['/ListProductos']);
    };
    PiezaCreateCmp.prototype.gpiezas = function () {
        this.router.navigate(['/ListPiezas']);
    };
    PiezaCreateCmp.prototype.gmodelos = function () {
        this.router.navigate(['/ListModelos']);
    };
    PiezaCreateCmp.prototype.gproveedores = function () {
        this.router.navigate(['/ListProveedores']);
    };
    PiezaCreateCmp.prototype.ggarantias = function () {
        this.router.navigate(['/ListGarantias']);
    };
    PiezaCreateCmp.prototype.galmacenes = function () {
        this.router.navigate(['/ListAlmacenes']);
    };
    PiezaCreateCmp.prototype.gclientes = function () {
        this.router.navigate(['/ListClientes']);
    };
    PiezaCreateCmp.prototype.gventas = function () {
        this.router.navigate(['/ListVentas']);
    };
    PiezaCreateCmp.prototype.gdevoluciones = function () {
        this.router.navigate(['/ListDevoluciones']);
    };
    PiezaCreateCmp.prototype.ggarantiasp = function () {
        this.router.navigate(['/ListGarantiaP']);
    };
    PiezaCreateCmp.prototype.gsegsalidas = function () {
        this.router.navigate(['/ListSegSalidas']);
    };
    PiezaCreateCmp.prototype.gcontrolcalidad = function () {
        this.router.navigate(['/ListControlCalidad']);
    };
    PiezaCreateCmp.prototype.greparaciones = function () {
        this.router.navigate(['/ListReparaciones']);
    };
    PiezaCreateCmp.prototype.gpedidocompras = function () {
        this.router.navigate(['/ListCompras']);
    };
    PiezaCreateCmp.prototype.gtransportes = function () {
        this.router.navigate(['/ListTransportes']);
    };
    PiezaCreateCmp.prototype.gusuarios = function () {
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
    PiezaCreateCmp.prototype.getProfile = function (name) {
        var _this = this;
        this._userService
            .getProfile(name)
            .subscribe(function (user) {
            _this.profile = user[0]._id;
            _this.router.navigate(['Perfil', { id: _this.profile }]);
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', pieza_service_1.Pieza)
    ], PiezaCreateCmp.prototype, "pieza", void 0);
    PiezaCreateCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/pieza/templates/create.html',
            providers: [login_service_1.LoginService, user_service_1.UserService, pieza_service_1.PiezaService]
        }),
        router_1.CanActivate(function () { return isloggedin_1.isLogged(); }),
        __param(0, core_1.Inject(common_1.FormBuilder)), 
        __metadata('design:paramtypes', [common_1.FormBuilder, router_1.Router, router_1.RouteParams, user_service_1.UserService, pieza_service_1.PiezaService, login_service_1.LoginService])
    ], PiezaCreateCmp);
    return PiezaCreateCmp;
}());
exports.PiezaCreateCmp = PiezaCreateCmp;
