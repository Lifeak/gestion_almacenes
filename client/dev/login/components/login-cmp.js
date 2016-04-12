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
var login_service_1 = require('../services/login-service');
var LoginCmp = (function () {
    function LoginCmp(fb, _loginService, router) {
        this._loginService = _loginService;
        this.router = router;
        this.title = "Login";
        this.error = false;
        this.loginForm = fb.group({
            "user": ["", common_1.Validators.required],
            "pass": ["", common_1.Validators.required]
        });
    }
    LoginCmp.prototype.login = function (form) {
        var _this = this;
        var user = this.loginForm.controls['user'].value;
        var pass = this.loginForm.controls['pass'].value;
        this._loginService.login(user, pass)
            .subscribe(
        //(token: any) => this.router.navigate(['./Home']),
        //() => { this.error = true; }
        function () {
            _this.gotoMenu();
        });
    };
    LoginCmp.prototype.gotoMenu = function () {
        this.router.navigate(['/Home']);
    };
    LoginCmp = __decorate([
        core_1.Component({
            //selector: 'login-cmp',
            templateUrl: 'client/dev/login/templates/login.html',
            styleUrls: ['client/dev/cliente/styles/cliente.css'],
            providers: [login_service_1.LoginService]
        }),
        __param(0, core_1.Inject(common_1.FormBuilder)),
        __param(1, core_1.Inject(login_service_1.LoginService)), 
        __metadata('design:paramtypes', [common_1.FormBuilder, login_service_1.LoginService, router_1.Router])
    ], LoginCmp);
    return LoginCmp;
}());
exports.LoginCmp = LoginCmp;
