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
var user_service_1 = require('../services/user-service');
//import {UserCmp} from './user-cmp';
var UserDetailsCmp = (function () {
    function UserDetailsCmp(_router, _routeParams, _userService) {
        this._router = _router;
        this._routeParams = _routeParams;
        this._userService = _userService;
    }
    UserDetailsCmp.prototype.ngOnInit = function () {
        var _this = this;
        var id = this._routeParams.get('_id');
        this._userService
            .getUserId(id)
            .subscribe(function (user) {
            _this.user = user;
        });
    };
    UserDetailsCmp.prototype.gotoIndex = function () {
        var userId = this.user ? this.user._id : null;
        this._router.navigate(['ListUsuarios']);
    };
    UserDetailsCmp.prototype._getAll = function () {
        var _this = this;
        this._userService
            .getAll()
            .subscribe(function (users) {
            _this.user = users;
        });
    };
    UserDetailsCmp = __decorate([
        core_1.Component({
            //selector: 'user-cmp',
            templateUrl: 'client/dev/user/templates/details.html',
            styleUrls: ['client/dev/user/styles/cliente.css']
        }), 
        __metadata('design:paramtypes', [router_1.Router, router_1.RouteParams, user_service_1.UserService])
    ], UserDetailsCmp);
    return UserDetailsCmp;
}());
exports.UserDetailsCmp = UserDetailsCmp;
