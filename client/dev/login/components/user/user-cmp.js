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
var login_service_1 = require('../../login/services/login-service');
var login_cmp_1 = require('../../login/components/login-cmp');
var userlist_cmp_1 = require('./userlist-cmp');
var userdetails_cmp_1 = require('./userdetails-cmp');
var usercreate_cmp_1 = require('./usercreate-cmp');
var userprofile_cmp_1 = require('./userprofile-cmp');
var isloggedin_1 = require('../../login/services/isloggedin');
var UserCmp = (function () {
    function UserCmp(fb, _userService, _loginService, router) {
        this._userService = _userService;
        this._loginService = _loginService;
        this.router = router;
        this.users = [];
        this.userForm = fb.group({
            "user": ["", common_1.Validators.required],
            "pass": ["", common_1.Validators.required],
            "nombre": ["", common_1.Validators.required],
            "apellido": ["", common_1.Validators.required],
            "tipo": ["", common_1.Validators.required]
        });
        //this.profile = "";
    }
    UserCmp.prototype.ngOnInit = function () {
        if (localStorage.getItem(this.token) != "encargado" && localStorage.getItem(this.token) != "admin") {
            //alert("en user cmp el localstorage es " + localStorage.getItem(this.token));
            localStorage.clear();
            window.location.replace("http://localhost:3000/");
        }
        else {
            if (localStorage.getItem(this.token) == "encargado") {
                //alert("soy un encargadillo");
                var u = localStorage.key(1);
                //alert("en u tenemos " + u);
                this.getProfile(u);
            }
            else
                //alert("soy admin");
                this._getAll();
            this.router.navigate(['/ListUsuarios']);
        }
    };
    UserCmp.prototype._getAll = function () {
        var _this = this;
        this._userService
            .getAll()
            .subscribe(function (users) {
            _this.users = users;
        });
    };
    UserCmp.prototype.getProfile = function (name) {
        var _this = this;
        this._userService
            .getProfile(name)
            .subscribe(function (user) {
            _this.profile = user[0]._id;
            _this.router.navigate(['Perfil', { id: _this.profile }]);
            //alert("en el get, el id es " +this.profile);
        });
    };
    UserCmp.prototype.isSelected = function (user) {
        return user._id === this._selectedId;
    };
    UserCmp.prototype.onSelect = function (user) {
        this.router.navigate(['DetailsUsuarios', { id: user._id }]);
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
    UserCmp.prototype.logout = function () {
        alert("logoutt");
        this._loginService.logout();
        window.location.replace("http://localhost:3000/");
    };
    UserCmp.prototype.compras = function () {
        window.location.replace("http://localhost:3000/#/compras");
    };
    UserCmp.prototype.ventas = function () {
        window.location.replace("http://localhost:3000/#/ventas");
    };
    UserCmp.prototype.almacen = function () {
        window.location.replace("http://localhost:3000/#/almacen");
    };
    UserCmp.prototype.admin = function () {
        window.location.replace("http://localhost:3000/#/admin");
    };
    UserCmp = __decorate([
        core_1.Component({
            selector: 'user-cmp',
            templateUrl: 'client/dev/user/templates/index.html',
            providers: [user_service_1.UserService, login_service_1.LoginService, router_1.ROUTER_PROVIDERS],
            directives: [router_1.ROUTER_DIRECTIVES]
        }),
        router_1.RouteConfig([
            { path: '/ListUsuarios', name: 'ListUsuarios', component: userlist_cmp_1.UserListCmp },
            { path: '/Create', name: 'CreateUsuario', component: usercreate_cmp_1.UserCreateCmp },
            { path: '/Details', name: 'DetailsUsuarios', component: userdetails_cmp_1.UserDetailsCmp },
            { path: '/Profile', name: 'Perfil', component: userprofile_cmp_1.UserProfileCmp },
            { path: '/', name: 'Login', component: login_cmp_1.LoginCmp }
        ]),
        router_1.CanActivate(function () { return isloggedin_1.isLogged(); }),
        __param(0, core_1.Inject(common_1.FormBuilder)),
        __param(1, core_1.Inject(user_service_1.UserService)),
        __param(2, core_1.Inject(login_service_1.LoginService)), 
        __metadata('design:paramtypes', [common_1.FormBuilder, user_service_1.UserService, login_service_1.LoginService, router_1.Router])
    ], UserCmp);
    return UserCmp;
}());
exports.UserCmp = UserCmp;
