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
var almacen_service_1 = require('../../services/almacen/almacen-service');
var login_service_1 = require('../../services/login-service');
var user_service_1 = require('../../services/user/user-service');
var AlmacenDetailsCmp = (function () {
    function AlmacenDetailsCmp(fb, router, _routeParams, _almacenService, _loginService, _userService) {
        this.router = router;
        this._routeParams = _routeParams;
        this._almacenService = _almacenService;
        this._loginService = _loginService;
        this._userService = _userService;
        this.almacenForm = fb.group({
            "nombre": ["", common_1.Validators.required],
            "direcion": ["", common_1.Validators.required],
            "ciudad": ["", common_1.Validators.required],
            "pais": ["", common_1.Validators.required],
            "telefono": ["", common_1.Validators.required],
            "encargado": ["", common_1.Validators.required]
        });
    }
    AlmacenDetailsCmp.prototype.ngOnInit = function () {
        var _this = this;
        var id = this._routeParams.get('id');
        this._almacenService
            .getUserId(id)
            .subscribe(function (almacen) {
            _this.almacen = almacen;
        });
    };
    AlmacenDetailsCmp.prototype.gotoIndex = function () {
        var userId = this.almacen ? this.almacen._id : null;
        this.router.navigate(['/ListAlmacenes']);
    };
    AlmacenDetailsCmp.prototype._getAll = function () {
        var _this = this;
        this._almacenService
            .getAll()
            .subscribe(function (almacen) {
            _this.almacen = almacen;
        });
    };
    AlmacenDetailsCmp.prototype.edit = function (almacen) {
        var _this = this;
        this._almacenService
            .add(almacen.nombre, almacen.direccion, almacen.ciudad, almacen.pais, almacen.telefono, almacen.encargado)
            .subscribe(function (m) {
            //this.user.push(m);
            _this.almacenForm.controls['nombre'].updateValue("");
            _this.almacenForm.controls['direccion'].updateValue("");
            _this.almacenForm.controls['ciudad'].updateValue("");
            _this.almacenForm.controls['pais'].updateValue("");
            _this.almacenForm.controls['telefono'].updateValue("");
            _this.almacenForm.controls['encargado'].updateValue("");
        });
        this._almacenService
            .remove(almacen._id)
            .subscribe(function () {
            return _this.almacen;
        });
        this.gotoIndex();
    };
    AlmacenDetailsCmp.prototype.delete = function (almacen) {
        var _this = this;
        this._almacenService
            .remove(almacen._id)
            .subscribe(function () {
            return _this.almacen;
        });
        this.gotoIndex();
    };
    AlmacenDetailsCmp.prototype.compras = function () {
        this.router.navigate(['/Compras']);
    };
    AlmacenDetailsCmp.prototype.ventas = function () {
        this.router.navigate(['/Ventas']);
    };
    AlmacenDetailsCmp.prototype.goalmacen = function () {
        this.router.navigate(['/Almacen']);
    };
    AlmacenDetailsCmp.prototype.admin = function () {
        this.router.navigate(['/Admin']);
    };
    AlmacenDetailsCmp.prototype.logout = function () {
        this._loginService.logout();
        localStorage.clear();
        this.router.navigate(['/Login']);
    };
    AlmacenDetailsCmp.prototype.almacenes = function () {
        this.router.navigate(['/ListAlmacenes']);
    };
    AlmacenDetailsCmp.prototype.garantias = function () {
        this.router.navigate(['/ListGarantias']);
    };
    AlmacenDetailsCmp.prototype.gusuarios = function () {
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
    AlmacenDetailsCmp.prototype.getProfile = function (name) {
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
        __metadata('design:type', almacen_service_1.Almacen)
    ], AlmacenDetailsCmp.prototype, "almacen", void 0);
    AlmacenDetailsCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/almacen/templates/details.html',
            providers: [user_service_1.UserService, almacen_service_1.AlmacenService, login_service_1.LoginService]
        }),
        router_1.CanActivate(function () { return isloggedin_1.isLoggedinAdmin(); }),
        __param(0, core_1.Inject(common_1.FormBuilder)),
        __param(4, core_1.Inject(login_service_1.LoginService)), 
        __metadata('design:paramtypes', [common_1.FormBuilder, router_1.Router, router_1.RouteParams, almacen_service_1.AlmacenService, login_service_1.LoginService, user_service_1.UserService])
    ], AlmacenDetailsCmp);
    return AlmacenDetailsCmp;
}());
exports.AlmacenDetailsCmp = AlmacenDetailsCmp;
