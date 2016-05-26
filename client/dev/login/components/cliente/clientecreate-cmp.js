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
var isloggedin_1 = require('../../services/isloggedin');
var cliente_service_1 = require('../../services/cliente/cliente-service');
var user_service_1 = require('../../services/user/user-service');
var ClienteCreateCmp = (function () {
    function ClienteCreateCmp(fb, router, _routeParams, _userService, _clienteService, _loginService) {
        this.router = router;
        this._routeParams = _routeParams;
        this._userService = _userService;
        this._clienteService = _clienteService;
        this._loginService = _loginService;
        this.clienteForm = fb.group({
            "_id": ["", common_1.Validators.required],
            "nombre": ["", common_1.Validators.required],
            "direccion": ["", common_1.Validators.required],
            "ciudad": ["", common_1.Validators.required],
            "pais": ["", common_1.Validators.required],
            "telefono1": ["", common_1.Validators.required],
            "telefono2": [""],
            "puestoTrabajo": ["", common_1.Validators.required],
            "email": ["", common_1.Validators.required],
            "detalles": [""]
        });
    }
    ClienteCreateCmp.prototype.gotoIndex = function () {
        var clienteId = this.cliente ? this.cliente._id : null;
        this.router.navigate(['/ListClientes']);
    };
    ClienteCreateCmp.prototype.goBack = function () {
        window.history.back();
    };
    ClienteCreateCmp.prototype.save = function (datos) {
        var _this = this;
        var _id = this.clienteForm.controls['_id'].value;
        var nombre = this.clienteForm.controls['nombre'].value;
        var direccion = this.clienteForm.controls['direccion'].value;
        var ciudad = this.clienteForm.controls['ciudad'].value;
        var pais = this.clienteForm.controls['pais'].value;
        var telefono1 = this.clienteForm.controls['telefono1'].value;
        var telefono2 = this.clienteForm.controls['telefono2'].value;
        var puestoTrabajo = this.clienteForm.controls['puestoTrabajo'].value;
        var email = this.clienteForm.controls['email'].value;
        var detalles = this.clienteForm.controls['detalles'].value;
        this._clienteService
            .add(_id, nombre, direccion, ciudad, pais, telefono1, telefono2, puestoTrabajo, email, detalles)
            .subscribe(function (m) {
            _this.clienteForm.controls['_id'].updateValue("");
            _this.clienteForm.controls['nombre'].updateValue("");
            _this.clienteForm.controls['direccion'].updateValue("");
            _this.clienteForm.controls['ciudad'].updateValue("");
            _this.clienteForm.controls['pais'].updateValue("");
            _this.clienteForm.controls['telefono1'].updateValue("");
            _this.clienteForm.controls['telefono2'].updateValue("");
            _this.clienteForm.controls['puestoTrabajo'].updateValue("");
            _this.clienteForm.controls['email'].updateValue("");
            _this.clienteForm.controls['detalles'].updateValue("");
        });
        this.gotoIndex();
    };
    ClienteCreateCmp.prototype.logout = function () {
        this._loginService.logout();
        this.router.navigate(['/Login']);
    };
    ClienteCreateCmp.prototype.compras = function () {
        this.router.navigate(['/Compras']);
    };
    ClienteCreateCmp.prototype.ventas = function () {
        this.router.navigate(['/Ventas']);
    };
    ClienteCreateCmp.prototype.almacen = function () {
        this.router.navigate(['/Almacen']);
    };
    ClienteCreateCmp.prototype.admin = function () {
        this.router.navigate(['/Admin']);
    };
    ClienteCreateCmp.prototype.gproductos = function () {
        this.router.navigate(['/ListProductos']);
    };
    ClienteCreateCmp.prototype.gpiezas = function () {
        this.router.navigate(['/ListPiezas']);
    };
    ClienteCreateCmp.prototype.gmodelos = function () {
        this.router.navigate(['/ListModelos']);
    };
    ClienteCreateCmp.prototype.gproveedores = function () {
        this.router.navigate(['/ListProveedores']);
    };
    ClienteCreateCmp.prototype.gusuarios = function () {
        if (localStorage.getItem(this.token) == "encargado") {
            var u = localStorage.key(1);
            // alert("1en u tenemos " + u);
            if (u == "undefined") {
                var e = localStorage.key(0);
                //alert("2en u tenemos " + u);
                this.getProfile(e);
            }
            else {
                this.getProfile(u);
            }
        }
        else {
            this.router.navigate(['/ListUsuarios']);
        }
    };
    ClienteCreateCmp.prototype.getProfile = function (name) {
        var _this = this;
        this._userService
            .getProfile(name)
            .subscribe(function (user) {
            _this.profile = user[0]._id;
            _this.router.navigate(['Perfil', { id: _this.profile }]);
            //alert("en el get, el id es " +this.profile);
        });
    };
    ClienteCreateCmp.prototype.ggarantias = function () {
        this.router.navigate(['/ListGarantias']);
    };
    ClienteCreateCmp.prototype.galmacenes = function () {
        this.router.navigate(['/ListAlmacenes']);
    };
    ClienteCreateCmp.prototype.gclientes = function () {
        this.router.navigate(['/ListClientes']);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', cliente_service_1.Cliente)
    ], ClienteCreateCmp.prototype, "cliente", void 0);
    ClienteCreateCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/cliente/templates/create.html',
            providers: [login_service_1.LoginService, user_service_1.UserService, cliente_service_1.ClienteService]
        }),
        router_1.CanActivate(function () { return isloggedin_1.isLogged(); }),
        __param(0, core_1.Inject(common_1.FormBuilder)), 
        __metadata('design:paramtypes', [common_1.FormBuilder, router_1.Router, router_1.RouteParams, user_service_1.UserService, cliente_service_1.ClienteService, login_service_1.LoginService])
    ], ClienteCreateCmp);
    return ClienteCreateCmp;
}());
exports.ClienteCreateCmp = ClienteCreateCmp;
