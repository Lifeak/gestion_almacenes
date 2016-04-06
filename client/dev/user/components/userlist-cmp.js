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
var UserListCmp = (function () {
    function UserListCmp(_userService, _router, routeParams) {
        this._userService = _userService;
        this._router = _router;
        this.title = "Users";
        this.users = [];
        this._selectedId = routeParams.get('id');
    }
    UserListCmp.prototype.ngOnInit = function () {
        this._getAll();
    };
    UserListCmp.prototype._getAll = function () {
        var _this = this;
        this._userService
            .getAll()
            .subscribe(function (users) {
            _this.users = users;
        });
    };
    UserListCmp.prototype.isSelected = function (user) {
        return user._id === this._selectedId;
    };
    UserListCmp.prototype.onSelect = function (user) {
        this._router.navigate(['DetailsUsuarios', { id: user._id }]);
    };
    UserListCmp = __decorate([
        core_1.Component({
            selector: 'ListUsuarios',
            templateUrl: 'client/dev/user/templates/list.html',
            //template:`<h1>hola</h1>`,
            styleUrls: ['client/dev/user/styles/cliente.css'],
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [user_service_1.UserService]
        }), 
        __metadata('design:paramtypes', [user_service_1.UserService, router_1.Router, router_1.RouteParams])
    ], UserListCmp);
    return UserListCmp;
}());
exports.UserListCmp = UserListCmp;
