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
var isloggedin_1 = require('../../services/isloggedin');
var user_service_1 = require('../../services/user/user-service');
var UserCreateCmp = (function () {
    function UserCreateCmp(fb, router, _routeParams, _loginService, _userService) {
        this.router = router;
        this._routeParams = _routeParams;
        this._loginService = _loginService;
        this._userService = _userService;
        this.userForm = fb.group({
            "user": ["", common_1.Validators.required],
            "pass": ["", common_1.Validators.required],
            "passs": ["", common_1.Validators.required],
            "nombre": ["", common_1.Validators.required],
            "apellido": ["", common_1.Validators.required],
            "tipo": ["", common_1.Validators.required]
        });
    }
    UserCreateCmp.prototype.gotoIndex = function () {
        var userId = this.user ? this.user._id : null;
        this.router.navigate(['/ListUsuarios']);
    };
    UserCreateCmp.prototype.goBack = function () {
        window.history.back();
    };
    UserCreateCmp.prototype.save = function (datos) {
        var _this = this;
        alert("entramos a guardar");
        var user = this.userForm.controls['user'].value;
        var pass = this.userForm.controls['pass'].value;
        var passs = this.userForm.controls['passs'].value;
        var nombre = this.userForm.controls['nombre'].value;
        var apellido = this.userForm.controls['apellido'].value;
        var tipo = this.userForm.controls['tipo'].value;
        if (pass == passs && pass.length > 3) {
            this._userService
                .add(user, pass, nombre, apellido, tipo)
                .subscribe(function (m) {
                _this.userForm.controls['user'].updateValue("");
                _this.userForm.controls['pass'].updateValue("");
                _this.userForm.controls['nombre'].updateValue("");
                _this.userForm.controls['apellido'].updateValue("");
                _this.userForm.controls['tipo'].updateValue("");
            });
            this.gotoIndex();
        }
        else {
            alert("Error, pass no valid. Try again.");
        }
    };
    UserCreateCmp.prototype.compras = function () {
        this.router.navigate(['/Compras']);
    };
    UserCreateCmp.prototype.ventas = function () {
        this.router.navigate(['/Ventas']);
    };
    UserCreateCmp.prototype.almacen = function () {
        this.router.navigate(['/Almacen']);
    };
    UserCreateCmp.prototype.admin = function () {
        this.router.navigate(['/Admin']);
    };
    UserCreateCmp.prototype.logout = function () {
        this._loginService.logout();
        this.router.navigate(['/Login']);
    };
    UserCreateCmp.prototype.almacenes = function () {
        this.router.navigate(['/ListAlmacenes']);
    };
    UserCreateCmp.prototype.garantias = function () {
        this.router.navigate(['/ListGarantias']);
    };
    UserCreateCmp.prototype.usuarios = function () {
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
    UserCreateCmp.prototype.getProfile = function (name) {
        var _this = this;
        this._userService
            .getProfile(name)
            .subscribe(function (user) {
            _this.profile = user[0]._id;
            _this.router.navigate(['Perfil', { id: _this.profile }]);
        });
    };
    UserCreateCmp.prototype.gproductos = function () {
        this.router.navigate(['/ListProductos']);
    };
    UserCreateCmp.prototype.gpiezas = function () {
        this.router.navigate(['/ListPiezas']);
    };
    UserCreateCmp.prototype.gmodelos = function () {
        this.router.navigate(['/ListModelos']);
    };
    UserCreateCmp.prototype.gproveedores = function () {
        this.router.navigate(['/ListProveedores']);
    };
    UserCreateCmp.prototype.ggarantias = function () {
        this.router.navigate(['/ListGarantias']);
    };
    UserCreateCmp.prototype.galmacenes = function () {
        this.router.navigate(['/ListAlmacenes']);
    };
    UserCreateCmp.prototype.gclientes = function () {
        this.router.navigate(['/ListClientes']);
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', user_service_1.User)
    ], UserCreateCmp.prototype, "user", void 0);
    UserCreateCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/user/templates/create.html',
            providers: [login_service_1.LoginService, user_service_1.UserService, user_service_1.User]
        }),
        router_1.CanActivate(function () { return isloggedin_1.isLoggedinAdmin(); }),
        __param(0, core_1.Inject(common_1.FormBuilder)), 
        __metadata('design:paramtypes', [common_1.FormBuilder, router_1.Router, router_1.RouteParams, login_service_1.LoginService, user_service_1.UserService])
    ], UserCreateCmp);
    return UserCreateCmp;
}());
exports.UserCreateCmp = UserCreateCmp;
