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
var transporte_service_1 = require('../../services/transporte/transporte-service');
var login_service_1 = require('../../services/login-service');
var user_service_1 = require('../../services/user/user-service');
var TransporteDetailsCmp = (function () {
    function TransporteDetailsCmp(fb, router, _routeParams, _transporteService, _userService, _loginService) {
        this.router = router;
        this._routeParams = _routeParams;
        this._transporteService = _transporteService;
        this._userService = _userService;
        this._loginService = _loginService;
        this.transporteForm = fb.group({
            "nombre": ["", common_1.Validators.required],
            "direccion": ["", common_1.Validators.required],
            "ciudad": ["", common_1.Validators.required],
            "pais": ["", common_1.Validators.required],
            "telefono": ["", common_1.Validators.required],
            "email": ["", common_1.Validators.required],
            "detalles": [""],
            "valoracion": [""]
        });
    }
    TransporteDetailsCmp.prototype.ngOnInit = function () {
        var _this = this;
        var id = this._routeParams.get('id');
        this._transporteService
            .getTransporteId(id)
            .subscribe(function (transporte) {
            _this.transporte = transporte;
        });
    };
    TransporteDetailsCmp.prototype.gotoIndex = function () {
        this.router.navigate(['/ListTransportes']);
    };
    TransporteDetailsCmp.prototype.edit = function (transporte) {
        var _this = this;
        var id = this._routeParams.get('id');
        this._transporteService
            .add(transporte.nombre, transporte.direccion, transporte.ciudad, transporte.pais, transporte.telefono, transporte.email, transporte.detalles, transporte.valoracion)
            .subscribe(function (m) {
            _this.transporteForm.controls['nombre'].updateValue("");
            _this.transporteForm.controls['direccion'].updateValue("");
            _this.transporteForm.controls['ciudad'].updateValue("");
            _this.transporteForm.controls['pais'].updateValue("");
            _this.transporteForm.controls['telefono'].updateValue("");
            _this.transporteForm.controls['email'].updateValue("");
            _this.transporteForm.controls['detalles'].updateValue("");
            _this.transporteForm.controls['valoracion'].updateValue("");
        });
        this._transporteService
            .remove(id)
            .subscribe(function () {
            return _this.transporte;
        });
        this.gotoIndex();
    };
    TransporteDetailsCmp.prototype.delete = function (transporte) {
        var _this = this;
        this._transporteService
            .remove(transporte._id)
            .subscribe(function () {
            return _this.transporte;
        });
        this.gotoIndex();
    };
    TransporteDetailsCmp.prototype.logout = function () {
        this._loginService.logout();
        this.router.navigate(['/Login']);
    };
    TransporteDetailsCmp.prototype.compras = function () {
        this.router.navigate(['/Compras']);
    };
    TransporteDetailsCmp.prototype.ventas = function () {
        this.router.navigate(['/Ventas']);
    };
    TransporteDetailsCmp.prototype.almacen = function () {
        this.router.navigate(['/Almacen']);
    };
    TransporteDetailsCmp.prototype.admin = function () {
        this.router.navigate(['/Admin']);
    };
    TransporteDetailsCmp.prototype.gproductos = function () {
        this.router.navigate(['/ListProductos']);
    };
    TransporteDetailsCmp.prototype.gpiezas = function () {
        this.router.navigate(['/ListPiezas']);
    };
    TransporteDetailsCmp.prototype.gmodelos = function () {
        this.router.navigate(['/ListModelos']);
    };
    TransporteDetailsCmp.prototype.gproveedores = function () {
        this.router.navigate(['/ListProveedores']);
    };
    TransporteDetailsCmp.prototype.ggarantias = function () {
        this.router.navigate(['/ListGarantias']);
    };
    TransporteDetailsCmp.prototype.galmacenes = function () {
        this.router.navigate(['/ListAlmacenes']);
    };
    TransporteDetailsCmp.prototype.gclientes = function () {
        this.router.navigate(['/ListClientes']);
    };
    TransporteDetailsCmp.prototype.gventas = function () {
        this.router.navigate(['/ListVentas']);
    };
    TransporteDetailsCmp.prototype.gdevoluciones = function () {
        this.router.navigate(['/ListDevoluciones']);
    };
    TransporteDetailsCmp.prototype.ggarantiasp = function () {
        this.router.navigate(['/ListGarantiaP']);
    };
    TransporteDetailsCmp.prototype.gsegsalidas = function () {
        this.router.navigate(['/ListSegSalidas']);
    };
    TransporteDetailsCmp.prototype.gcontrolcalidad = function () {
        this.router.navigate(['/ListControlCalidad']);
    };
    TransporteDetailsCmp.prototype.greparaciones = function () {
        this.router.navigate(['/ListReparaciones']);
    };
    TransporteDetailsCmp.prototype.gpedidocompras = function () {
        this.router.navigate(['/ListCompras']);
    };
    TransporteDetailsCmp.prototype.gtransportes = function () {
        this.router.navigate(['/ListTransportes']);
    };
    TransporteDetailsCmp.prototype.gusuarios = function () {
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
    TransporteDetailsCmp.prototype.getProfile = function (name) {
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
        __metadata('design:type', transporte_service_1.Transporte)
    ], TransporteDetailsCmp.prototype, "transporte", void 0);
    TransporteDetailsCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/transporte/templates/details.html',
            providers: [user_service_1.UserService, login_service_1.LoginService, transporte_service_1.TransporteService]
        }),
        router_1.CanActivate(function () { return isloggedin_1.isLogged(); }),
        __param(0, core_1.Inject(common_1.FormBuilder)),
        __param(5, core_1.Inject(login_service_1.LoginService)), 
        __metadata('design:paramtypes', [common_1.FormBuilder, router_1.Router, router_1.RouteParams, transporte_service_1.TransporteService, user_service_1.UserService, login_service_1.LoginService])
    ], TransporteDetailsCmp);
    return TransporteDetailsCmp;
}());
exports.TransporteDetailsCmp = TransporteDetailsCmp;
