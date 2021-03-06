import {
  Component,
  Inject,
  Input,
  OnInit,
  ChangeDetectionStrategy
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


import {isLogged, isLoggedinAdmin, isLoggedinEncargado} from '../../services/isloggedin';
import {Transporte, TransporteService} from '../../services/transporte/transporte-service';
import {LoginService} from '../../services/login-service';
import {UserService} from '../../services/user/user-service';
import {SearchPipe} from '../searchpipe';
import {SearchBox} from '../searchbox';

@Component({
  templateUrl: 'client/dev/transporte/templates/list.html',
  directives:[ROUTER_DIRECTIVES, SearchBox],
  pipes: [SearchPipe],
  providers: [TransporteService, LoginService, UserService],
  changeDetection: ChangeDetectionStrategy.OnPush
})

  @CanActivate(() => isLogged())
export class TransporteListCmp implements OnInit {
  @Input() term;
  transportes: Transporte[] = [];
  private _selectedId: string;
  public token: string;
  public profile: string;


  constructor(private _transporteService: TransporteService, private _userService: UserService,private _loginService: LoginService,private router: Router, routeParams: RouteParams) {
    this._selectedId = routeParams.get('id');
  }

  ngOnInit() {
    this._getAll();
  }

  private _getAll():void {
    this._transporteService
        .getAll()
        .subscribe((transportes) => {
          this.transportes = transportes;
        });
  }
  isSelected(transporte:Transporte){
    return transporte._id === this._selectedId;
  }
  onSelect(transporte:Transporte){
    this.router.navigate(['/DetailsTransporte',{id: transporte._id}]);
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
   gventas(){
     this.router.navigate(['/ListVentas']);
   }
   gdevoluciones(){
     this.router.navigate(['/ListDevoluciones']);
   }
   ggarantiasp(){
     this.router.navigate(['/ListGarantiaP']);
   }
   gsegsalidas(){
     this.router.navigate(['/ListSegSalidas']);
   }
   gcontrolcalidad(){
     this.router.navigate(['/ListControlCalidad']);
   }
   greparaciones(){
     this.router.navigate(['/ListReparaciones']);
   }
   gpedidocompras(){
     this.router.navigate(['/ListCompras']);
   }
   gtransportes(){
     this.router.navigate(['/ListTransportes']);
   }
}
