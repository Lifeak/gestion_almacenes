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

import {isLogged, isLoggedinAdmin, isLoggedinEncargado} from '../../services/isloggedin';
import {ClienteService, Cliente} from '../../services/cliente/cliente-service';
import {LoginService} from '../../services/login-service';
import {UserService} from '../../services/user/user-service';


@Component({
  templateUrl: 'client/dev/cliente/templates/details.html',
  providers:[UserService, LoginService, ClienteService]
})

  @CanActivate(() => isLogged())
export class ClienteDetailsCmp implements OnInit {
  @Input() cliente: Cliente;
  clienteForm: ControlGroup;
  public token: string;
  public profile: string;

  constructor( @Inject(FormBuilder) fb: FormBuilder, private router: Router, private _routeParams: RouteParams, private _clienteService: ClienteService,private _userService: UserService, @Inject(LoginService) private _loginService: LoginService) {
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
    this._clienteService
    .getClienteId(id)
    .subscribe((cliente) => {
      this.cliente = cliente;
    });
  }

  gotoIndex(){
    let clienteId = this.cliente ? this.cliente._id : null;
    this.router.navigate(['/ListClientes']);
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
          //this.cliente = this.cliente + m;
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
  logout() {
    this._loginService.logout();
    this.router.navigate(['/Login']);
  }

  compras() {
    this.router.navigate(['/Compras']);
  }

  ventas() {
    this.router.navigate(['/Ventas']);
  }

  almacen() {
    this.router.navigate(['/Almacen']);
  }

  admin() {
    this.router.navigate(['/Admin']);
  }

  gproductos() {
    this.router.navigate(['/ListProductos']);
  }
  gpiezas() {
    this.router.navigate(['/ListPiezas']);
  }
  gmodelos() {
    this.router.navigate(['/ListModelos']);
  }
  gproveedores() {
    this.router.navigate(['/ListProveedores']);
  }

  ggarantias() {
    this.router.navigate(['/ListGarantias']);
  }
  galmacenes() {
    this.router.navigate(['/ListAlmacenes']);
  }
  gclientes() {
    this.router.navigate(['/ListClientes']);
  }

  gusuarios() {
    if (localStorage.getItem(this.token) == "encargado") {
      let u = localStorage.key(1);
      if (u == "undefined") {
        let o = localStorage.key(0);
        this.getProfile(o);
      } else {
        this.getProfile(u);
      }
    } else {
          this.router.navigate(['/ListUsuarios']);
    }
  }
  public getProfile(name: string) {
    this._userService
      .getProfile(name)
      .subscribe((user) => {
        this.profile = user[0]._id;
        this.router.navigate(['Perfil', { id: this.profile }]);
      });
  }


}
