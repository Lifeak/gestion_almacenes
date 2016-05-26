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
var isloggedin_1 = require('../../services/isloggedin');
var user_service_1 = require('../../services/user/user-service');
var PiezaDetailsCmp = (function () {
    function PiezaDetailsCmp(fb, router, _routeParams, _userService, _loginService, _piezaService) {
        this.router = router;
        this._routeParams = _routeParams;
        this._userService = _userService;
        this._loginService = _loginService;
        this._piezaService = _piezaService;
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
    PiezaDetailsCmp.prototype.ngOnInit = function () {
        var _this = this;
        var id = this._routeParams.get('id');
        this._piezaService
            .getPiezaId(id)
            .subscribe(function (pieza) {
            _this.pieza = pieza;
            _this.components = _this.pieza.compuestoPor;
        });
        this._piezaService
            .getModelos()
            .subscribe(function (modelos) {
            _this.modelos = modelos;
        });
    };
    PiezaDetailsCmp.prototype.gotoIndex = function () {
        var piezaId = this.pieza ? this.pieza._id : null;
        this.router.navigate(['/ListPiezas']);
    };
    PiezaDetailsCmp.prototype._getAll = function () {
        var _this = this;
        this._piezaService
            .getAll()
            .subscribe(function (piezas) {
            _this.pieza = piezas;
        });
    };
    PiezaDetailsCmp.prototype.buscar = function (numserie) {
        alert("buscamos esta pieza " + numserie);
        this.router.navigate(['/DetailsSubPieza', { _id: numserie }]);
    };
    PiezaDetailsCmp.prototype.edit = function (pieza) {
        var _this = this;
        var id = this._routeParams.get('id');
        if (pieza.precio == null) {
            this._piezaService
                .remove(id)
                .subscribe(function () {
                return _this.pieza;
            });
            var compuestoPor = this.components;
            this._piezaService
                .add(pieza._id, pieza.modelo, pieza.estado, pieza.lote, pieza.caracterisiticas, pieza.almacen, pieza.almacenOrigen, pieza.vendido, pieza.compuestoPor, pieza.precio)
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
        }
        else if (pieza.precio.toString().indexOf(',') != -1) {
            alert("Error.La pieza no se puede modificar ya que el precio es incorrecto. Utiliza el . para los decimales.");
        }
        else {
            this._piezaService
                .remove(id)
                .subscribe(function () {
                return _this.pieza;
            });
            var compuestoPor = this.components;
            this._piezaService
                .add(pieza._id, pieza.modelo, pieza.estado, pieza.lote, pieza.caracterisiticas, pieza.almacen, pieza.almacenOrigen, pieza.vendido, pieza.compuestoPor, pieza.precio)
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
        }
    };
    PiezaDetailsCmp.prototype.delete = function (pieza) {
        var _this = this;
        var id = this._routeParams.get('id');
        this._piezaService
            .remove(id)
            .subscribe(function () {
            return _this.pieza;
        });
        this.gotoIndex();
    };
    PiezaDetailsCmp.prototype.plus = function (data) {
        var nombre = this.piezaForm.controls['compuestoPor'].value;
        if (nombre == "") {
            alert("Debes rellenar el campo.");
        }
        else {
            this.components.push(nombre);
            this.piezaForm.controls['compuestoPor'].updateValue("");
        }
    };
    PiezaDetailsCmp.prototype.minus = function (nombre) {
        this.components.splice(this.components.indexOf(nombre), 1);
    };
    PiezaDetailsCmp.prototype.logout = function () {
        this._loginService.logout();
        this.router.navigate(['/Login']);
    };
    PiezaDetailsCmp.prototype.compras = function () {
        this.router.navigate(['/Compras']);
    };
    PiezaDetailsCmp.prototype.ventas = function () {
        this.router.navigate(['/Ventas']);
    };
    PiezaDetailsCmp.prototype.almacen = function () {
        this.router.navigate(['/Almacen']);
    };
    PiezaDetailsCmp.prototype.admin = function () {
        this.router.navigate(['/Admin']);
    };
    PiezaDetailsCmp.prototype.gproductos = function () {
        this.router.navigate(['/ListProductos']);
    };
    PiezaDetailsCmp.prototype.gpiezas = function () {
        this.router.navigate(['/ListPiezas']);
    };
    PiezaDetailsCmp.prototype.gmodelos = function () {
        this.router.navigate(['/ListModelos']);
    };
    PiezaDetailsCmp.prototype.gproveedores = function () {
        this.router.navigate(['/ListProveedores']);
    };
    PiezaDetailsCmp.prototype.gusuarios = function () {
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
    PiezaDetailsCmp.prototype.getProfile = function (name) {
        var _this = this;
        this._userService
            .getProfile(name)
            .subscribe(function (user) {
            _this.profile = user[0]._id;
            _this.router.navigate(['Perfil', { id: _this.profile }]);
            //alert("en el get, el id es " +this.profile);
        });
    };
    PiezaDetailsCmp.prototype.ggarantias = function () {
        this.router.navigate(['/ListGarantias']);
    };
    PiezaDetailsCmp.prototype.galmacenes = function () {
        this.router.navigate(['/ListAlmacenes']);
    };
    PiezaDetailsCmp.prototype.gclientes = function () {
        this.router.navigate(['/ListClientes']);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', pieza_service_1.Pieza)
    ], PiezaDetailsCmp.prototype, "pieza", void 0);
    PiezaDetailsCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/pieza/templates/details.html',
            providers: [user_service_1.UserService, login_service_1.LoginService, pieza_service_1.PiezaService]
        }),
        router_1.CanActivate(function () { return isloggedin_1.isLogged(); }),
        __param(0, core_1.Inject(common_1.FormBuilder)), 
        __metadata('design:paramtypes', [common_1.FormBuilder, router_1.Router, router_1.RouteParams, user_service_1.UserService, login_service_1.LoginService, pieza_service_1.PiezaService])
    ], PiezaDetailsCmp);
    return PiezaDetailsCmp;
}());
exports.PiezaDetailsCmp = PiezaDetailsCmp;
