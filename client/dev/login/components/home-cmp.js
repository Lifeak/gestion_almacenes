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
var router_1 = require('angular2/router');
var login_service_1 = require('../services/login-service');
var isloggedin_1 = require('../services/isloggedin');
var HomeCmp = (function () {
    function HomeCmp(_loginService, router) {
        this._loginService = _loginService;
        this.router = router;
        this.title = "Home";
    }
    HomeCmp.prototype.logout = function () {
        alert("logoutt");
        this._loginService.logout();
        this.router.navigate(['/Login']);
    };
    HomeCmp = __decorate([
        core_1.Component({
            //selector: 'home-cmp',
            template: "<h1>estamos dentro</h1>\n  <button (click)=\"logout()\">Logout</button>\n",
            //templateUrl: 'client/dev/login/templates/dentro.html',
            styleUrls: ['client/dev/cliente/styles/cliente.css'],
            providers: [login_service_1.LoginService /*, ROUTER_PROVIDERS, provide(AuthHttp, { useFactory: (http) => { return new AuthHttp(new AuthConfig(), http); }, deps: [Http] })*/]
        }),
        router_1.CanActivate(function () { return isloggedin_1.isLoggedinAdmin(); }),
        __param(0, core_1.Inject(login_service_1.LoginService)), 
        __metadata('design:paramtypes', [login_service_1.LoginService, router_1.Router])
    ], HomeCmp);
    return HomeCmp;
}());
exports.HomeCmp = HomeCmp;
