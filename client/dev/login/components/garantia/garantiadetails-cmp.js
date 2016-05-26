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
var garantia_service_1 = require('../../services/garantia/garantia-service');
var login_service_1 = require('../../services/login-service');
var user_service_1 = require('../../services/user/user-service');
var GarantiaDetailsCmp = (function () {
    function GarantiaDetailsCmp(fb, router, _routeParams, _userService, _garantiaService, _loginService) {
        this.router = router;
        this._routeParams = _routeParams;
        this._userService = _userService;
        this._garantiaService = _garantiaService;
        this._loginService = _loginService;
        this.garantiaForm = fb.group({
            "_id": ["", common_1.Validators.required],
            "tiempo": ["", common_1.Validators.required]
        });
    }
    GarantiaDetailsCmp.prototype.ngOnInit = function () {
        var _this = this;
        var id = this._routeParams.get('id');
        this._garantiaService
            .getGarantiaId(id)
            .subscribe(function (garantia) {
            _this.garantia = garantia;
        });
    };
    GarantiaDetailsCmp.prototype.gotoIndex = function () {
        var userId = this.garantia ? this.garantia._id : null;
        this.router.navigate(['/ListGarantias']);
    };
    GarantiaDetailsCmp.prototype._getAll = function () {
        var _this = this;
        this._garantiaService
            .getAll()
            .subscribe(function (garantia) {
            _this.garantia = garantia;
        });
    };
    GarantiaDetailsCmp.prototype.edit = function (garantia) {
        var _this = this;
        var id = this._routeParams.get('id');
        alert("nos llega a editar:" + garantia._id + " pero vamos a borrar " + id);
        this._garantiaService
            .remove(id)
            .subscribe(function () {
            return _this.garantia;
        });
        this._garantiaService
            .add(garantia._id, garantia.tiempo)
            .subscribe(function (m) {
            _this.garantiaForm.controls['_id'].updateValue("");
            _this.garantiaForm.controls['tiempo'].updateValue("");
        });
        this.gotoIndex();
    };
    GarantiaDetailsCmp.prototype.delete = function (garantia) {
        var _this = this;
        this._garantiaService
            .remove(garantia._id)
            .subscribe(function () {
            return _this.garantia;
        });
        this.gotoIndex();
    };
    GarantiaDetailsCmp.prototype.compras = function () {
        this.router.navigate(['/Compras']);
    };
    GarantiaDetailsCmp.prototype.ventas = function () {
        this.router.navigate(['/Ventas']);
    };
    GarantiaDetailsCmp.prototype.goalmacen = function () {
        this.router.navigate(['/Almacen']);
    };
    GarantiaDetailsCmp.prototype.admin = function () {
        this.router.navigate(['/Admin']);
    };
    GarantiaDetailsCmp.prototype.logout = function () {
        this._loginService.logout();
        this.router.navigate(['/Login']);
    };
    GarantiaDetailsCmp.prototype.almacenes = function () {
        this.router.navigate(['/ListAlmacenes']);
    };
    GarantiaDetailsCmp.prototype.gproductos = function () {
        this.router.navigate(['/ListProductos']);
    };
    GarantiaDetailsCmp.prototype.gpiezas = function () {
        this.router.navigate(['/ListPiezas']);
    };
    GarantiaDetailsCmp.prototype.gmodelos = function () {
        this.router.navigate(['/ListModelos']);
    };
    GarantiaDetailsCmp.prototype.gproveedores = function () {
        this.router.navigate(['/ListProveedores']);
    };
    GarantiaDetailsCmp.prototype.gclientes = function () {
        this.router.navigate(['/ListClientes']);
    };
    GarantiaDetailsCmp.prototype.gusuarios = function () {
        if (localStorage.getItem(this.token) == "encargado") {
            var u = localStorage.key(1);
            if (u == "undefined") {
                var o = localStorage.key(0);
                this.getProfile(o);
            }
            else
                this.getProfile(u);
        }
        else
            this.router.navigate(['/ListUsuarios']);
    };
    GarantiaDetailsCmp.prototype.getProfile = function (name) {
        var _this = this;
        this._userService
            .getProfile(name)
            .subscribe(function (user) {
            _this.profile = user[0]._id;
            _this.router.navigate(['Perfil', { id: _this.profile }]);
            //alert("en el get, el id es " +this.profile);
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', garantia_service_1.Garantia)
    ], GarantiaDetailsCmp.prototype, "garantia", void 0);
    GarantiaDetailsCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/garantia/templates/details.html',
            providers: [garantia_service_1.GarantiaService, login_service_1.LoginService, user_service_1.UserService]
        }),
        router_1.CanActivate(function () { return isloggedin_1.isLogged(); }),
        __param(0, core_1.Inject(common_1.FormBuilder)),
        __param(5, core_1.Inject(login_service_1.LoginService)), 
        __metadata('design:paramtypes', [common_1.FormBuilder, router_1.Router, router_1.RouteParams, user_service_1.UserService, garantia_service_1.GarantiaService, login_service_1.LoginService])
    ], GarantiaDetailsCmp);
    return GarantiaDetailsCmp;
}());
exports.GarantiaDetailsCmp = GarantiaDetailsCmp;
