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
var user_service_1 = require('../../services/user/user-service');
var login_service_1 = require('../../services/login-service');
var UserDetailsCmp = (function () {
    function UserDetailsCmp(fb, router, _routeParams, _userService, _loginService) {
        this.router = router;
        this._routeParams = _routeParams;
        this._userService = _userService;
        this._loginService = _loginService;
        this.userForm = fb.group({
            "user": ["", common_1.Validators.required],
            "pass": ["", common_1.Validators.required],
            "nombre": ["", common_1.Validators.required],
            "apellido": ["", common_1.Validators.required],
            "tipo": ["", common_1.Validators.required]
        });
    }
    UserDetailsCmp.prototype.ngOnInit = function () {
        var _this = this;
        var id = this._routeParams.get('id');
        this._userService
            .getUserId(id)
            .subscribe(function (user) {
            _this.user = user;
        });
    };
    UserDetailsCmp.prototype.gotoIndex = function () {
        var userId = this.user ? this.user._id : null;
        this.router.navigate(['/ListUsuarios']);
    };
    UserDetailsCmp.prototype._getAll = function () {
        var _this = this;
        this._userService
            .getAll()
            .subscribe(function (users) {
            _this.user = users;
        });
    };
    UserDetailsCmp.prototype.edit = function (user) {
        var _this = this;
        this._userService
            .add(user.user, user.pass, user.nombre, user.apellido, user.tipo)
            .subscribe(function (m) {
            //this.user.push(m);
            _this.userForm.controls['user'].updateValue("");
            _this.userForm.controls['pass'].updateValue("");
            _this.userForm.controls['nombre'].updateValue("");
            _this.userForm.controls['apellido'].updateValue("");
            _this.userForm.controls['tipo'].updateValue("");
        });
        this._userService
            .remove(user._id)
            .subscribe(function () {
            return _this.user;
        });
        this.gotoIndex();
    };
    UserDetailsCmp.prototype.delete = function (user) {
        var _this = this;
        this._userService
            .remove(user._id)
            .subscribe(function () {
            return _this.user;
        });
        this.gotoIndex();
    };
    UserDetailsCmp.prototype.compras = function () {
        this.router.navigate(['/Compras']);
    };
    UserDetailsCmp.prototype.ventas = function () {
        this.router.navigate(['/Ventas']);
    };
    UserDetailsCmp.prototype.almacen = function () {
        this.router.navigate(['/Almacen']);
    };
    UserDetailsCmp.prototype.admin = function () {
        this.router.navigate(['/Admin']);
    };
    UserDetailsCmp.prototype.logout = function () {
        this._loginService.logout();
        this.router.navigate(['/Login']);
    };
    UserDetailsCmp.prototype.almacenes = function () {
        this.router.navigate(['/ListAlmacenes']);
    };
    UserDetailsCmp.prototype.garantias = function () {
        this.router.navigate(['/ListGarantias']);
    };
    UserDetailsCmp.prototype.usuarios = function () {
        this.router.navigate(['/ListUsuarios']);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', user_service_1.User)
    ], UserDetailsCmp.prototype, "user", void 0);
    UserDetailsCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/user/templates/details.html'
        }),
        router_1.CanActivate(function () { return isloggedin_1.isLogged(); }),
        __param(0, core_1.Inject(common_1.FormBuilder)),
        __param(4, core_1.Inject(login_service_1.LoginService)), 
        __metadata('design:paramtypes', [common_1.FormBuilder, router_1.Router, router_1.RouteParams, user_service_1.UserService, login_service_1.LoginService])
    ], UserDetailsCmp);
    return UserDetailsCmp;
}());
exports.UserDetailsCmp = UserDetailsCmp;
