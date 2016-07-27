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
var devolucion_service_1 = require('../../services/devolucion/devolucion-service');
var login_service_1 = require('../../services/login-service');
var user_service_1 = require('../../services/user/user-service');
var ventas_service_1 = require('../../services/ventas/ventas-service');
var DevolucionDetailsCmp = (function () {
    function DevolucionDetailsCmp(fb, router, _routeParams, _userService, _devolucionService, _loginService) {
        this.router = router;
        this._routeParams = _routeParams;
        this._userService = _userService;
        this._devolucionService = _devolucionService;
        this._loginService = _loginService;
        this.modelos = [];
        this.numeros = [];
        this.prod = [];
        this.devolucionForm = fb.group({
            "idventa": ["", common_1.Validators.required],
            "tipoDevolucion": ["", common_1.Validators.required],
            "fechaEntrada": ["", common_1.Validators.required],
            "modelo": [""],
            "numserie": [""],
            "devuelto": [""]
        });
    }
    DevolucionDetailsCmp.prototype.ngOnInit = function () {
        var _this = this;
        this.numeros = [];
        this.prod = [];
        this.modelos = [];
        var id = this._routeParams.get('id');
        this._devolucionService
            .getDevolucionID(id)
            .subscribe(function (devolucion) {
            _this.devolucion = devolucion;
            _this.prod = _this.devolucion.devuelto;
            for (var i = 0; i < _this.devolucion.idventa.lineaventa.length; i++) {
                _this.modelos.push(_this.devolucion.idventa.lineaventa[i].modelo);
                for (var k = 0; k < _this.devolucion.idventa.lineaventa[i].numSerie.length; k++) {
                    _this.numeros.push(_this.devolucion.idventa.lineaventa[i].numSerie[k]);
                }
            }
            /*for (var i = 0; i < this.devolucion.devuelto.length; i++) {
              alert("this.numeros:"+this.numeros.toString());
              alert(JSON.stringify(this.devolucion.devuelto[i]));
              var pos1:number = JSON.stringify(this.devolucion.devuelto[i]).search('"modelo:""');
              alert(pos1);
              if (this.numeros.indexOf(this.devolucion.devuelto[i].numSerie)>0)
                  this.numeros.splice(this.numeros.indexOf(this.devolucion.devuelto[i].numSerie,1));
              
              
            }*/
        });
    };
    DevolucionDetailsCmp.prototype.gotoIndex = function () {
        this.router.navigate(['/ListDevoluciones']);
    };
    DevolucionDetailsCmp.prototype._getAll = function () {
        var _this = this;
        this._devolucionService
            .getAll()
            .subscribe(function (devolucion) {
            _this.devolucion = devolucion;
        });
    };
    DevolucionDetailsCmp.prototype.guardalinea = function (datos) {
        var modelo = this.devolucionForm.controls['modelo'].value;
        var numserie = this.devolucionForm.controls['numserie'].value;
        if (modelo == "" || numserie == "") {
            alert("Debes rellenar los campos");
        }
        else {
            var m = { modelo: modelo, numserie: numserie };
            this.prod.push(m);
            this.numeros.splice(this.numeros.indexOf(numserie), 1);
            this.devolucionForm.controls['modelo'].updateValue("");
            this.devolucionForm.controls['numserie'].updateValue("");
        }
    };
    DevolucionDetailsCmp.prototype.eliminalinea = function (lin) {
        var pos = this.prod.indexOf(lin);
        this.prod.splice(pos, 1);
    };
    //Esta función guarda los cambios que se hayan realizado en una devolución
    DevolucionDetailsCmp.prototype.edit = function (devolucion) {
        var _this = this;
        var id = this._routeParams.get('id');
        var devuelto = this.prod;
        if (this.prod.length == 0) {
            alert("Debes añadir los materiales del pedido.");
        }
        else {
            this._devolucionService
                .add(devolucion.idventa._id, devolucion.tipoDevolucion, devolucion.fechaEntrada, devuelto)
                .subscribe(function (m) {
                _this.devolucionForm.controls['idventa'].updateValue("");
                _this.devolucionForm.controls['tipoDevolucion'].updateValue("");
                _this.devolucionForm.controls['fechaEntrada'].updateValue("");
            });
        }
        this._devolucionService
            .remove(id)
            .subscribe(function () {
            return _this.devolucion;
        });
        this.router.navigate(['/ListDevoluciones']);
    };
    DevolucionDetailsCmp.prototype.delete = function (devolucion) {
        var _this = this;
        this._devolucionService
            .remove(devolucion._id)
            .subscribe(function () {
            return _this.devolucion;
        });
        this.router.navigate(['/ListDevoluciones']);
    };
    DevolucionDetailsCmp.prototype.logout = function () {
        this._loginService.logout();
        this.router.navigate(['/Login']);
    };
    DevolucionDetailsCmp.prototype.compras = function () {
        this.router.navigate(['/Compras']);
    };
    DevolucionDetailsCmp.prototype.ventas = function () {
        this.router.navigate(['/Ventas']);
    };
    DevolucionDetailsCmp.prototype.almacen = function () {
        this.router.navigate(['/Almacen']);
    };
    DevolucionDetailsCmp.prototype.admin = function () {
        this.router.navigate(['/Admin']);
    };
    DevolucionDetailsCmp.prototype.gproductos = function () {
        this.router.navigate(['/ListProductos']);
    };
    DevolucionDetailsCmp.prototype.gpiezas = function () {
        this.router.navigate(['/ListPiezas']);
    };
    DevolucionDetailsCmp.prototype.gmodelos = function () {
        this.router.navigate(['/ListModelos']);
    };
    DevolucionDetailsCmp.prototype.gproveedores = function () {
        this.router.navigate(['/ListProveedores']);
    };
    DevolucionDetailsCmp.prototype.ggarantias = function () {
        this.router.navigate(['/ListGarantias']);
    };
    DevolucionDetailsCmp.prototype.galmacenes = function () {
        this.router.navigate(['/ListAlmacenes']);
    };
    DevolucionDetailsCmp.prototype.gclientes = function () {
        this.router.navigate(['/ListClientes']);
    };
    DevolucionDetailsCmp.prototype.gventas = function () {
        this.router.navigate(['/ListVentas']);
    };
    DevolucionDetailsCmp.prototype.gdevoluciones = function () {
        this.router.navigate(['/ListDevoluciones']);
    };
    DevolucionDetailsCmp.prototype.ggarantiasp = function () {
        this.router.navigate(['/ListGarantiaP']);
    };
    DevolucionDetailsCmp.prototype.gsegsalidas = function () {
        this.router.navigate(['/ListSegSalidas']);
    };
    DevolucionDetailsCmp.prototype.gcontrolcalidad = function () {
        this.router.navigate(['/ListControlCalidad']);
    };
    DevolucionDetailsCmp.prototype.greparaciones = function () {
        this.router.navigate(['/ListReparaciones']);
    };
    DevolucionDetailsCmp.prototype.gpedidocompras = function () {
        this.router.navigate(['/ListCompras']);
    };
    DevolucionDetailsCmp.prototype.gtransportes = function () {
        this.router.navigate(['/ListTransportes']);
    };
    DevolucionDetailsCmp.prototype.gusuarios = function () {
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
    DevolucionDetailsCmp.prototype.getProfile = function (name) {
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
        __metadata('design:type', devolucion_service_1.Devolucion)
    ], DevolucionDetailsCmp.prototype, "devolucion", void 0);
    __decorate([
        core_1.Input(), 
        __metadata('design:type', ventas_service_1.Venta)
    ], DevolucionDetailsCmp.prototype, "vent", void 0);
    DevolucionDetailsCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/devolucion/templates/details.html',
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [login_service_1.LoginService, user_service_1.UserService, devolucion_service_1.DevolucionService]
        }),
        router_1.CanActivate(function () { return isloggedin_1.isLogged(); }),
        __param(0, core_1.Inject(common_1.FormBuilder)),
        __param(5, core_1.Inject(login_service_1.LoginService)), 
        __metadata('design:paramtypes', [common_1.FormBuilder, router_1.Router, router_1.RouteParams, user_service_1.UserService, devolucion_service_1.DevolucionService, login_service_1.LoginService])
    ], DevolucionDetailsCmp);
    return DevolucionDetailsCmp;
}());
exports.DevolucionDetailsCmp = DevolucionDetailsCmp;
