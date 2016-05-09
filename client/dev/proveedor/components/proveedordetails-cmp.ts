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


import {Proveedor, ProveedorService} from '../services/proveedor-service';
import {LoginService} from '../../login/services/login-service';

@Component({
  templateUrl: 'client/dev/proveedor/templates/details.html',
  styleUrls: ['client/dev/proveedor/styles/cliente.css']
})


export class ProveedorDetailsCmp implements OnInit {
  @Input() proveedor: Proveedor;
  proveedorForm: ControlGroup;
  mat: Object = [];

  constructor( @Inject(FormBuilder) fb: FormBuilder, private _router: Router, private _routeParams: RouteParams, private _proveedorService: ProveedorService, @Inject(LoginService) private _loginService: LoginService) {
    this.proveedorForm = fb.group({
      "nombre": ["", Validators.required],
      "direccion": ["", Validators.required],
      "ciudad": ["", Validators.required],
      "pais": ["", Validators.required],
      "telefono": ["", Validators.required],
      "valoracion": ["", Validators.required],
      "pieza": [""],
      "refexterna": [""],
      "coste1": [""],
      "coste2":[""],
      "val":[""]
    });
  }
  

  ngOnInit() {
    let id = this._routeParams.get('id');
    this._proveedorService
    .getProveedorId(id)
    .subscribe((proveedor) => {
      this.proveedor = proveedor;
      alert("details "+JSON.stringify(this.proveedor));
      this.mat = this.proveedor.materiales;
    });
  }

  gotoIndex(){
    this._router.navigate(['/ListProveedores']);
  }
  private _getAll():void {
    this._proveedorService
        .getAll()
        .subscribe((proveedores) => {
          this.proveedor = proveedores;
        });
  }
  /*edit(user: User){

    this._userService
      .add(user.user, user.pass,user.nombre, user.apellido, user.tipo)
      .subscribe((m) => {
          //this.user.push(m);
          (<Control>this.userForm.controls['user']).updateValue("");
          (<Control>this.userForm.controls['pass']).updateValue("");
          (<Control>this.userForm.controls['nombre']).updateValue("");
          (<Control>this.userForm.controls['apellido']).updateValue("");
          (<Control>this.userForm.controls['tipo']).updateValue("");
    });

    this._userService
      .remove(user._id)
      .subscribe(() => {
        return this.user;

      });
    this.gotoIndex();

  }
  delete(user: User) {
    this._userService
      .remove(user._id)
      .subscribe(() => {
        return this.user;

      });
    this.gotoIndex();

  }
*/
}
