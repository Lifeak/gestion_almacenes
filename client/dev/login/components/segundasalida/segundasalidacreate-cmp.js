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
var login_service_1 = require('../../services/login-service');
var segundasalida_service_1 = require('../../services/segundasalida/segundasalida-service');
var user_service_1 = require('../../services/user/user-service');
var garantiapieza_service_1 = require('../../services/garantiapieza/garantiapieza-service');
var SegundaSalidaCreateCmp = (function () {
    function SegundaSalidaCreateCmp(fb, router, _loginService, _userService, _routeParams, _segsalidaService, _garantiapService) {
        this.router = router;
        this._loginService = _loginService;
        this._userService = _userService;
        this._routeParams = _routeParams;
        this._segsalidaService = _segsalidaService;
        this._garantiapService = _garantiapService;
        this.modelos = [];
        this.venta = [];
        this.prod = [];
        this.series = [];
        this.long = 0;
        this.generagarantia = []; // Almacenará los numeros de serie de todos los productos vendidos para generar sus garantías
        this.segsalidaForm = fb.group({
            "idventa": ["", common_1.Validators.required],
            "fechaSegSalida": ["", common_1.Validators.required],
            "finGarantia": [""],
            "observaciones": [""],
            "salidas": [""],
            "modelo": [""],
            "unidades": [""],
            "numserie": [""],
            "numPedido": [""],
            "fechaSalida": [""],
            "cliente": [""]
        });
    }
    SegundaSalidaCreateCmp.prototype.ngOnInit = function () {
        var _this = this;
        this._segsalidaService
            .getVentas()
            .subscribe(function (venta) {
            _this.venta = venta;
        });
    };
    SegundaSalidaCreateCmp.prototype.gotoIndex = function () {
        this.router.navigate(['/ListSegSalidas']);
    };
    SegundaSalidaCreateCmp.prototype.goBack = function () {
        window.history.back();
    };
    SegundaSalidaCreateCmp.prototype.pedido = function (event) {
        this.modelos = [];
        this.prod = [];
        var value = event.srcElement.value;
        this.oidventa = value;
        for (var i = 0; i < this.venta.length; i++) {
            if (this.venta[i]._id == value) {
                for (var j = 0; j < this.venta[i].lineaventa.length; j++) {
                    this.modelos.push(this.venta[i].lineaventa[j].modelo);
                }
            }
        }
    };
    // Añade los numeros de serie a una lista
    SegundaSalidaCreateCmp.prototype.mas = function (numserie) {
        if (numserie != "") {
            this.series.push(numserie);
            this.segsalidaForm.controls['numserie'].updateValue("");
        }
        else {
            alert("Debes rellenar los numeros de serie");
        }
    };
    // Elimina un numero de serie de la lista
    SegundaSalidaCreateCmp.prototype.menos = function (numserie) {
        var pos = this.series.indexOf(numserie);
        this.series.splice(pos, 1);
    };
    SegundaSalidaCreateCmp.prototype.guardalinea = function (datos) {
        var modelo = this.segsalidaForm.controls['modelo'].value;
        var unidades = this.segsalidaForm.controls['unidades'].value;
        var numserie = this.series;
        if (modelo == "" || unidades == null || this.series.length == 0) {
            alert("Debes rellenar los campos");
        }
        else {
            if (unidades != this.series.length) {
                alert("Los números de serie no se corresponden con las unidades.");
            }
            else {
                // Añadimos los números de serie para generar las garantias
                for (var i = 0; i < this.series.length; i++) {
                    this.long = this.long + 1;
                    this.generagarantia.push(this.series[i]);
                }
                var m = { modelo: modelo, unidades: unidades, numserie: numserie };
                this.prod.push(m);
                this.segsalidaForm.controls['modelo'].updateValue("");
                this.segsalidaForm.controls['unidades'].updateValue("");
                this.series = [];
            }
        }
    };
    SegundaSalidaCreateCmp.prototype.eliminalinea = function (lin) {
        var pos = this.prod.indexOf(lin);
        // ELiminamos los numeros de serie(de la linea) de la seccion de los numeros que hay que añadir en garantias
        this.long = this.long - 1;
        for (var i = 0; i < this.prod.length; i++) {
            if (i == pos) {
                var a = JSON.stringify(this.prod[i]).lastIndexOf("\"numserie\":[\"");
                var b = JSON.stringify(this.prod[i]).lastIndexOf('"');
                var quita = JSON.stringify(this.prod[i]).substring(a + 13, b);
            }
        }
        var aux = "";
        for (var i = 0; i < quita.length; i++) {
            if (quita[i] == "\"" || quita[i] == ",") {
                if (quita[i] == ",") {
                    this.long = this.long - 1;
                }
                var posaux = this.generagarantia.indexOf(aux);
                this.generagarantia.splice(posaux, 1);
                aux = "";
            }
            else {
                aux = aux + quita[i];
            }
        }
        this.prod.splice(pos, 1);
    };
    // Funcion que asigna la fecha de fin de garantia en función de la fecha de salida y del tiempo de garantia
    // asignado a cada país.
    SegundaSalidaCreateCmp.prototype.setfinGarantia = function (finGarantia) {
        var fecha = new Date();
        var dia = parseInt(finGarantia.toString().substring(8, 10));
        var mes = parseInt(finGarantia.toString().substring(5, 7));
        var año = parseInt(finGarantia.toString().substring(0, 4));
        fecha.setFullYear(año, mes - 1, dia);
        fecha.setMonth(fecha.getMonth() + 6);
        finGarantia = fecha;
        return finGarantia;
    };
    SegundaSalidaCreateCmp.prototype.save = function (datos) {
        var _this = this;
        var idventa = this.segsalidaForm.controls['idventa'].value;
        var fechaSegSalida = this.segsalidaForm.controls['fechaSegSalida'].value;
        var finGarantia = this.setfinGarantia(fechaSegSalida);
        var observaciones = this.segsalidaForm.controls['observaciones'].value;
        var salidas = this.prod;
        if (this.prod.length == 0) {
            alert("Debes añadir los materiales de la salida.");
        }
        else {
            // Añadimos las garantias de los productos vendidos
            var idp = this.generagarantia.pop();
            while (this.long > 0) {
                this.long = this.long - 1;
                this._garantiapService.add(idp, finGarantia).subscribe(function (m) {
                });
                ;
                idp = this.generagarantia.pop();
                this.generagarantia.splice(this.generagarantia.indexOf(idp), 1);
            }
            this._segsalidaService
                .add(idventa, fechaSegSalida, finGarantia, observaciones, salidas)
                .subscribe(function (m) {
                _this.segsalidaForm.controls['idventa'].updateValue("");
                _this.segsalidaForm.controls['fechaSegSalida'].updateValue("");
                _this.segsalidaForm.controls['observaciones'].updateValue("");
            });
            this.gotoIndex();
        }
    };
    SegundaSalidaCreateCmp.prototype.logout = function () {
        this._loginService.logout();
        this.router.navigate(['/Login']);
    };
    SegundaSalidaCreateCmp.prototype.compras = function () {
        this.router.navigate(['/Compras']);
    };
    SegundaSalidaCreateCmp.prototype.ventas = function () {
        this.router.navigate(['/Ventas']);
    };
    SegundaSalidaCreateCmp.prototype.almacen = function () {
        this.router.navigate(['/Almacen']);
    };
    SegundaSalidaCreateCmp.prototype.admin = function () {
        this.router.navigate(['/Admin']);
    };
    SegundaSalidaCreateCmp.prototype.gproductos = function () {
        this.router.navigate(['/ListProductos']);
    };
    SegundaSalidaCreateCmp.prototype.gpiezas = function () {
        this.router.navigate(['/ListPiezas']);
    };
    SegundaSalidaCreateCmp.prototype.gmodelos = function () {
        this.router.navigate(['/ListModelos']);
    };
    SegundaSalidaCreateCmp.prototype.gproveedores = function () {
        this.router.navigate(['/ListProveedores']);
    };
    SegundaSalidaCreateCmp.prototype.ggarantias = function () {
        this.router.navigate(['/ListGarantias']);
    };
    SegundaSalidaCreateCmp.prototype.galmacenes = function () {
        this.router.navigate(['/ListAlmacenes']);
    };
    SegundaSalidaCreateCmp.prototype.gclientes = function () {
        this.router.navigate(['/ListClientes']);
    };
    SegundaSalidaCreateCmp.prototype.gventas = function () {
        this.router.navigate(['/ListVentas']);
    };
    SegundaSalidaCreateCmp.prototype.gdevoluciones = function () {
        this.router.navigate(['/ListDevoluciones']);
    };
    SegundaSalidaCreateCmp.prototype.ggarantiasp = function () {
        this.router.navigate(['/ListGarantiaP']);
    };
    SegundaSalidaCreateCmp.prototype.gsegsalidas = function () {
        this.router.navigate(['/ListSegSalidas']);
    };
    SegundaSalidaCreateCmp.prototype.gcontrolcalidad = function () {
        this.router.navigate(['/ListControlCalidad']);
    };
    SegundaSalidaCreateCmp.prototype.greparaciones = function () {
        this.router.navigate(['/ListReparaciones']);
    };
    SegundaSalidaCreateCmp.prototype.gpedidocompras = function () {
        this.router.navigate(['/ListCompras']);
    };
    SegundaSalidaCreateCmp.prototype.gtransportes = function () {
        this.router.navigate(['/ListTransportes']);
    };
    SegundaSalidaCreateCmp.prototype.gusuarios = function () {
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
    SegundaSalidaCreateCmp.prototype.getProfile = function (name) {
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
        __metadata('design:type', segundasalida_service_1.SegSalida)
    ], SegundaSalidaCreateCmp.prototype, "segsalida", void 0);
    SegundaSalidaCreateCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/segundasalida/templates/create.html',
            providers: [login_service_1.LoginService, user_service_1.UserService, segundasalida_service_1.SegundaSalidaService, garantiapieza_service_1.GarantiapService]
        }),
        router_1.CanActivate(function () { return isloggedin_1.isLogged(); }),
        __param(0, core_1.Inject(common_1.FormBuilder)), 
        __metadata('design:paramtypes', [common_1.FormBuilder, router_1.Router, login_service_1.LoginService, user_service_1.UserService, router_1.RouteParams, segundasalida_service_1.SegundaSalidaService, garantiapieza_service_1.GarantiapService])
    ], SegundaSalidaCreateCmp);
    return SegundaSalidaCreateCmp;
}());
exports.SegundaSalidaCreateCmp = SegundaSalidaCreateCmp;
