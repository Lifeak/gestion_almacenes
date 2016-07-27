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
var modelo_service_1 = require('../../services/modelo/modelo-service');
var login_service_1 = require('../../services/login-service');
var user_service_1 = require('../../services/user/user-service');
var ModeloSubDetailsCmp = (function () {
    function ModeloSubDetailsCmp(fb, router, _routeParams, _userService, _modeloService, _loginService) {
        this.router = router;
        this._routeParams = _routeParams;
        this._userService = _userService;
        this._modeloService = _modeloService;
        this._loginService = _loginService;
        this.modelos = [];
        this.components = [];
        this.uds = [];
        this.modeloForm = fb.group({
            "nombre": ["", common_1.Validators.required],
            "refinterna": ["", common_1.Validators.required],
            "caracteristicas": [""],
            "modeloDe": ["", common_1.Validators.required],
            "compuestoPor": [""],
            "unidades": [""]
        });
    }
    ModeloSubDetailsCmp.prototype.ngOnInit = function () {
        var _this = this;
        var name = this._routeParams.get('nombre');
        this._modeloService
            .getModeloName(name)
            .subscribe(function (modelo) {
            _this.modelo = modelo;
            _this.components = _this.modelo[0].compuestoPor;
            _this.uds = _this.modelo[0].unidades;
        });
        this._modeloService
            .getAll()
            .subscribe(function (modelos) {
            _this.modelos = modelos;
        });
    };
    ModeloSubDetailsCmp.prototype.gotoIndex = function () {
        window.history.back();
    };
    ModeloSubDetailsCmp.prototype._getAll = function () {
        var _this = this;
        this._modeloService
            .getAll()
            .subscribe(function (modelos) {
            _this.modelo = modelos;
        });
    };
    ModeloSubDetailsCmp.prototype.buscar = function (nombre) {
        this.router.navigate(['DetailsSubModelo', { nombre: nombre }]);
    };
    ModeloSubDetailsCmp.prototype.edit = function (modelo) {
        var _this = this;
        var id = this._routeParams.get('nombre');
        var compuestoPor = this.components;
        var unidades = this.uds;
        this._modeloService
            .add(modelo.nombre, modelo.refinterna, modelo.caracteristicas, modelo.modeloDe, compuestoPor, unidades)
            .subscribe(function (m) {
            _this.modeloForm.controls['nombre'].updateValue("");
            _this.modeloForm.controls['refinterna'].updateValue("");
            _this.modeloForm.controls['caracteristicas'].updateValue("");
            _this.modeloForm.controls['modeloDe'].updateValue("");
            _this.modeloForm.controls['compuestoPor'].updateValue("");
            _this.modeloForm.controls['unidades'].updateValue("");
        });
        this._modeloService
            .remove(id)
            .subscribe(function () {
            return _this.modelo;
        });
        this.gotoIndex();
    };
    ModeloSubDetailsCmp.prototype.plus = function (data) {
        var nombre = this.modeloForm.controls['compuestoPor'].value;
        //alert("entramos a plus con nombre " + nombre);
        this.components.push(nombre);
        this.modeloForm.controls['compuestoPor'].updateValue("");
        var unidades = this.modeloForm.controls['unidades'].value;
        this.uds.push(unidades);
        this.modeloForm.controls['unidades'].updateValue("");
    };
    ModeloSubDetailsCmp.prototype.minus = function (nombre) {
        this.components.splice(this.components.indexOf(nombre), 1);
        this.uds.splice(this.components.indexOf(nombre), 1);
    };
    ModeloSubDetailsCmp.prototype.logout = function () {
        this._loginService.logout();
        this.router.navigate(['/Login']);
    };
    ModeloSubDetailsCmp.prototype.compras = function () {
        this.router.navigate(['/Compras']);
    };
    ModeloSubDetailsCmp.prototype.ventas = function () {
        this.router.navigate(['/Ventas']);
    };
    ModeloSubDetailsCmp.prototype.almacen = function () {
        this.router.navigate(['/Almacen']);
    };
    ModeloSubDetailsCmp.prototype.admin = function () {
        this.router.navigate(['/Admin']);
    };
    ModeloSubDetailsCmp.prototype.gusuarios = function () {
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
    ModeloSubDetailsCmp.prototype.getProfile = function (name) {
        var _this = this;
        this._userService
            .getProfile(name)
            .subscribe(function (user) {
            _this.profile = user[0]._id;
            _this.router.navigate(['Perfil', { id: _this.profile }]);
        });
    };
    ModeloSubDetailsCmp.prototype.gproductos = function () {
        this.router.navigate(['/ListProductos']);
    };
    ModeloSubDetailsCmp.prototype.gpiezas = function () {
        this.router.navigate(['/ListPiezas']);
    };
    ModeloSubDetailsCmp.prototype.gmodelos = function () {
        this.router.navigate(['/ListModelos']);
    };
    ModeloSubDetailsCmp.prototype.gproveedores = function () {
        this.router.navigate(['/ListProveedores']);
    };
    ModeloSubDetailsCmp.prototype.ggarantias = function () {
        this.router.navigate(['/ListGarantias']);
    };
    ModeloSubDetailsCmp.prototype.galmacenes = function () {
        this.router.navigate(['/ListAlmacenes']);
    };
    ModeloSubDetailsCmp.prototype.gclientes = function () {
        this.router.navigate(['/ListClientes']);
    };
    ModeloSubDetailsCmp.prototype.gventas = function () {
        this.router.navigate(['/ListVentas']);
    };
    ModeloSubDetailsCmp.prototype.gdevoluciones = function () {
        this.router.navigate(['/ListDevoluciones']);
    };
    ModeloSubDetailsCmp.prototype.ggarantiasp = function () {
        this.router.navigate(['/ListGarantiaP']);
    };
    ModeloSubDetailsCmp.prototype.gsegsalidas = function () {
        this.router.navigate(['/ListSegSalidas']);
    };
    ModeloSubDetailsCmp.prototype.gcontrolcalidad = function () {
        this.router.navigate(['/ListControlCalidad']);
    };
    ModeloSubDetailsCmp.prototype.greparaciones = function () {
        this.router.navigate(['/ListReparaciones']);
    };
    ModeloSubDetailsCmp.prototype.gpedidocompras = function () {
        this.router.navigate(['/ListCompras']);
    };
    ModeloSubDetailsCmp.prototype.gtransportes = function () {
        this.router.navigate(['/ListTransportes']);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', modelo_service_1.Modelo)
    ], ModeloSubDetailsCmp.prototype, "modelo", void 0);
    ModeloSubDetailsCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/modelo/templates/detailss.html',
            providers: [login_service_1.LoginService, user_service_1.UserService, modelo_service_1.ModeloService]
        }),
        router_1.CanActivate(function () { return isloggedin_1.isLogged(); }),
        __param(0, core_1.Inject(common_1.FormBuilder)),
        __param(5, core_1.Inject(login_service_1.LoginService)), 
        __metadata('design:paramtypes', [common_1.FormBuilder, router_1.Router, router_1.RouteParams, user_service_1.UserService, modelo_service_1.ModeloService, login_service_1.LoginService])
    ], ModeloSubDetailsCmp);
    return ModeloSubDetailsCmp;
}());
exports.ModeloSubDetailsCmp = ModeloSubDetailsCmp;
