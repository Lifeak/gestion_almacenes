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
  CanActivate,
  Router
} from 'angular2/router';

import {isLogged, isLoggedinAdmin, isLoggedinEncargado} from '../../login/services/isloggedin';
import {ClienteService, Cliente} from '../services/cliente-service';
import {LoginService} from '../../login/services/login-service';


@Component({
  templateUrl: 'client/dev/cliente/templates/details.html',
  styleUrls: ['client/dev/cliente/styles/cliente.css']
})

  @CanActivate(() => isLogged())
export class ClienteDetailsCmp implements OnInit {
  @Input() cliente: Cliente;
  clienteForm: ControlGroup;

  constructor( @Inject(FormBuilder) fb: FormBuilder, private _router: Router, private _routeParams: RouteParams, private _clienteService: ClienteService, @Inject(LoginService) private _loginService: LoginService) {
    this.clienteForm = fb.group({
      "_id": ["", Validators.required],
      "nombre": ["", Validators.required],
      "direccion": ["", Validators.required],
      "ciudad": ["", Validators.required],
      "pais": ["", Validators.required],
      "telefono1": ["", Validators.required],
      "telefono2": [""],
      "puestoTrabajo": ["", Validators.required],
      "email": ["", Validators.required],
      "detalles": [""]
    });
  }
  

  ngOnInit() {
    let id = this._routeParams.get('id');
    alert(id);
    this._clienteService
    .getClienteId(id)
    .subscribe((cliente) => {
      this.cliente = cliente;
    });
  }

  gotoIndex(){
    let clienteId = this.cliente ? this.cliente._id : null;
    this._router.navigate(['/ListClientes']);
  }
  private _getAll():void {
    this._clienteService
        .getAll()
        .subscribe((clientes) => {
          this.cliente = clientes;
        });
  }
  edit(cliente: Cliente){
    this._clienteService
      .remove(cliente._id)
      .subscribe(() => {
        return this.cliente;

      });
    
    this._clienteService
      .add(cliente._id,cliente.nombre,cliente.direccion,cliente.ciudad,cliente.pais,cliente.telefono1,cliente.telefono2,cliente.puestoTrabajo, cliente.email,cliente.detalles)
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
  delete(cliente: Cliente) {
    this._clienteService
      .remove(cliente._id)
      .subscribe(() => {
      return this.cliente;

      });
    this.gotoIndex();

  }

}
