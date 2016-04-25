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


import {ClienteService, Cliente} from '../services/cliente-service';


@Component({
  templateUrl: 'client/dev/cliente/templates/create.html',
  styleUrls: ['client/dev/cliente/styles/cliente.css']
})


export class ClienteCreateCmp{
  @Input() cliente: Cliente;
  clienteForm: ControlGroup;

  constructor(@Inject(FormBuilder) fb: FormBuilder,private _router: Router, private _routeParams: RouteParams, private _clienteService: ClienteService){
    this.clienteForm = fb.group({
      "_id": ["", Validators.required],
      "nombre": ["", Validators.required],
      "direccion": ["", Validators.required],
      "ciudad": ["", Validators.required],
      "pais": ["", Validators.required],
      "telefono1": ["", Validators.required],
      "telefono2": ["", Validators.required],
      "puestoTrabajo": ["", Validators.required],
      "email": ["", Validators.required],
      "detalles": ["", Validators.required]
    });
  }
  
  gotoIndex(){
    let clienteId = this.cliente ? this.cliente._id : null;
    this._router.navigate(['/ListClientes']);

  }

  goBack(){
    window.history.back();
  }

  save(datos: FormData){
      var _id: string = this.clienteForm.controls['_id'].value;
      var nombre: string = this.clienteForm.controls['nombre'].value;
      var direccion: string = this.clienteForm.controls['direccion'].value;
      var ciudad: string = this.clienteForm.controls['ciudad'].value;
      var pais: string = this.clienteForm.controls['pais'].value;
      var telefono1: string = this.clienteForm.controls['telefono1'].value;
      var telefono2: string = this.clienteForm.controls['telefono2'].value;
      var puestoTrabajo: string = this.clienteForm.controls['puestoTrabajo'].value;
      var email: string = this.clienteForm.controls['email'].value;
      var detalles: string = this.clienteForm.controls['detalles'].value;

      this._clienteService
          .add(_id,nombre,direccion,ciudad,pais,telefono1,telefono2,puestoTrabajo,email,detalles)
          .subscribe((m) => {
          (<Control>this.clienteForm.controls['_id']).updateValue("");
          (<Control>this.clienteForm.controls['nombre']).updateValue("");
          (<Control>this.clienteForm.controls['direccion']).updateValue("");
          (<Control>this.clienteForm.controls['ciudad']).updateValue("");
          (<Control>this.clienteForm.controls['pais']).updateValue("");
          (<Control>this.clienteForm.controls['telefono1']).updateValue("");
          (<Control>this.clienteForm.controls['telefono2']).updateValue("");
          (<Control>this.clienteForm.controls['puestoTrabajo']).updateValue("");
          (<Control>this.clienteForm.controls['email']).updateValue("");
          (<Control>this.clienteForm.controls['detalles']).updateValue("");
          });


      this.gotoIndex();

  }

  

}
