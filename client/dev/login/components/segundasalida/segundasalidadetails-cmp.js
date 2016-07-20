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
var segundasalida_service_1 = require('../../services/segundasalida/segundasalida-service');
var login_service_1 = require('../../services/login-service');
var user_service_1 = require('../../services/user/user-service');
var ventas_service_1 = require('../../services/ventas/ventas-service');
var SegundaSalidaDetailsCmp = (function () {
    function SegundaSalidaDetailsCmp(fb, router, _routeParams, _userService, _segsalidaService, _loginService) {
        this.router = router;
        this._routeParams = _routeParams;
        this._userService = _userService;
        this._segsalidaService = _segsalidaService;
        this._loginService = _loginService;
        this.modelos = [];
        this.prod = [];
        this.series = [];
        this.segsalidaForm = fb.group({
            "idventa": ["", common_1.Validators.required],
            "fechaSegSalida": ["", common_1.Validators.required],
            "finGarantia": [""],
            "observaciones": [""],
            "modelo": [""],
            "unidades": [""],
            "numserie": [""],
            "salidas": [""]
        });
    }
    SegundaSalidaDetailsCmp.prototype.ngOnInit = function () {
        var _this = this;
        var id = this._routeParams.get('id');
        this._segsalidaService
            .getSegSalidaID(id)
            .subscribe(function (segsalida) {
            _this.segsalida = segsalida;
            _this.myDate = _this.segsalida.fechaSegSalida;
            _this.prod = _this.segsalida.salidas;
            for (var i = 0; i < _this.segsalida.idventa.lineaventa.length; i++) {
                _this.modelos.push(_this.segsalida.idventa.lineaventa[i].modelo);
            }
        });
    };
    SegundaSalidaDetailsCmp.prototype.gotoIndex = function () {
        this.router.navigate(['/ListSegSalidas']);
    };
    SegundaSalidaDetailsCmp.prototype.guardalinea = function (datos) {
        var modelo = this.segsalidaForm.controls['modelo'].value;
        var unidades = this.segsalidaForm.controls['unidades'].value;
        var numserie = this.series;
        if (modelo == "" || unidades != this.series.length) {
            alert("Debes rellenar los campos");
        }
        else {
            var m = { modelo: modelo, unidades: unidades, numserie: numserie };
            this.prod.push(m);
            this.segsalidaForm.controls['modelo'].updateValue("");
            this.segsalidaForm.controls['unidades'].updateValue("");
            this.series = [];
        }
    };
    SegundaSalidaDetailsCmp.prototype.eliminalinea = function (lin) {
        var pos = this.prod.indexOf(lin);
        this.prod.splice(pos, 1);
    };
    // Añade los numeros de serie a una lista
    SegundaSalidaDetailsCmp.prototype.mas = function (numserie) {
        if (numserie != "") {
            this.series.push(numserie);
            this.segsalidaForm.controls['numserie'].updateValue("");
        }
        else {
            alert("Debes rellenar los numeros de serie");
        }
    };
    // Elimina un numero de serie de la lista
    SegundaSalidaDetailsCmp.prototype.menos = function (numserie) {
        var pos = this.series.indexOf(numserie);
        this.series.splice(pos, 1);
    };
    //Esta función guarda los cambios que se hayan realizado en una salida por avería
    SegundaSalidaDetailsCmp.prototype.edit = function (segsalida) {
        var _this = this;
        var id = this._routeParams.get('id');
        if (this.prod.length == 0) {
            alert("Debes añadir los materiales del pedido.");
        }
        else {
            if (segsalida.fechaSegSalida == null) {
                segsalida.fechaSegSalida = this.myDate;
            }
            this._segsalidaService
                .add(segsalida.idventa._id, segsalida.fechaSegSalida, segsalida.finGarantia, segsalida.observaciones, this.prod)
                .subscribe(function (m) {
                _this.segsalidaForm.controls['fechaSegSalida'].updateValue("");
            });
        }
        this.delete(segsalida);
        this.gotoIndex();
    };
    SegundaSalidaDetailsCmp.prototype.delete = function (segsalida) {
        var _this = this;
        this._segsalidaService
            .remove(segsalida._id)
            .subscribe(function () {
            return _this.segsalida;
        });
        this.gotoIndex();
    };
    SegundaSalidaDetailsCmp.prototype.logout = function () {
        this._loginService.logout();
        this.router.navigate(['/Login']);
    };
    SegundaSalidaDetailsCmp.prototype.compras = function () {
        this.router.navigate(['/Compras']);
    };
    SegundaSalidaDetailsCmp.prototype.ventas = function () {
        this.router.navigate(['/Ventas']);
    };
    SegundaSalidaDetailsCmp.prototype.almacen = function () {
        this.router.navigate(['/Almacen']);
    };
    SegundaSalidaDetailsCmp.prototype.admin = function () {
        this.router.navigate(['/Admin']);
    };
    SegundaSalidaDetailsCmp.prototype.gproductos = function () {
        this.router.navigate(['/ListProductos']);
    };
    SegundaSalidaDetailsCmp.prototype.gpiezas = function () {
        this.router.navigate(['/ListPiezas']);
    };
    SegundaSalidaDetailsCmp.prototype.gmodelos = function () {
        this.router.navigate(['/ListModelos']);
    };
    SegundaSalidaDetailsCmp.prototype.gproveedores = function () {
        this.router.navigate(['/ListProveedores']);
    };
    SegundaSalidaDetailsCmp.prototype.gusuarios = function () {
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
    SegundaSalidaDetailsCmp.prototype.getProfile = function (name) {
        var _this = this;
        this._userService
            .getProfile(name)
            .subscribe(function (user) {
            _this.profile = user[0]._id;
            _this.router.navigate(['Perfil', { id: _this.profile }]);
        });
    };
    SegundaSalidaDetailsCmp.prototype.ggarantias = function () {
        this.router.navigate(['/ListGarantias']);
    };
    SegundaSalidaDetailsCmp.prototype.galmacenes = function () {
        this.router.navigate(['/ListAlmacenes']);
    };
    SegundaSalidaDetailsCmp.prototype.gclientes = function () {
        this.router.navigate(['/ListClientes']);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', segundasalida_service_1.SegSalida)
    ], SegundaSalidaDetailsCmp.prototype, "segsalida", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', ventas_service_1.Venta)
    ], SegundaSalidaDetailsCmp.prototype, "vent", void 0);
    SegundaSalidaDetailsCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/segundasalida/templates/details.html',
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [login_service_1.LoginService, user_service_1.UserService, segundasalida_service_1.SegundaSalidaService]
        }),
        router_1.CanActivate(function () { return isloggedin_1.isLogged(); }),
        __param(0, core_1.Inject(common_1.FormBuilder)),
        __param(5, core_1.Inject(login_service_1.LoginService)), 
        __metadata('design:paramtypes', [common_1.FormBuilder, router_1.Router, router_1.RouteParams, user_service_1.UserService, segundasalida_service_1.SegundaSalidaService, login_service_1.LoginService])
    ], SegundaSalidaDetailsCmp);
    return SegundaSalidaDetailsCmp;
}());
exports.SegundaSalidaDetailsCmp = SegundaSalidaDetailsCmp;
