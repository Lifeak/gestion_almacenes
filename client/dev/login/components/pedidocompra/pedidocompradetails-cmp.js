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
var pedidocompra_service_1 = require('../../services/pedidocompra/pedidocompra-service');
var login_service_1 = require('../../services/login-service');
var user_service_1 = require('../../services/user/user-service');
var CompraDetailsCmp = (function () {
    function CompraDetailsCmp(fb, router, _routeParams, _userService, _comprasService, _loginService) {
        this.router = router;
        this._routeParams = _routeParams;
        this._userService = _userService;
        this._comprasService = _comprasService;
        this._loginService = _loginService;
        this.mat = [];
        this.entregas = [];
        this.pedidocompraForm = fb.group({
            "modelo": ["", common_1.Validators.required],
            "udsPedidas": ["", common_1.Validators.required],
            "udsPendientes": [""],
            "udsEntregadas": [""],
            "fechaEntrega": [""],
            "albaran": [""]
        });
    }
    CompraDetailsCmp.prototype.ngOnInit = function () {
        var _this = this;
        var id = this._routeParams.get('id');
        this._comprasService
            .getPedidoCompraID(id)
            .subscribe(function (pedido) {
            _this.pedidocompras = pedido;
            _this.mat = _this.pedidocompras.productos;
        });
    };
    CompraDetailsCmp.prototype.gotoIndex = function () {
        this.router.navigate(['/ListCompras']);
    };
    CompraDetailsCmp.prototype._getAll = function () {
        var _this = this;
        this._comprasService
            .getAll()
            .subscribe(function (pedidos) {
            _this.pedidocompras = pedidos;
        });
    };
    // Nos permite añadir entregas de un modelo en concreto de un pedido de compra en particular
    CompraDetailsCmp.prototype.plus = function (datos, modelo, pedidocompra) {
        var fechaEntrega = this.pedidocompraForm.controls['fechaEntrega'].value;
        var albaran = this.pedidocompraForm.controls['albaran'].value;
        var udsEntregadas = this.pedidocompraForm.controls['udsEntregadas'].value;
        if (fechaEntrega == null || albaran == "" || udsEntregadas.toString() == "") {
            alert("Debes rellenar todos los campos sobre la entrega.");
        }
        else {
            this.pedidocompraForm.controls['fechaEntrega'].updateValue("");
            this.pedidocompraForm.controls['albaran'].updateValue("");
            this.pedidocompraForm.controls['udsEntregadas'].updateValue("");
            var nuevo = { udsEntregadas: udsEntregadas, fechaEntrega: fechaEntrega, albaran: albaran };
            for (var i = 0; i < pedidocompra.productos.length; i++) {
                if (pedidocompra.productos[i].modelo == modelo) {
                    pedidocompra.productos[i].udsPendientes = pedidocompra.productos[i].udsPendientes - udsEntregadas;
                    pedidocompra.productos[i].entregas.push(nuevo);
                }
            }
        }
    };
    // Nos ofrece el listado de entregas de un producto concreto de un pedido de compra en particular
    CompraDetailsCmp.prototype.searchentregas = function (pedidocompra, modelo) {
        for (var i = 0; i < pedidocompra.productos.length; i++) {
            if (pedidocompra.productos[i].modelo == modelo) {
                this.selectModelo = modelo;
                this.pedidas = pedidocompra.productos[i].udsPedidas;
                this.pendientes = pedidocompra.productos[i].udsPendientes;
                this.entregas = [];
                this.entregas = pedidocompra.productos[i].entregas;
            }
        }
    };
    //Esta función guarda los cambios que se hayan realizado en un pedido
    CompraDetailsCmp.prototype.save = function (pedidocompra) {
        var _this = this;
        var id = this._routeParams.get('id');
        this._comprasService
            .add(pedidocompra.fechapedido, pedidocompra.almacen, pedidocompra.proveedor, pedidocompra.productos)
            .subscribe(function (m) {
            _this.pedidocompraForm.controls['fechaEntrega'].updateValue("");
            _this.pedidocompraForm.controls['albaran'].updateValue("");
            _this.pedidocompraForm.controls['udsEntregadas'].updateValue("");
        });
        this._comprasService
            .remove(id)
            .subscribe(function () {
            return _this.pedidocompras;
        });
        this.router.navigate(['/ListCompras']);
    };
    CompraDetailsCmp.prototype.delete = function (pedidocompra) {
        var _this = this;
        this._comprasService
            .remove(pedidocompra._id)
            .subscribe(function () {
            return _this.pedidocompras;
        });
        this.router.navigate(['/ListCompras']);
    };
    CompraDetailsCmp.prototype.logout = function () {
        this._loginService.logout();
        this.router.navigate(['/Login']);
    };
    CompraDetailsCmp.prototype.compras = function () {
        this.router.navigate(['/Compras']);
    };
    CompraDetailsCmp.prototype.ventas = function () {
        this.router.navigate(['/Ventas']);
    };
    CompraDetailsCmp.prototype.almacen = function () {
        this.router.navigate(['/Almacen']);
    };
    CompraDetailsCmp.prototype.admin = function () {
        this.router.navigate(['/Admin']);
    };
    CompraDetailsCmp.prototype.gproductos = function () {
        this.router.navigate(['/ListProductos']);
    };
    CompraDetailsCmp.prototype.gpiezas = function () {
        this.router.navigate(['/ListPiezas']);
    };
    CompraDetailsCmp.prototype.gmodelos = function () {
        this.router.navigate(['/ListModelos']);
    };
    CompraDetailsCmp.prototype.gproveedores = function () {
        this.router.navigate(['/ListProveedores']);
    };
    CompraDetailsCmp.prototype.ggarantias = function () {
        this.router.navigate(['/ListGarantias']);
    };
    CompraDetailsCmp.prototype.galmacenes = function () {
        this.router.navigate(['/ListAlmacenes']);
    };
    CompraDetailsCmp.prototype.gclientes = function () {
        this.router.navigate(['/ListClientes']);
    };
    CompraDetailsCmp.prototype.gventas = function () {
        this.router.navigate(['/ListVentas']);
    };
    CompraDetailsCmp.prototype.gdevoluciones = function () {
        this.router.navigate(['/ListDevoluciones']);
    };
    CompraDetailsCmp.prototype.ggarantiasp = function () {
        this.router.navigate(['/ListGarantiaP']);
    };
    CompraDetailsCmp.prototype.gsegsalidas = function () {
        this.router.navigate(['/ListSegSalidas']);
    };
    CompraDetailsCmp.prototype.gcontrolcalidad = function () {
        this.router.navigate(['/ListControlCalidad']);
    };
    CompraDetailsCmp.prototype.greparaciones = function () {
        this.router.navigate(['/ListReparaciones']);
    };
    CompraDetailsCmp.prototype.gpedidocompras = function () {
        this.router.navigate(['/ListCompras']);
    };
    CompraDetailsCmp.prototype.gusuarios = function () {
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
    CompraDetailsCmp.prototype.getProfile = function (name) {
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
    ], CompraDetailsCmp.prototype, "pedidocompras", void 0);
    CompraDetailsCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/pedidocompra/templates/details.html',
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [login_service_1.LoginService, user_service_1.UserService, pedidocompra_service_1.ComprasService]
        }),
        router_1.CanActivate(function () { return isloggedin_1.isLogged(); }),
        __param(0, core_1.Inject(common_1.FormBuilder)),
        __param(5, core_1.Inject(login_service_1.LoginService)), 
        __metadata('design:paramtypes', [common_1.FormBuilder, router_1.Router, router_1.RouteParams, user_service_1.UserService, pedidocompra_service_1.ComprasService, login_service_1.LoginService])
    ], CompraDetailsCmp);
    return CompraDetailsCmp;
}());
exports.CompraDetailsCmp = CompraDetailsCmp;
