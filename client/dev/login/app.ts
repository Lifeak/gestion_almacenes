import {
	bootstrap
} from 'angular2/platform/browser';
import {
	Component,
	provide
} from 'angular2/core';
import {
	ROUTER_PROVIDERS,
	ROUTER_DIRECTIVES,
	LocationStrategy,
	HashLocationStrategy,
	RouteConfig,
	Router,
	RouteParams,
	RouterOutlet
} from 'angular2/router';
// Servicios
import {LoginService} from './services/login-service';
// Menu principal
import {LoginCmp} from './components/login-cmp';
import {HomeCmp} from './components/home-cmp';
import {ComprasCmp} from './components/compras-cmp';
import {VentasCmp} from './components/ventas-cmp';
import {AlmacenCmp} from './components/almacen-cmp';
import {AdminCmp} from './components/admin-cmp';
//Usuarios
import {UserCmp} from './components/user/user-cmp';
import {UserCreateCmp} from './components/user/usercreate-cmp';
import {UserListCmp} from './components/user/userlist-cmp';
import {UserDetailsCmp} from './components/user/userdetails-cmp';
import {UserProfileCmp} from './components/user/userprofile-cmp';

@Component({
	selector:'app',
	directives: [ROUTER_DIRECTIVES, RouterOutlet],
	template:`<router-outlet></router-outlet>
				` ,
	providers: [ROUTER_PROVIDERS, provide(LocationStrategy, { useClass: HashLocationStrategy }), LoginService]
})

@RouteConfig([
	{ path: '/home', name: 'Home', component: HomeCmp},
    { path: '/', name: 'Login', component: LoginCmp},
    { path: '/compras', name: 'Compras', component: ComprasCmp },
    { path: '/ventas', name: 'Ventas', component: VentasCmp },
    { path: '/almacen', name: 'Almacen', component: AlmacenCmp },
    { path: '/admin', name: 'Admin', component: AdminCmp },
 	{ path: '/ListUsuarios', name: 'ListUsuarios', component: UserListCmp },
	{ path: '/Create', name: 'CreateUsuario', component: UserCreateCmp },
	{ path: '/Details', name: 'DetailsUsuarios', component: UserDetailsCmp },
	{ path: '/Profile', name: 'Perfil', component: UserProfileCmp }
])
export class App {
	constructor() { }
}

//bootstrap(App, [ROUTER_PROVIDERS]);

