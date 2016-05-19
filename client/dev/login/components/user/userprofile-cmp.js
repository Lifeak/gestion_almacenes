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
var UserProfileCmp = (function () {
    function UserProfileCmp(fb, _router, _routeParams, _userService, _loginService) {
        this._router = _router;
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
    UserProfileCmp.prototype.ngOnInit = function () {
        var _this = this;
        var id = this._routeParams.get('id');
        alert(id);
        this._userService
            .getUserId(id)
            .subscribe(function (user) {
            _this.user = user;
        });
    };
    UserProfileCmp.prototype.edit = function (user) {
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
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', user_service_1.User)
    ], UserProfileCmp.prototype, "user", void 0);
    UserProfileCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/user/templates/profile.html',
            styleUrls: ['client/dev/user/styles/cliente.css']
        }),
        router_1.CanActivate(function () { return isloggedin_1.isLogged(); }),
        __param(0, core_1.Inject(common_1.FormBuilder)),
        __param(4, core_1.Inject(login_service_1.LoginService)), 
        __metadata('design:paramtypes', [common_1.FormBuilder, router_1.Router, router_1.RouteParams, user_service_1.UserService, login_service_1.LoginService])
    ], UserProfileCmp);
    return UserProfileCmp;
}());
exports.UserProfileCmp = UserProfileCmp;
