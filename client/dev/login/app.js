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
var login_service_1 = require('./services/login-service');
var login_cmp_1 = require('./components/login-cmp');
var home_cmp_1 = require('./components/home-cmp');
var App = (function () {
    function App() {
    }
    App = __decorate([
        core_1.Component({
            selector: 'app',
            directives: [router_1.ROUTER_DIRECTIVES],
            template: "<h1>Welcome</h1>\n\t\t\t\t<router-outlet></router-outlet>\n\t\t\t\t",
            providers: [router_1.ROUTER_PROVIDERS, core_1.provide(router_1.LocationStrategy, { useClass: router_1.HashLocationStrategy }), login_service_1.LoginService]
        }),
        router_1.RouteConfig([
            { path: '/', redirectTo: ['./Login'] },
            { path: '/home', name: 'Home', component: home_cmp_1.HomeCmp },
            { path: '/login', name: 'Login', component: login_cmp_1.LoginCmp }
        ]), 
        __metadata('design:paramtypes', [])
    ], App);
    return App;
}());
exports.App = App;
//bootstrap(App, [ROUTER_PROVIDERS]);
