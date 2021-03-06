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
var isloggedin_1 = require('../../services/isloggedin');
var cliente_service_1 = require('../../services/cliente/cliente-service');
var login_service_1 = require('../../services/login-service');
var user_service_1 = require('../../services/user/user-service');
var ClienteDetailsCmp = (function () {
    function ClienteDetailsCmp(fb, router, _routeParams, _clienteService, _userService, _loginService) {
        this.router = router;
        this._routeParams = _routeParams;
        this._clienteService = _clienteService;
        this._userService = _userService;
        this._loginService = _loginService;
        this.clienteForm = fb.group({
            "_id": ["", common_1.Validators.required],
            "nombre": ["", common_1.Validators.required],
            "direccion": ["", common_1.Validators.required],
            "ciudad": ["", common_1.Validators.required],
            "pais": ["", common_1.Validators.required],
            "telefono1": ["", common_1.Validators.required],
            "telefono2": [""],
            "puestoTrabajo": ["", common_1.Validators.required],
            "email": ["", common_1.Validators.required],
            "detalles": [""]
        });
    }
    ClienteDetailsCmp.prototype.ngOnInit = function () {
        var _this = this;
        var id = this._routeParams.get('id');
        this._clienteService
            .getClienteId(id)
            .subscribe(function (cliente) {
            _this.cliente = cliente;
        });
    };
    ClienteDetailsCmp.prototype.gotoIndex = function () {
        var clienteId = this.cliente ? this.cliente._id : null;
        this.router.navigate(['/ListClientes']);
    };
    ClienteDetailsCmp.prototype._getAll = function () {
        var _this = this;
        this._clienteService
            .getAll()
            .subscribe(function (clientes) {
            _this.cliente = clientes;
        });
    };
    ClienteDetailsCmp.prototype.edit = function (cliente) {
        var _this = this;
        if (cliente._id != "" && cliente.nombre != "" && cliente.direccion != "" && cliente.ciudad != "" && cliente.pais != "" && cliente.telefono1 != "" && cliente.puestoTrabajo != "" && cliente.email != "") {
            var id = this._routeParams.get('id');
            //alert("borramos " + id);
            this._clienteService
                .remove(id)
                .subscribe(function () {
                return _this.cliente;
            });
            //alert("añadimos " + JSON.stringify(cliente));
            this._clienteService
                .add(cliente._id, cliente.nombre, cliente.direccion, cliente.ciudad, cliente.pais, cliente.telefono1, cliente.telefono2, cliente.puestoTrabajo, cliente.email, cliente.detalles)
                .subscribe(function (m) {
                //this.cliente = this.cliente + m;
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
            this.gotoIndex();
        }
        else
            alert("Debes rellenar todos los campos obligatorios.");
    };
    ClienteDetailsCmp.prototype.delete = function (cliente) {
        var _this = this;
        this._clienteService
            .remove(cliente._id)
            .subscribe(function () {
            return _this.cliente;
        });
        this.gotoIndex();
    };
    ClienteDetailsCmp.prototype.logout = function () {
        this._loginService.logout();
        this.router.navigate(['/Login']);
    };
    ClienteDetailsCmp.prototype.compras = function () {
        this.router.navigate(['/Compras']);
    };
    ClienteDetailsCmp.prototype.ventas = function () {
        this.router.navigate(['/Ventas']);
    };
    ClienteDetailsCmp.prototype.almacen = function () {
        this.router.navigate(['/Almacen']);
    };
    ClienteDetailsCmp.prototype.admin = function () {
        this.router.navigate(['/Admin']);
    };
    ClienteDetailsCmp.prototype.gproductos = function () {
        this.router.navigate(['/ListProductos']);
    };
    ClienteDetailsCmp.prototype.gpiezas = function () {
        this.router.navigate(['/ListPiezas']);
    };
    ClienteDetailsCmp.prototype.gmodelos = function () {
        this.router.navigate(['/ListModelos']);
    };
    ClienteDetailsCmp.prototype.gproveedores = function () {
        this.router.navigate(['/ListProveedores']);
    };
    ClienteDetailsCmp.prototype.ggarantias = function () {
        this.router.navigate(['/ListGarantias']);
    };
    ClienteDetailsCmp.prototype.galmacenes = function () {
        this.router.navigate(['/ListAlmacenes']);
    };
    ClienteDetailsCmp.prototype.gclientes = function () {
        this.router.navigate(['/ListClientes']);
    };
    ClienteDetailsCmp.prototype.gventas = function () {
        this.router.navigate(['/ListVentas']);
    };
    ClienteDetailsCmp.prototype.gdevoluciones = function () {
        this.router.navigate(['/ListDevoluciones']);
    };
    ClienteDetailsCmp.prototype.ggarantiasp = function () {
        this.router.navigate(['/ListGarantiaP']);
    };
    ClienteDetailsCmp.prototype.gsegsalidas = function () {
        this.router.navigate(['/ListSegSalidas']);
    };
    ClienteDetailsCmp.prototype.gcontrolcalidad = function () {
        this.router.navigate(['/ListControlCalidad']);
    };
    ClienteDetailsCmp.prototype.greparaciones = function () {
        this.router.navigate(['/ListReparaciones']);
    };
    ClienteDetailsCmp.prototype.gpedidocompras = function () {
        this.router.navigate(['/ListCompras']);
    };
    ClienteDetailsCmp.prototype.gtransportes = function () {
        this.router.navigate(['/ListTransportes']);
    };
    ClienteDetailsCmp.prototype.gusuarios = function () {
        if (localStorage.getItem(this.token) == "encargado") {
            var u = localStorage.key(1);
            if (u == "undefined") {
                var o = localStorage.key(0);
                this.getProfile(o);
            }
            else {
                this.getProfile(u);
            }
        }
        else {
            this.router.navigate(['/ListUsuarios']);
        }
    };
    ClienteDetailsCmp.prototype.getProfile = function (name) {
        var _this = this;
        this._userService
            .getProfile(name)
            .subscribe(function (user) {
            _this.profile = user[0]._id;
            _this.router.navigate(['Perfil', { id: _this.profile }]);
        });
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', cliente_service_1.Cliente)
    ], ClienteDetailsCmp.prototype, "cliente", void 0);
    ClienteDetailsCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/cliente/templates/details.html',
            providers: [user_service_1.UserService, login_service_1.LoginService, cliente_service_1.ClienteService]
        }),
        router_1.CanActivate(function () { return isloggedin_1.isLogged(); }),
        __param(0, core_1.Inject(common_1.FormBuilder)),
        __param(5, core_1.Inject(login_service_1.LoginService)), 
        __metadata('design:paramtypes', [common_1.FormBuilder, router_1.Router, router_1.RouteParams, cliente_service_1.ClienteService, user_service_1.UserService, login_service_1.LoginService])
    ], ClienteDetailsCmp);
    return ClienteDetailsCmp;
}());
exports.ClienteDetailsCmp = ClienteDetailsCmp;
