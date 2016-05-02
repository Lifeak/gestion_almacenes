import {
  Component,
  Input,
  Inject,
  OnInit
} from 'angular2/core';

import {
  Validators,
  FormBuilder,
  ControlGroup,
  Control
} from 'angular2/common';

import {
  RouteParams,
  Router
} from 'angular2/router';


import {Pieza,PiezaService} from '../services/pieza-service';
import {LoginService} from '../../login/services/login-service';


@Component({
  templateUrl: 'client/dev/pieza/templates/detailss.html',
  styleUrls: ['client/dev/pieza/styles/cliente.css']
})


export class PiezaSubDetailsCmp implements OnInit {
  @Input() pieza: Pieza;
  piezaForm: ControlGroup;

  constructor( @Inject(FormBuilder) fb: FormBuilder, private _router: Router, private _routeParams: RouteParams, private _piezaService: PiezaService, @Inject(LoginService) private _loginService: LoginService) {
    this.piezaForm = fb.group({
      "_id": ["", Validators.required],
      "modelo": ["", Validators.required],
      "estado": ["", Validators.required],
      "lote": ["", Validators.required],
      "caracteristicas": [""],
      "almacen": ["",Validators.required],
      "almacenOrigen": ["",Validators.required],
      "vendido":["",Validators.required],
      "compuestoPor":[""],
      "precio":[""]
    });
  }
  

  ngOnInit() {
    this._piezaService
    .getPiezaName(name)
    .subscribe((pieza) => {
    this.pieza = pieza;
    });
  }

  gotoIndex(){
    let clienteName = this.pieza ? this.pieza._id : null;
    //this._router.navigate(['/ListModelos']);
    window.history.back();
  }

  private _getAll():void {
    this._piezaService
        .getAll()
        .subscribe((piezas) => {
      this.pieza = piezas;
        });
  }

  buscar(nombre){
      //alert("buscamos este nombre "+nombre);
      this._router.navigate(['DetailsSubPieza', { nombre: nombre }]);
  }


}
