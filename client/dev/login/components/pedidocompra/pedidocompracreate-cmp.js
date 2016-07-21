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
var pedidocompra_service_1 = require('../../services/pedidocompra/pedidocompra-service');
var user_service_1 = require('../../services/user/user-service');
var CompraCreateCmp = (function () {
    function CompraCreateCmp(fb, router, _loginService, _userService, _routeParams, _comprasService) {
        this.router = router;
        this._loginService = _loginService;
        this._userService = _userService;
        this._routeParams = _routeParams;
        this._comprasService = _comprasService;
        this.modelos = [];
        this.almacens = [];
        this.proveedors = [];
        this.prod = [];
        this.cuenta = [];
        this.pedidocompraForm = fb.group({
            "fechapedido": ["", common_1.Validators.required],
            "almacen": ["", common_1.Validators.required],
            "proveedor": ["", common_1.Validators.required],
            "modelo": [""],
            "udsPedidas": [""]
        });
    }
    CompraCreateCmp.prototype.ngOnInit = function () {
        var _this = this;
        this._comprasService
            .getModelos()
            .subscribe(function (modelos) {
            _this.modelos = modelos;
        });
        this._comprasService
            .getProveedores()
            .subscribe(function (proveedores) {
            _this.proveedors = proveedores;
        });
        this._comprasService
            .getAlmacenes()
            .subscribe(function (almacenes) {
            _this.almacens = almacenes;
        });
    };
    CompraCreateCmp.prototype.gotoIndex = function () {
        this.router.navigate(['/ListCompras']);
    };
    CompraCreateCmp.prototype.goBack = function () {
        window.history.back();
    };
    CompraCreateCmp.prototype.plus = function (datos) {
        var modelo = this.pedidocompraForm.controls['modelo'].value;
        var udsPedidas = this.pedidocompraForm.controls['udsPedidas'].value;
        var udsPendientes = udsPedidas;
        if (modelo == "" || udsPedidas <= 0) {
            alert("Debes seleccionar el modelo y las unidades correctamente.");
        }
        else {
            this.pedidocompraForm.controls['modelo'].updateValue("");
            this.pedidocompraForm.controls['udsPedidas'].updateValue("");
            this.cuenta.push(modelo);
            var m = { modelo: modelo, udsPedidas: udsPedidas, udsPendientes: udsPendientes };
            this.prod.push(m);
            m = [];
        }
    };
    CompraCreateCmp.prototype.minus = function (pos) {
        this.prod.splice(pos, 1);
        this.cuenta.splice(pos, 1);
    };
    CompraCreateCmp.prototype.save = function (datos) {
        var _this = this;
        var fechapedido = this.pedidocompraForm.controls['fechapedido'].value;
        var almacen = this.pedidocompraForm.controls['almacen'].value;
        var proveedor = this.pedidocompraForm.controls['proveedor'].value;
        var modelo = this.pedidocompraForm.controls['modelo'].value;
        var udsPedidas = this.pedidocompraForm.controls['udsPedidas'].value;
        var udsPendientes = udsPedidas;
        var productos = this.prod;
        if (this.prod.length == 0) {
            alert("Debes añadir los materiales del pedido.");
        }
        else {
            this._comprasService
                .add(fechapedido, almacen, proveedor, productos)
                .subscribe(function (m) {
                _this.pedidocompraForm.controls['fechapedido'].updateValue("");
                _this.pedidocompraForm.controls['almacen'].updateValue("");
                _this.pedidocompraForm.controls['proveedor'].updateValue("");
                _this.pedidocompraForm.controls['modelo'].updateValue("");
                _this.pedidocompraForm.controls['udsPedidas'].updateValue("");
            });
            this.gotoIndex();
        }
    };
    CompraCreateCmp.prototype.logout = function () {
        this._loginService.logout();
        this.router.navigate(['/Login']);
    };
    CompraCreateCmp.prototype.compras = function () {
        this.router.navigate(['/Compras']);
    };
    CompraCreateCmp.prototype.ventas = function () {
        this.router.navigate(['/Ventas']);
    };
    CompraCreateCmp.prototype.almacen = function () {
        this.router.navigate(['/Almacen']);
    };
    CompraCreateCmp.prototype.admin = function () {
        this.router.navigate(['/Admin']);
    };
    CompraCreateCmp.prototype.gproductos = function () {
        this.router.navigate(['/ListProductos']);
    };
    CompraCreateCmp.prototype.gpiezas = function () {
        this.router.navigate(['/ListPiezas']);
    };
    CompraCreateCmp.prototype.gmodelos = function () {
        this.router.navigate(['/ListModelos']);
    };
    CompraCreateCmp.prototype.gproveedores = function () {
        this.router.navigate(['/ListProveedores']);
    };
    CompraCreateCmp.prototype.ggarantias = function () {
        this.router.navigate(['/ListGarantias']);
    };
    CompraCreateCmp.prototype.galmacenes = function () {
        this.router.navigate(['/ListAlmacenes']);
    };
    CompraCreateCmp.prototype.gclientes = function () {
        this.router.navigate(['/ListClientes']);
    };
    CompraCreateCmp.prototype.gventas = function () {
        this.router.navigate(['/ListVentas']);
    };
    CompraCreateCmp.prototype.gdevoluciones = function () {
        this.router.navigate(['/ListDevoluciones']);
    };
    CompraCreateCmp.prototype.ggarantiasp = function () {
        this.router.navigate(['/ListGarantiaP']);
    };
    CompraCreateCmp.prototype.gsegsalidas = function () {
        this.router.navigate(['/ListSegSalidas']);
    };
    CompraCreateCmp.prototype.gcontrolcalidad = function () {
        this.router.navigate(['/ListControlCalidad']);
    };
    CompraCreateCmp.prototype.greparaciones = function () {
        this.router.navigate(['/ListReparaciones']);
    };
    CompraCreateCmp.prototype.gpedidocompras = function () {
        this.router.navigate(['/ListCompras']);
    };
    CompraCreateCmp.prototype.gusuarios = function () {
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
    CompraCreateCmp.prototype.getProfile = function (name) {
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
        __metadata('design:type', pedidocompra_service_1.Pedidocompra)
    ], CompraCreateCmp.prototype, "pedidocompra", void 0);
    CompraCreateCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/pedidocompra/templates/create.html',
            providers: [login_service_1.LoginService, user_service_1.UserService, pedidocompra_service_1.ComprasService]
        }),
        router_1.CanActivate(function () { return isloggedin_1.isLogged(); }),
        __param(0, core_1.Inject(common_1.FormBuilder)), 
        __metadata('design:paramtypes', [common_1.FormBuilder, router_1.Router, login_service_1.LoginService, user_service_1.UserService, router_1.RouteParams, pedidocompra_service_1.ComprasService])
    ], CompraCreateCmp);
    return CompraCreateCmp;
}());
exports.CompraCreateCmp = CompraCreateCmp;
