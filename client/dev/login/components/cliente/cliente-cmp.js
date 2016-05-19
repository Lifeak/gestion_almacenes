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
var cliente_service_1 = require('../services/cliente-service');
var login_service_1 = require('../../login/services/login-service');
var clientelist_cmp_1 = require('./clientelist-cmp');
var clientedetails_cmp_1 = require('./clientedetails-cmp');
var clientecreate_cmp_1 = require('./clientecreate-cmp');
var isloggedin_1 = require('../../login/services/isloggedin');
var ClienteCmp = (function () {
    function ClienteCmp(fb, _clienteService, _loginService, router) {
        this._clienteService = _clienteService;
        this._loginService = _loginService;
        this.router = router;
        this.clientes = [];
        this.clienteForm = fb.group({
            "_id": ["", common_1.Validators.required],
            "nombre": ["", common_1.Validators.required],
            "direccion": ["", common_1.Validators.required],
            "ciudad": ["", common_1.Validators.required],
            "pais": ["", common_1.Validators.required],
            "telefono1": ["", common_1.Validators.required],
            "telefono2": ["", common_1.Validators.required],
            "puestoTrabajo": ["", common_1.Validators.required],
            "email": ["", common_1.Validators.required],
            "detalles": ["", common_1.Validators.required]
        });
    }
    ClienteCmp.prototype.ngOnInit = function () {
        if (localStorage.getItem(this.token) != "encargado" && localStorage.getItem(this.token) != "admin") {
            //alert("en user cmp el localstorage es " + localStorage.getItem(this.token));
            localStorage.clear();
            window.location.replace("http://localhost:3000/");
        }
        else {
            this._getAll();
            this.router.navigate(['/ListClientes']);
        }
    };
    ClienteCmp.prototype._getAll = function () {
        var _this = this;
        this._clienteService
            .getAll()
            .subscribe(function (clientes) {
            _this.clientes = clientes;
        });
    };
    ClienteCmp.prototype.isSelected = function (cliente) {
        return cliente._id === this._selectedId;
    };
    ClienteCmp.prototype.onSelect = function (cliente) {
        this.router.navigate(['DetailsCliente', { id: cliente._id }]);
    };
    ClienteCmp.prototype.add = function (_id, nombre, direccion, ciudad, pais, telefono1, telefono2, puestoTrabajo, email, detalles) {
        var _this = this;
        this._clienteService
            .add(_id, nombre, direccion, ciudad, pais, telefono1, telefono2, puestoTrabajo, email, detalles)
            .subscribe(function (m) {
            _this.clientes.push(m);
            _this.clienteForm.controls['_id'].updateValue("");
            _this.clienteForm.controls['nombre'].updateValue("");
            _this.clienteForm.controls['direccion'].updateValue("");
            _this.clienteForm.controls['ciudad'].updateValue("");
            _this.clienteForm.controls['pais'].updateValue("");
            _this.clienteForm.controls['telefono1'].updateValue("");
            _this.clienteForm.controls['telefono2'].updateValue("");
            _this.clienteForm.controls['puestoTrabajo'].updateValue("");
            _this.clienteForm.controls['email'].updateValue("");
            _this.clienteForm.controls['detalles'].updateValue("");
        });
    };
    ClienteCmp.prototype.remove = function (id) {
        var _this = this;
        this._clienteService
            .remove(id)
            .subscribe(function () {
            _this.clientes.forEach(function (t, i) {
                if (t._id === id)
                    return _this.clientes.splice(i, 1);
            });
        });
    };
    ClienteCmp.prototype.logout = function () {
        this._loginService.logout();
        window.location.replace("http://localhost:3000/");
    };
    ClienteCmp.prototype.compras = function () {
        window.location.replace("http://localhost:3000/#/compras");
    };
    ClienteCmp.prototype.ventas = function () {
        window.location.replace("http://localhost:3000/#/ventas");
    };
    ClienteCmp.prototype.almacen = function () {
        window.location.replace("http://localhost:3000/#/almacen");
    };
    ClienteCmp.prototype.admin = function () {
        window.location.replace("http://localhost:3000/#/admin");
    };
    ClienteCmp = __decorate([
        core_1.Component({
            selector: 'cliente-cmp',
            templateUrl: 'client/dev/cliente/templates/index.html',
            styleUrls: ['client/dev/cliente/styles/cliente.css'],
            providers: [cliente_service_1.ClienteService, login_service_1.LoginService, router_1.ROUTER_PROVIDERS],
            directives: [router_1.ROUTER_DIRECTIVES]
        }),
        router_1.RouteConfig([
            { path: '/Clientes', name: 'ListClientes', component: clientelist_cmp_1.ClienteListCmp },
            { path: '/Create', name: 'CreateCliente', component: clientecreate_cmp_1.ClienteCreateCmp },
            { path: '/Details', name: 'DetailsCliente', component: clientedetails_cmp_1.ClienteDetailsCmp }
        ]),
        router_1.CanActivate(function () { return isloggedin_1.isLogged(); }),
        __param(0, core_1.Inject(common_1.FormBuilder)),
        __param(1, core_1.Inject(cliente_service_1.ClienteService)),
        __param(2, core_1.Inject(login_service_1.LoginService)), 
        __metadata('design:paramtypes', [common_1.FormBuilder, cliente_service_1.ClienteService, login_service_1.LoginService, router_1.Router])
    ], ClienteCmp);
    return ClienteCmp;
}());
exports.ClienteCmp = ClienteCmp;
