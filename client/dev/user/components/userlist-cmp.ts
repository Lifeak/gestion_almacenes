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
ROUTER_DIRECTIVES
} from 'angular2/router';


import {User, UserService} from '../services/user-service';



@Component({
  selector: 'ListUsuarios',
  //templateUrl: 'client/dev/user/templates/list.html',
  template:`<h1>hola</h1>`,
  styleUrls: ['client/dev/user/styles/cliente.css'],
  directives:[ROUTER_DIRECTIVES],
  providers: [UserService]
})

export class UserListCmp implements OnInit {
  title: string = "Users";
  users: User[] = [];
  private _selectedId: string;


  constructor(private _userService: UserService, private _router: Router, routeParams: RouteParams) {
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
    this._router.navigate(['DetailsUsuarios',{id: user._id}]);
  }
}
