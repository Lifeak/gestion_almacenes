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
var userlist_cmp_1 = require('./userlist-cmp');
var userdetails_cmp_1 = require('./userdetails-cmp');
var usercreate_cmp_1 = require('./usercreate-cmp');
var UserCmp = (function () {
    function UserCmp(fb, _userService) {
        this._userService = _userService;
        this.title = "Users";
        this.users = [];
        this.userForm = fb.group({
            "user": ["", common_1.Validators.required],
            "pass": ["", common_1.Validators.required],
            "nombre": ["", common_1.Validators.required],
            "apellido": ["", common_1.Validators.required],
            "tipo": ["", common_1.Validators.required]
        });
    }
    UserCmp.prototype.ngOnInit = function () {
        this._getAll();
    };
    UserCmp.prototype._getAll = function () {
        var _this = this;
        this._userService
            .getAll()
            .subscribe(function (users) {
            _this.users = users;
        });
    };
    // Falta arreglar funcion para que añada todo correctamente
    UserCmp.prototype.add = function (user, pass, nombre, apellido, tipo) {
        var _this = this;
        this._userService
            .add(user, pass, nombre, apellido, tipo)
            .subscribe(function (m) {
            _this.users.push(m);
            _this.userForm.controls['user'].updateValue("");
            _this.userForm.controls['pass'].updateValue("");
            _this.userForm.controls['nombre'].updateValue("");
            _this.userForm.controls['apellido'].updateValue("");
            _this.userForm.controls['tipo'].updateValue("");
        });
    };
    UserCmp.prototype.remove = function (id) {
        var _this = this;
        this._userService
            .remove(id)
            .subscribe(function () {
            _this.users.forEach(function (t, i) {
                if (t._id === id)
                    return _this.users.splice(i, 1);
            });
        });
    };
    UserCmp = __decorate([
        core_1.Component({
            selector: 'user-cmp',
            templateUrl: 'client/dev/user/templates/index.html',
            /* template: `<div class="cliente-container">
             <h1>MENU</h1>
             <nav>
              <li><a [routerLink]="['/ListUsuarios']">Listado</a></li>
              <li><a [routerLink]="['/DetailsUsuarios']">Detalles</a></li>
              
              <a href="http://localhost:3000/api/user">Este listado</a>
           </nav>
               <div>
               El resultado es..
               <router-outlet></router-outlet></div>
           </div>`,*/
            styleUrls: ['client/dev/user/styles/cliente.css'],
            providers: [user_service_1.UserService, router_1.ROUTER_PROVIDERS],
            directives: [router_1.ROUTER_DIRECTIVES]
        }),
        router_1.RouteConfig([
            { path: '/ListUsuarios', name: 'ListUsuarios', component: userlist_cmp_1.UserListCmp },
            { path: '/Create', name: 'CreateUsuario', component: usercreate_cmp_1.UserCreateCmp },
            { path: '/Details', name: 'DetailsUsuarios', component: userdetails_cmp_1.UserDetailsCmp }
        ]),
        __param(0, core_1.Inject(common_1.FormBuilder)),
        __param(1, core_1.Inject(user_service_1.UserService)), 
        __metadata('design:paramtypes', [common_1.FormBuilder, user_service_1.UserService])
    ], UserCmp);
    return UserCmp;
}());
exports.UserCmp = UserCmp;
