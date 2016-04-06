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
var user_service_1 = require('../services/user-service');
//import {UserCmp} from './user-cmp';
var UserCreateCmp = (function () {
    function UserCreateCmp(fb, _router, _routeParams, _userService) {
        this._router = _router;
        this._routeParams = _routeParams;
        this._userService = _userService;
        this.userForm = fb.group({
            "user": ["", common_1.Validators.required],
            "pass": ["", common_1.Validators.required],
            "nombre": ["", common_1.Validators.required],
            "apellido": ["", common_1.Validators.required],
            "tipo": ["", common_1.Validators.required]
        });
    }
    UserCreateCmp.prototype.ngOnInit = function () {
    };
    UserCreateCmp.prototype.gotoIndex = function () {
        var userId = this.user ? this.user._id : null;
        this._router.navigate(['/ListUsuarios']);
    };
    UserCreateCmp.prototype.save = function (datos) {
        var _this = this;
        alert("entramos a guardar");
        var user = this.userForm.controls['user'].value;
        var pass = this.userForm.controls['pass'].value;
        var nombre = this.userForm.controls['nombre'].value;
        var apellido = this.userForm.controls['apellido'].value;
        var tipo = this.userForm.controls['tipo'].value;
        this._userService
            .add(user, pass, nombre, apellido, tipo)
            .subscribe(function (m) {
            //this.user.push(m);
            _this.userForm.controls['user'].updateValue("");
            _this.userForm.controls['pass'].updateValue("");
            _this.userForm.controls['nombre'].updateValue("");
            _this.userForm.controls['apellido'].updateValue("");
            _this.userForm.controls['tipo'].updateValue("");
        });
        this.gotoIndex();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', user_service_1.User)
    ], UserCreateCmp.prototype, "user", void 0);
    UserCreateCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/user/templates/create.html',
            styleUrls: ['client/dev/user/styles/cliente.css']
        }),
        __param(0, core_1.Inject(common_1.FormBuilder)), 
        __metadata('design:paramtypes', [common_1.FormBuilder, router_1.Router, router_1.RouteParams, user_service_1.UserService])
    ], UserCreateCmp);
    return UserCreateCmp;
}());
exports.UserCreateCmp = UserCreateCmp;
