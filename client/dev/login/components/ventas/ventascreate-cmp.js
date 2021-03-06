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
var login_service_1 = require('../../services/login-service');
var isloggedin_1 = require('../../services/isloggedin');
var ventas_service_1 = require('../../services/ventas/ventas-service');
var user_service_1 = require('../../services/user/user-service');
var garantiapieza_service_1 = require('../../services/garantiapieza/garantiapieza-service');
var VentaCreateCmp = (function () {
    function VentaCreateCmp(fb, router, _routeParams, _userService, _ventasService, _loginService, _garantiapService) {
        this.router = router;
        this._routeParams = _routeParams;
        this._userService = _userService;
        this._ventasService = _ventasService;
        this._loginService = _loginService;
        this._garantiapService = _garantiapService;
        this.lineas = [];
        this.modelos = [];
        this.paises = [];
        this.series = [];
        this.transportes = [];
        this.long = 0;
        this.error = "";
        this.generagarantia = []; // Almacenará los numeros de serie de todos los productos vendidos para generar sus garantías
        this.ventaForm = fb.group({
            "cliente": ["", common_1.Validators.required],
            "direccionEnvio": ["", common_1.Validators.required],
            "ciudad": ["", common_1.Validators.required],
            "pais": ["", common_1.Validators.required],
            "numPedido": ["", common_1.Validators.required],
            "fechaSalida": ["", common_1.Validators.required],
            "transporte": ["", common_1.Validators.required],
            "agente": [""],
            "observaciones": [""],
            "lineasventa": [""],
            "modelo": [""],
            "unidades": [""],
            "tipoOperacion": [""],
            "numSerie": [""]
        });
    }
    VentaCreateCmp.prototype.ngOnInit = function () {
        var _this = this;
        this._ventasService
            .getModelos()
            .subscribe(function (modelos) {
            _this.modelos = modelos;
        });
        this._ventasService
            .getGarantiaPais()
            .subscribe(function (garantias) {
            _this.paises = garantias;
        });
        this._ventasService
            .getTransportes()
            .subscribe(function (transportes) {
            _this.transportes = transportes;
        });
    };
    VentaCreateCmp.prototype.gotoIndex = function () {
        this.router.navigate(['/ListVentas']);
    };
    VentaCreateCmp.prototype.goBack = function () {
        window.history.back();
    };
    VentaCreateCmp.prototype.save = function (datos) {
        var _this = this;
        if (this.lineas.length == 0) {
            //  alert("Debes introducir las lineas de pedido");
            this.error = "Debes introducir las lineas de pedido";
        }
        else {
            var cliente = this.ventaForm.controls['cliente'].value;
            var direccionEnvio = this.ventaForm.controls['direccionEnvio'].value;
            var ciudad = this.ventaForm.controls['ciudad'].value;
            var pais = this.ventaForm.controls['pais'].value;
            var numPedido = this.ventaForm.controls['numPedido'].value;
            var fechaSalida = this.ventaForm.controls['fechaSalida'].value;
            var agente = this.ventaForm.controls['agente'].value;
            var transporte = this.ventaForm.controls['transporte'].value;
            var observaciones = this.ventaForm.controls['observaciones'].value;
            var finGarantia = fechaSalida;
            var lineas = this.lineas;
            if (pais == "") {
                alert("Debes rellenar el país");
            }
            else {
                for (var i = 0; i < this.paises.length; i++) {
                    if (this.paises[i]._id == pais)
                        var tiempo = this.paises[i].tiempo;
                }
                finGarantia = this.setfinGarantia(finGarantia, tiempo);
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
                this._ventasService
                    .add(cliente, direccionEnvio, ciudad, pais, numPedido, fechaSalida, finGarantia, transporte, agente, observaciones, lineas)
                    .subscribe(function (m) {
                    _this.ventaForm.controls['cliente'].updateValue("");
                    _this.ventaForm.controls['direccionEnvio'].updateValue("");
                    _this.ventaForm.controls['ciudad'].updateValue("");
                    _this.ventaForm.controls['pais'].updateValue("");
                    _this.ventaForm.controls['numPedido'].updateValue("");
                    _this.ventaForm.controls['fechaSalida'].updateValue("");
                    _this.ventaForm.controls['agente'].updateValue("");
                    _this.ventaForm.controls['transporte'].updateValue("");
                    _this.ventaForm.controls['observaciones'].updateValue("");
                });
                this.lineas = [];
                this.gotoIndex();
            }
        }
    };
    // Añade los numeros de serie a una lista
    VentaCreateCmp.prototype.mas = function (numSerie) {
        if (numSerie != "") {
            this.series.push(numSerie);
            this.ventaForm.controls['numSerie'].updateValue("");
        }
        else {
            alert("Debes rellenar los numeros de serie");
        }
    };
    // Elimina un numero de serie de la lista
    VentaCreateCmp.prototype.menos = function (numSerie) {
        var pos = this.series.indexOf(numSerie);
        this.series.splice(pos, 1);
    };
    // Toma los datos del formulario del modal y los guarda en una linea de pedido
    VentaCreateCmp.prototype.guardalinea = function (datos) {
        var modelo = this.ventaForm.controls['modelo'].value;
        var unidades = this.ventaForm.controls['unidades'].value;
        var tipoOperacion = this.ventaForm.controls['tipoOperacion'].value;
        var numSerie = this.series;
        // Añadimos los números de serie para generar las garantias
        for (var i = 0; i < this.series.length; i++) {
            this.long = this.long + 1;
            this.generagarantia.push(this.series[i]);
        }
        if (modelo == "" || unidades == null || tipoOperacion == "") {
            alert("Debes rellenar todos los campos");
        }
        else {
            if (unidades != this.series.length) {
                alert("Los numeros de serie no se corresponden con el número de unidades vendidas.");
            }
            else {
                var nuevalinea = { modelo: modelo, unidades: unidades, tipoOperacion: tipoOperacion, numSerie: numSerie };
                this.lineas.push(nuevalinea);
                this.ventaForm.controls['modelo'].updateValue("");
                this.ventaForm.controls['unidades'].updateValue("");
                this.ventaForm.controls['tipoOperacion'].updateValue("");
                this.series = [];
            }
        }
    };
    // Elimina una linea del pedido
    VentaCreateCmp.prototype.eliminalinea = function (lin) {
        var pos = this.lineas.indexOf(lin);
        // ELiminamos los numeros de serie(de la linea) de la seccion de los numeros que hay que añadir en garantias
        this.long = this.long - 1;
        for (var i = 0; i < this.lineas.length; i++) {
            if (i == pos) {
                var a = JSON.stringify(this.lineas[i]).lastIndexOf("\"numSerie\":[\"");
                var b = JSON.stringify(this.lineas[i]).lastIndexOf('"');
                var quita = JSON.stringify(this.lineas[i]).substring(a + 13, b);
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
        // Eliminamos la linea
        this.lineas.splice(pos, 1);
    };
    // Funcion que asigna la fecha de fin de garantia en función de la fecha de salida y del tiempo de garantia
    // asignado a cada país.
    VentaCreateCmp.prototype.setfinGarantia = function (finGarantia, tiempo) {
        var fecha = new Date();
        var dia = parseInt(finGarantia.toString().substring(8, 10));
        var mes = parseInt(finGarantia.toString().substring(5, 7));
        var año = parseInt(finGarantia.toString().substring(0, 4));
        fecha.setFullYear(año, mes - 1, dia);
        fecha.setMonth(fecha.getMonth() + tiempo);
        finGarantia = fecha;
        return finGarantia;
    };
    VentaCreateCmp.prototype.logout = function () {
        this._loginService.logout();
        this.router.navigate(['/Login']);
    };
    VentaCreateCmp.prototype.compras = function () {
        this.router.navigate(['/Compras']);
    };
    VentaCreateCmp.prototype.ventas = function () {
        this.router.navigate(['/Ventas']);
    };
    VentaCreateCmp.prototype.almacen = function () {
        this.router.navigate(['/Almacen']);
    };
    VentaCreateCmp.prototype.admin = function () {
        this.router.navigate(['/Admin']);
    };
    VentaCreateCmp.prototype.gproductos = function () {
        this.router.navigate(['/ListProductos']);
    };
    VentaCreateCmp.prototype.gpiezas = function () {
        this.router.navigate(['/ListPiezas']);
    };
    VentaCreateCmp.prototype.gmodelos = function () {
        this.router.navigate(['/ListModelos']);
    };
    VentaCreateCmp.prototype.gproveedores = function () {
        this.router.navigate(['/ListProveedores']);
    };
    VentaCreateCmp.prototype.ggarantias = function () {
        this.router.navigate(['/ListGarantias']);
    };
    VentaCreateCmp.prototype.galmacenes = function () {
        this.router.navigate(['/ListAlmacenes']);
    };
    VentaCreateCmp.prototype.gclientes = function () {
        this.router.navigate(['/ListClientes']);
    };
    VentaCreateCmp.prototype.gventas = function () {
        this.router.navigate(['/ListVentas']);
    };
    VentaCreateCmp.prototype.gdevoluciones = function () {
        this.router.navigate(['/ListDevoluciones']);
    };
    VentaCreateCmp.prototype.ggarantiasp = function () {
        this.router.navigate(['/ListGarantiaP']);
    };
    VentaCreateCmp.prototype.gsegsalidas = function () {
        this.router.navigate(['/ListSegSalidas']);
    };
    VentaCreateCmp.prototype.gcontrolcalidad = function () {
        this.router.navigate(['/ListControlCalidad']);
    };
    VentaCreateCmp.prototype.greparaciones = function () {
        this.router.navigate(['/ListReparaciones']);
    };
    VentaCreateCmp.prototype.gpedidocompras = function () {
        this.router.navigate(['/ListCompras']);
    };
    VentaCreateCmp.prototype.gtransportes = function () {
        this.router.navigate(['/ListTransportes']);
    };
    VentaCreateCmp.prototype.gusuarios = function () {
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
    VentaCreateCmp.prototype.getProfile = function (name) {
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
        __metadata('design:type', ventas_service_1.Venta)
    ], VentaCreateCmp.prototype, "venta", void 0);
    VentaCreateCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/ventas/templates/create.html',
            directives: [router_1.ROUTER_DIRECTIVES],
            providers: [login_service_1.LoginService, user_service_1.UserService, ventas_service_1.VentasService, garantiapieza_service_1.GarantiapService]
        }),
        router_1.CanActivate(function () { return isloggedin_1.isLogged(); }),
        __param(0, core_1.Inject(common_1.FormBuilder)), 
        __metadata('design:paramtypes', [common_1.FormBuilder, router_1.Router, router_1.RouteParams, user_service_1.UserService, ventas_service_1.VentasService, login_service_1.LoginService, garantiapieza_service_1.GarantiapService])
    ], VentaCreateCmp);
    return VentaCreateCmp;
}());
exports.VentaCreateCmp = VentaCreateCmp;
