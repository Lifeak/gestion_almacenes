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

import {
  Router,
  RouteParams, 
  RouteConfig,
  CanActivate,
  ROUTER_DIRECTIVES
} from 'angular2/router';


import {User, UserService} from '../../services/user/user-service';
import {isLogged, isLoggedinAdmin, isLoggedinEncargado} from '../../services/isloggedin';
import {LoginService} from '../../services/login-service';


@Component({
  templateUrl: 'client/dev/user/templates/list.html',
  directives:[ROUTER_DIRECTIVES],
  providers: [UserService]
})

@CanActivate(() => isLoggedinAdmin())
export class UserListCmp implements OnInit {
  users: User[] = [];
  private _selectedId: string;


  constructor(private _userService: UserService, private _loginService: LoginService,public router: Router, routeParams: RouteParams) {
    this._selectedId = routeParams.get('id');
  }

  ngOnInit() {
    this._getAll();
  }

  private _getAll():void {
    this._userService
        .getAll()
        .subscribe((users) => {
          this.users = users;
        });
  }
  isSelected(user:User){
    return user._id === this._selectedId;
  }
  onSelect(user:User){
    alert("selecciono el usuario " + user.nombre);
    this.router.navigate(['/DetailsUsuario',{id: user._id}]);
    alert("deberia estar dentro....");
  }

  nuevousuario() {
    alert("entro en crear usuario");
    this.router.navigate(['/CreateUsuario']);
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
  logout() {
      this._loginService.logout();
      this.router.navigate(['/Login']);
  }
}
