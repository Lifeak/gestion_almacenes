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
var proveedor_service_1 = require('../services/proveedor-service');
var login_service_1 = require('../../login/services/login-service');
var proveedorlist_cmp_1 = require('./proveedorlist-cmp');
var proveedordetails_cmp_1 = require('./proveedordetails-cmp');
var proveedorcreate_cmp_1 = require('./proveedorcreate-cmp');
var ProveedorCmp /*implements OnInit*/ = (function () {
    function ProveedorCmp /*implements OnInit*/(fb, _proveedorService, _loginService, router) {
        this._proveedorService = _proveedorService;
        this._loginService = _loginService;
        this.router = router;
        this.proveedores = [];
        this.proveedorForm = fb.group({
            "nombre": ["", common_1.Validators.required],
            "direccion": ["", common_1.Validators.required],
            "ciudad": ["", common_1.Validators.required],
            "pais": ["", common_1.Validators.required],
            "telefono": ["", common_1.Validators.required],
            "valoracion": ["", common_1.Validators.required],
            "material": ["", common_1.Validators.required]
        });
    }
    ProveedorCmp /*implements OnInit*/.prototype.ngOnInit = function () {
        this._getAll();
        this.router.navigate(['/ListProveedores']);
    };
    ProveedorCmp /*implements OnInit*/.prototype._getAll = function () {
        var _this = this;
        this._proveedorService
            .getAll()
            .subscribe(function (proveedores) {
            _this.proveedores = proveedores;
        });
    };
    ProveedorCmp /*implements OnInit*/.prototype.isSelected = function (proveedor) {
        return proveedor._id === this._selectedId;
    };
    ProveedorCmp /*implements OnInit*/.prototype.onSelect = function (proveedor) {
        this.router.navigate(['DetailsProveedor', { id: proveedor._id }]);
    };
    /*  add():void {
       this._userService
           .add(user, pass, nombre, apellido, tipo)
           .subscribe((m) => {
             this.users.push(m);
             (<Control>this.userForm.controls['user']).updateValue("");
             (<Control>this.userForm.controls['pass']).updateValue("");
             (<Control>this.userForm.controls['nombre']).updateValue("");
             (<Control>this.userForm.controls['apellido']).updateValue("");
             (<Control>this.userForm.controls['tipo']).updateValue("");
           });
     }
   
     remove(id:string):void {
       this._userService
         .remove(id)
         .subscribe(() => {
           this.users.forEach((t, i) => {
             if (t._id === id)
               return this.users.splice(i, 1);
           });
         })
     }*/
    ProveedorCmp /*implements OnInit*/.prototype.logout = function () {
        this._loginService.logout();
        window.location.replace("http://localhost:3000/");
    };
    ProveedorCmp /*implements OnInit*/.prototype.compras = function () {
        window.location.replace("http://localhost:3000/#/compras");
    };
    ProveedorCmp /*implements OnInit*/.prototype.ventas = function () {
        window.location.replace("http://localhost:3000/#/ventas");
    };
    ProveedorCmp /*implements OnInit*/.prototype.almacen = function () {
        window.location.replace("http://localhost:3000/#/almacen");
    };
    ProveedorCmp /*implements OnInit*/.prototype.admin = function () {
        window.location.replace("http://localhost:3000/#/admin");
    };
    ProveedorCmp /*implements OnInit*/ = __decorate([
        core_1.Component({
            selector: 'proveedor-cmp',
            templateUrl: 'client/dev/proveedor/templates/index.html',
            //template: `<h1>holaaaaaaaaaaaaaaa</h1><h1>holaaaaaaaaaaaaaaa</h1><h1>holaaaaaaaaaaaaaaa</h1><h1>holaaaaaaaaaaaaaaa</h1>`,
            providers: [proveedor_service_1.ProveedorService, login_service_1.LoginService, router_1.ROUTER_PROVIDERS],
            directives: [router_1.ROUTER_DIRECTIVES]
        }),
        router_1.RouteConfig([
            { path: '/ListProveedores', name: 'ListProveedores', component: proveedorlist_cmp_1.ProveedorListCmp },
            { path: '/Create', name: 'CreateProveedor', component: proveedorcreate_cmp_1.ProveedorCreateCmp },
            { path: '/Details', name: 'DetailsProveedor', component: proveedordetails_cmp_1.ProveedorDetailsCmp }
        ]),
        __param(0, core_1.Inject(common_1.FormBuilder)),
        __param(1, core_1.Inject(proveedor_service_1.ProveedorService)),
        __param(2, core_1.Inject(login_service_1.LoginService)), 
        __metadata('design:paramtypes', [common_1.FormBuilder, proveedor_service_1.ProveedorService, login_service_1.LoginService, router_1.Router])
    ], ProveedorCmp /*implements OnInit*/);
    return ProveedorCmp /*implements OnInit*/;
}());
exports.ProveedorCmp /*implements OnInit*/ = ProveedorCmp /*implements OnInit*/;
