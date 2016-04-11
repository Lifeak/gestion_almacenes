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
var login_service_1 = require('../services/login-service');
var Hola = (function () {
    function Hola() {
        this.title = "Hola";
    }
    Hola = __decorate([
        core_1.Component({
            //selector: 'login-cmp',
            template: "<h2>hola</h2>",
            // templateUrl: 'client/dev/login/templates/login.html',
            styleUrls: ['client/dev/cliente/styles/cliente.css'],
            //directives: [ROUTER_DIRECTIVES],
            providers: [login_service_1.LoginService, router_1.ROUTER_PROVIDERS]
        }), 
        __metadata('design:paramtypes', [])
    ], Hola);
    return Hola;
}());
exports.Hola = Hola;
