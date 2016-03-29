import {
  Component,
  Inject,
  OnInit
} from 'angular2/core';

import {
  Validators,
  FormBuilder,
  ControlGroup,
  Control
} from 'angular2/common';

import {ClienteService} from '../services/cliente-service';

type Cliente = {
  clienteMessage: string;
  _id: string;
}

@Component({
  selector: 'cliente-cmp',
  templateUrl: 'client/dev/cliente/templates/cliente.html',
  styleUrls: ['client/dev/cliente/styles/cliente.css'],
  providers: [ClienteService]
})
export class ClienteCmp implements OnInit {
  title: string = "SuperPrueba";
  clientes: Cliente[] = [];
  clienteForm: ControlGroup;

  constructor(@Inject(FormBuilder) fb:FormBuilder, @Inject(ClienteService) private _clienteService: ClienteService) {
    this.clienteForm = fb.group({
      "clienteMessage": ["", Validators.required]
    });
  }

  ngOnInit() {
    this._getAll();
  }

  private _getAll():void {
    this._clienteService
        .getAll()
        .subscribe((clientes) => {
          this.clientes = clientes;
        });
  }

  add(message:string):void {
    this._clienteService
        .add(message)
        .subscribe((m) => {
          this.clientes.push(m);
          (<Control>this.clienteForm.controls['clienteMessage']).updateValue("");
        });
  }

  remove(id:string):void {
    this._clienteService
      .remove(id)
      .subscribe(() => {
        this.clientes.forEach((t, i) => {
          if (t._id === id)
            return this.clientes.splice(i, 1);
        });
      })
  }
}
