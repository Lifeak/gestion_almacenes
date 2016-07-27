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
var ventas_service_1 = require('../../services/ventas/ventas-service');
var login_service_1 = require('../../services/login-service');
var user_service_1 = require('../../services/user/user-service');
var VentaDetailsCmp = (function () {
    function VentaDetailsCmp(fb, router, _routeParams, _ventaService, _userService, _loginService) {
        this.router = router;
        this._routeParams = _routeParams;
        this._ventaService = _ventaService;
        this._userService = _userService;
        this._loginService = _loginService;
        this.ventaForm = fb.group({
            "_id": ["", common_1.Validators.required]
        });
    }
    VentaDetailsCmp.prototype.ngOnInit = function () {
        var _this = this;
        var id = this._routeParams.get('id');
        this._ventaService
            .getVentaId(id)
            .subscribe(function (venta) {
            _this.venta = venta;
        });
    };
    VentaDetailsCmp.prototype.gotoIndex = function () {
        this.router.navigate(['/ListVentas']);
    };
    VentaDetailsCmp.prototype._getAll = function () {
        var _this = this;
        this._ventaService
            .getAll()
            .subscribe(function (venta) {
            _this.venta = venta;
        });
    };
    VentaDetailsCmp.prototype.edit = function (venta) {
        var _this = this;
        this._ventaService
            .add(venta.cliente, venta.direccionEnvio, venta.ciudad, venta.pais, venta.numPedido, venta.fechaSalida, venta.finGarantia, venta.transporte, venta.agente, venta.observaciones, venta.lineaventa)
            .subscribe(function (m) {
            _this.ventaForm.controls['observaciones'].updateValue("");
        });
        this._ventaService
            .remove(venta._id)
            .subscribe(function () {
            return _this.venta;
        });
        this.gotoIndex();
    };
    VentaDetailsCmp.prototype.delete = function (venta) {
        var _this = this;
        this._ventaService
            .remove(venta._id)
            .subscribe(function () {
            return _this.venta;
        });
        this.gotoIndex();
    };
    VentaDetailsCmp.prototype.logout = function () {
        this._loginService.logout();
        this.router.navigate(['/Login']);
    };
    VentaDetailsCmp.prototype.compras = function () {
        this.router.navigate(['/Compras']);
    };
    VentaDetailsCmp.prototype.ventas = function () {
        this.router.navigate(['/Ventas']);
    };
    VentaDetailsCmp.prototype.almacen = function () {
        this.router.navigate(['/Almacen']);
    };
    VentaDetailsCmp.prototype.admin = function () {
        this.router.navigate(['/Admin']);
    };
    VentaDetailsCmp.prototype.gproductos = function () {
        this.router.navigate(['/ListProductos']);
    };
    VentaDetailsCmp.prototype.gpiezas = function () {
        this.router.navigate(['/ListPiezas']);
    };
    VentaDetailsCmp.prototype.gmodelos = function () {
        this.router.navigate(['/ListModelos']);
    };
    VentaDetailsCmp.prototype.gproveedores = function () {
        this.router.navigate(['/ListProveedores']);
    };
    VentaDetailsCmp.prototype.ggarantias = function () {
        this.router.navigate(['/ListGarantias']);
    };
    VentaDetailsCmp.prototype.galmacenes = function () {
        this.router.navigate(['/ListAlmacenes']);
    };
    VentaDetailsCmp.prototype.gclientes = function () {
        this.router.navigate(['/ListClientes']);
    };
    VentaDetailsCmp.prototype.gventas = function () {
        this.router.navigate(['/ListVentas']);
    };
    VentaDetailsCmp.prototype.gdevoluciones = function () {
        this.router.navigate(['/ListDevoluciones']);
    };
    VentaDetailsCmp.prototype.ggarantiasp = function () {
        this.router.navigate(['/ListGarantiaP']);
    };
    VentaDetailsCmp.prototype.gsegsalidas = function () {
        this.router.navigate(['/ListSegSalidas']);
    };
    VentaDetailsCmp.prototype.gcontrolcalidad = function () {
        this.router.navigate(['/ListControlCalidad']);
    };
    VentaDetailsCmp.prototype.greparaciones = function () {
        this.router.navigate(['/ListReparaciones']);
    };
    VentaDetailsCmp.prototype.gpedidocompras = function () {
        this.router.navigate(['/ListCompras']);
    };
    VentaDetailsCmp.prototype.gtransportes = function () {
        this.router.navigate(['/ListTransportes']);
    };
    VentaDetailsCmp.prototype.gusuarios = function () {
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
    VentaDetailsCmp.prototype.getProfile = function (name) {
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
        __metadata('design:type', ventas_service_1.Venta)
    ], VentaDetailsCmp.prototype, "venta", void 0);
    VentaDetailsCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/ventas/templates/details.html',
            providers: [user_service_1.UserService, login_service_1.LoginService, ventas_service_1.VentasService]
        }),
        router_1.CanActivate(function () { return isloggedin_1.isLogged(); }),
        __param(0, core_1.Inject(common_1.FormBuilder)),
        __param(5, core_1.Inject(login_service_1.LoginService)), 
        __metadata('design:paramtypes', [common_1.FormBuilder, router_1.Router, router_1.RouteParams, ventas_service_1.VentasService, user_service_1.UserService, login_service_1.LoginService])
    ], VentaDetailsCmp);
    return VentaDetailsCmp;
}());
exports.VentaDetailsCmp = VentaDetailsCmp;
