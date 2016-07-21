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
var devolucion_service_1 = require('../../services/devolucion/devolucion-service');
var user_service_1 = require('../../services/user/user-service');
var DevolucionCreateCmp = (function () {
    function DevolucionCreateCmp(fb, router, _loginService, _userService, _routeParams, _devolucionService) {
        this.router = router;
        this._loginService = _loginService;
        this._userService = _userService;
        this._routeParams = _routeParams;
        this._devolucionService = _devolucionService;
        this.modelos = [];
        this.numeros = [];
        this.venta = [];
        this.prod = [];
        this.devolucionForm = fb.group({
            "idventa": ["", common_1.Validators.required],
            "tipoDevolucion": ["", common_1.Validators.required],
            "fechaEntrada": ["", common_1.Validators.required],
            "devolucion": [""],
            "modelo": [""],
            "numserie": [""],
            "numPedido": [""],
            "fechaSalida": [""],
            "cliente": [""]
        });
    }
    DevolucionCreateCmp.prototype.ngOnInit = function () {
        var _this = this;
        this._devolucionService
            .getVentas()
            .subscribe(function (venta) {
            _this.venta = venta;
        });
    };
    DevolucionCreateCmp.prototype.gotoIndex = function () {
        this.router.navigate(['/ListDevoluciones']);
    };
    DevolucionCreateCmp.prototype.goBack = function () {
        window.history.back();
    };
    DevolucionCreateCmp.prototype.pedido = function (event) {
        this.modelos = [];
        this.numeros = [];
        this.prod = [];
        var value = event.srcElement.value;
        this.oidventa = value;
        for (var i = 0; i < this.venta.length; i++) {
            if (this.venta[i]._id == value) {
                for (var j = 0; j < this.venta[i].lineaventa.length; j++) {
                    this.modelos.push(this.venta[i].lineaventa[j].modelo);
                    for (var k = 0; k < this.venta[i].lineaventa[j].numSerie.length; k++) {
                        this.numeros.push(this.venta[i].lineaventa[j].numSerie[k]);
                    }
                }
            }
        }
    };
    DevolucionCreateCmp.prototype.guardalinea = function (datos) {
        var modelo = this.devolucionForm.controls['modelo'].value;
        var numserie = this.devolucionForm.controls['numserie'].value;
        if (modelo == "" || numserie == "") {
            alert("Debes rellenar los campos");
        }
        else {
            var m = { modelo: modelo, numserie: numserie };
            this.prod.push(m);
            this.numeros.splice(this.numeros.indexOf(numserie), 1);
            this.devolucionForm.controls['modelo'].updateValue("");
            this.devolucionForm.controls['numserie'].updateValue("");
        }
    };
    DevolucionCreateCmp.prototype.eliminalinea = function (lin) {
        var pos = this.prod.indexOf(lin);
        this.prod.splice(pos, 1);
    };
    DevolucionCreateCmp.prototype.save = function (datos) {
        var _this = this;
        var idventa = this.devolucionForm.controls['idventa'].value;
        var tipoDevolucion = this.devolucionForm.controls['tipoDevolucion'].value;
        var fechaEntrada = this.devolucionForm.controls['fechaEntrada'].value;
        var devuelto = this.prod;
        if (this.prod.length == 0) {
            alert("Debes añadir los materiales del pedido.");
        }
        else {
            this._devolucionService
                .add(idventa, tipoDevolucion, fechaEntrada, devuelto)
                .subscribe(function (m) {
                _this.devolucionForm.controls['idventa'].updateValue("");
                _this.devolucionForm.controls['tipoDevolucion'].updateValue("");
                _this.devolucionForm.controls['fechaEntrada'].updateValue("");
            });
            this.gotoIndex();
        }
    };
    DevolucionCreateCmp.prototype.logout = function () {
        this._loginService.logout();
        this.router.navigate(['/Login']);
    };
    DevolucionCreateCmp.prototype.compras = function () {
        this.router.navigate(['/Compras']);
    };
    DevolucionCreateCmp.prototype.ventas = function () {
        this.router.navigate(['/Ventas']);
    };
    DevolucionCreateCmp.prototype.almacen = function () {
        this.router.navigate(['/Almacen']);
    };
    DevolucionCreateCmp.prototype.admin = function () {
        this.router.navigate(['/Admin']);
    };
    DevolucionCreateCmp.prototype.gproductos = function () {
        this.router.navigate(['/ListProductos']);
    };
    DevolucionCreateCmp.prototype.gpiezas = function () {
        this.router.navigate(['/ListPiezas']);
    };
    DevolucionCreateCmp.prototype.gmodelos = function () {
        this.router.navigate(['/ListModelos']);
    };
    DevolucionCreateCmp.prototype.gproveedores = function () {
        this.router.navigate(['/ListProveedores']);
    };
    DevolucionCreateCmp.prototype.ggarantias = function () {
        this.router.navigate(['/ListGarantias']);
    };
    DevolucionCreateCmp.prototype.galmacenes = function () {
        this.router.navigate(['/ListAlmacenes']);
    };
    DevolucionCreateCmp.prototype.gclientes = function () {
        this.router.navigate(['/ListClientes']);
    };
    DevolucionCreateCmp.prototype.gventas = function () {
        this.router.navigate(['/ListVentas']);
    };
    DevolucionCreateCmp.prototype.gdevoluciones = function () {
        this.router.navigate(['/ListDevoluciones']);
    };
    DevolucionCreateCmp.prototype.ggarantiasp = function () {
        this.router.navigate(['/ListGarantiaP']);
    };
    DevolucionCreateCmp.prototype.gsegsalidas = function () {
        this.router.navigate(['/ListSegSalidas']);
    };
    DevolucionCreateCmp.prototype.gcontrolcalidad = function () {
        this.router.navigate(['/ListControlCalidad']);
    };
    DevolucionCreateCmp.prototype.greparaciones = function () {
        this.router.navigate(['/ListReparaciones']);
    };
    DevolucionCreateCmp.prototype.gpedidocompras = function () {
        this.router.navigate(['/ListCompras']);
    };
    DevolucionCreateCmp.prototype.gusuarios = function () {
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
    DevolucionCreateCmp.prototype.getProfile = function (name) {
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
        __metadata('design:type', devolucion_service_1.Devolucion)
    ], DevolucionCreateCmp.prototype, "devolucion", void 0);
    DevolucionCreateCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/devolucion/templates/create.html',
            providers: [login_service_1.LoginService, user_service_1.UserService, devolucion_service_1.DevolucionService]
        }),
        router_1.CanActivate(function () { return isloggedin_1.isLogged(); }),
        __param(0, core_1.Inject(common_1.FormBuilder)), 
        __metadata('design:paramtypes', [common_1.FormBuilder, router_1.Router, login_service_1.LoginService, user_service_1.UserService, router_1.RouteParams, devolucion_service_1.DevolucionService])
    ], DevolucionCreateCmp);
    return DevolucionCreateCmp;
}());
exports.DevolucionCreateCmp = DevolucionCreateCmp;
