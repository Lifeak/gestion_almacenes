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
var core_1 = require('angular2/core');
var router_1 = require('angular2/router');
var login_service_1 = require('../../services/login-service');
var user_service_1 = require('../../services/user/user-service');
var almacen_service_1 = require('../../services/almacen/almacen-service');
var isloggedin_1 = require('../../services/isloggedin');
var AlmacenListCmp = (function () {
    function AlmacenListCmp(_almacenService, _loginService, router, routeParams) {
        this._almacenService = _almacenService;
        this._loginService = _loginService;
        this.router = router;
        this.almacens = [];
        this._selectedId = routeParams.get('id');
    }
    AlmacenListCmp.prototype.ngOnInit = function () {
        this._getAll();
    };
    AlmacenListCmp.prototype._getAll = function () {
        var _this = this;
        this._almacenService
            .getAll()
            .subscribe(function (almacens) {
            _this.almacens = almacens;
        });
    };
    AlmacenListCmp.prototype.isSelected = function (almacen) {
        return almacen._id === this._selectedId;
    };
    AlmacenListCmp.prototype.onSelect = function (almacen) {
        this.router.navigate(['DetailsAlmacen', { id: almacen._id }]);
    };
    AlmacenListCmp.prototype.compras = function () {
        this.router.navigate(['/Compras']);
    };
    AlmacenListCmp.prototype.ventas = function () {
        this.router.navigate(['/Ventas']);
    };
    AlmacenListCmp.prototype.goalmacen = function () {
        this.router.navigate(['/Almacen']);
    };
    AlmacenListCmp.prototype.admin = function () {
        this.router.navigate(['/Admin']);
    };
    AlmacenListCmp.prototype.logout = function () {
        this._loginService.logout();
        this.router.navigate(['/Login']);
    };
    AlmacenListCmp.prototype.almacenes = function () {
        this.router.navigate(['/ListAlmacenes']);
    };
    AlmacenListCmp.prototype.garantias = function () {
        this.router.navigate(['/ListGarantias']);
    };
    AlmacenListCmp.prototype.usuarios = function () {
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
    AlmacenListCmp.prototype.getProfile = function (name) {
        var _this = this;
        this._userService
            .getProfile(name)
            .subscribe(function (user) {
            _this.profile = user[0]._id;
            _this.router.navigate(['Perfil', { id: _this.profile }]);
            //alert("en el get, el id es " +this.profile);
        });
    };
    AlmacenListCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/almacen/templates/list.html',
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [almacen_service_1.AlmacenService, login_service_1.LoginService, user_service_1.UserService]
        }),
        router_1.CanActivate(function () { return isloggedin_1.isLogged(); }), 
        __metadata('design:paramtypes', [almacen_service_1.AlmacenService, login_service_1.LoginService, router_1.Router, router_1.RouteParams])
    ], AlmacenListCmp);
    return AlmacenListCmp;
}());
exports.AlmacenListCmp = AlmacenListCmp;
