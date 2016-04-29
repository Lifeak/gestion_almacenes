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
var modelo_service_1 = require('../services/modelo-service');
var ModeloCreateCmp = (function () {
    function ModeloCreateCmp(fb, _router, _routeParams, _modeloService) {
        this._router = _router;
        this._routeParams = _routeParams;
        this._modeloService = _modeloService;
        this.components = ['Junta J003 Blanca (columna pared)',
            'Junta J003 Negra (columna pared)',
            'Junta J004 Blanca (columna carcasa)',
            'Junta J004 Negra (columna carcasa)',
            'Junta J006 Blanca (ranura columna)',
            'Junta J006 Negra (ranura columna)',
            'Junta estanqueidad columna',
            'Mando blanco',
            'Mando negro',
            'Sensor',
            'Cable sensor',
            'Cable plano columna',
            'Anclaje pared-columna',
            'Etiqueta código barras Col LC',
            'Etiqueta código barras Col WM',
            'Etiqueta código barras Col BM',
            'Etiqueta NSerie LC (columna)',
            'Etiqueta NSerie WM (columna)',
            'Etiqueta NSerie BM (columna)',
            'Etiqueta NSerie LC (caja)',
            'Etiqueta NSerie WM (caja)',
            'Etiqueta NSerie BM (caja)',
            'Etiquetas A y B',
            'Plantillas',
            'Bolsa escuadra',
            'Asidero caja',
            'Caja columna',
            'Conformador caja columna',
            'Tornillo 4,8x8mm (negro)',
            'Etiqueta logo',
            'J001 (Motor) Blanca',
            'J002 (Chapa) Negra',
            'J005 (Ranura carcasa) Blanca',
            'J005 (Ranura carcasa) Negra',
            'Motor',
            'Resistencia',
            'Electrónica',
            'Núcleo ferrita',
            'Rodete',
            'Cable alimentación blanco',
            'Cable alimentación negro',
            'Carcasa Blanca',
            'Carcasa Negra',
            'Tapa lateral carcasa blanca',
            'Tapa lateral carcasa negra',
            'Cable conexión',
            'Cable plano carcasa',
            'Tapa trasera carcasa',
            'Rejilla',
            'Tornillo 4,2x16mm negro',
            'Tornillo 3,5x19mm negro&blanco',
            'Tornillo 3,5x9x5mm negro&blanco',
            'Arandela plana ancha',
            'Tuerca autoblocante',
            'Taco',
            'Escarpias pequeñas',
            'Escarpias grandes',
            'Abrazadera cable',
            'Prensaestopas',
            'Antivibración carcasa',
            'Etiqueta código barras Car LC',
            'Etiqueta código barras Car WM',
            'Etiqueta código barras Car BM',
            'Etiqueta especificaciones (caja) LC',
            'Etiqueta especificaciones (caja) WM',
            'Etiqueta especificaciones (caja) BM',
            'Etiqueta NSerie LC (carcasa)',
            'Etiqueta NSerie WM (carcasa)',
            'Etiqueta NSerie BM (carcasa)',
            'Etiqueta especificaciones BM',
            'Etiqueta especificaciones LC',
            'Etiqueta especificaciones WM',
            'Etiquetas modo de uso',
            'Etiquetas packaging',
            'Manual usuario',
            'Asidero caja',
            'Caja carcasa',
            'Caja manual',
            'Caja cable',
            'Twist tie',
            'Bolsa tornillera',
            'Bolsa chapa logo',
            'Columna LC (pieza)',
            'Columna WM (pieza)',
            'Columna BM (pieza)',
            'Columna LC',
            'Columna WM',
            'Columna BM',
            'Carcasa LC',
            'Carcasa WM',
            'Carcasa BM'
        ];
        this.componentsChecked = [];
        this.uds = [];
        this.modeloForm = fb.group({
            "nombre": ["", common_1.Validators.required],
            "refinterna": ["", common_1.Validators.required],
            "caracteristicas": ["", common_1.Validators.required],
            "modeloDe": ["", common_1.Validators.required],
            "compuestoPor": [""],
            "unidades": [""],
        });
        this.componentsChecked = [];
        this.uds = [];
    }
    ModeloCreateCmp.prototype.gotoIndex = function () {
        this._router.navigate(['/ListModelos']);
    };
    ModeloCreateCmp.prototype.goBack = function () {
        window.history.back();
    };
    // Cuando se marca un checkbox, llega la opcion a setOption en la cual se comprueba en primer lugar si ese componente
    // ya estaba en el array, si esto es cierto (parte del else), es porque hemos marcado y desmarcado la casilla y por tanto deberiamos
    // eliminar ese componente del array.
    // Si ese componente no estaba añadido, lo añadimos y asignamos al array de unidades la misma unidad que contenta la posicion del array
    // de unidades. Esto es debido a que puede que no cambiemos las unidades del spin y por tanto no se lanzará el método change que añade
    // las unidades de ese componente al array de unidades.
    ModeloCreateCmp.prototype.setOption = function (comp) {
        alert("el componente es " + comp);
        if (this.componentsChecked.indexOf(comp) == -1) {
            this.componentsChecked.push(comp);
            if (this.uds.length > 0) {
                this.uds.push(this.uds[this.uds.length - 1]);
                alert("setOption   uds " + this.uds.toString());
            }
        }
        else {
            var index = this.componentsChecked.indexOf(comp);
            alert("la copia esta en " + index);
            this.componentsChecked.splice(index, 1); //Elimina el componente del array
            this.uds.splice(index, 1); // Elimina el numero de uds de ese componente en el array de uds
        }
    };
    ModeloCreateCmp.prototype.setUds = function (datos) {
        var u = this.modeloForm.controls['unidades'].value;
        alert("las unidades son " + u);
        if (this.uds.length == this.componentsChecked.length) {
            alert("setUDs   long de uds " + this.uds.length);
            alert("setUDS   long de components " + this.componentsChecked.length);
            this.uds.pop();
            this.uds.push(u);
        }
        else
            this.uds.push(u);
    };
    ModeloCreateCmp.prototype.save = function (datos) {
        var _this = this;
        var nombre = this.modeloForm.controls['nombre'].value;
        var refinterna = this.modeloForm.controls['refinterna'].value;
        var caracteristicas = this.modeloForm.controls['caracteristicas'].value;
        var modeloDe = this.modeloForm.controls['modeloDe'].value;
        var compuestoPor = this.componentsChecked;
        var unidades = this.uds;
        this._modeloService
            .add(nombre, refinterna, caracteristicas, modeloDe, compuestoPor, unidades)
            .subscribe(function (m) {
            _this.modeloForm.controls['nombre'].updateValue("");
            _this.modeloForm.controls['refinterna'].updateValue("");
            _this.modeloForm.controls['caracteristicas'].updateValue("");
            _this.modeloForm.controls['modeloDe'].updateValue("");
            _this.modeloForm.controls['compuestoPor'].updateValue("");
            _this.modeloForm.controls['unidades'].updateValue("");
        });
        this.gotoIndex();
    };
    __decorate([
        core_1.Input(), 
        __metadata('design:type', (typeof (_a = typeof modelo_service_1.Modelo !== 'undefined' && modelo_service_1.Modelo) === 'function' && _a) || Object)
    ], ModeloCreateCmp.prototype, "modelo", void 0);
    ModeloCreateCmp = __decorate([
        core_1.Component({
            templateUrl: 'client/dev/modelo/templates/create.html',
            styleUrls: ['client/dev/modelo/styles/cliente.css']
        }),
        __param(0, core_1.Inject(common_1.FormBuilder)), 
        __metadata('design:paramtypes', [common_1.FormBuilder, router_1.Router, router_1.RouteParams, (typeof (_b = typeof modelo_service_1.ModeloService !== 'undefined' && modelo_service_1.ModeloService) === 'function' && _b) || Object])
    ], ModeloCreateCmp);
    return ModeloCreateCmp;
    var _a, _b;
}());
exports.ModeloCreateCmp = ModeloCreateCmp;
