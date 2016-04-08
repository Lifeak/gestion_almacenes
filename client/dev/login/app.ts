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
	RouteParams

} from 'angular2/router';

import {LoginService} from './services/login-service';

import {LoginCmp} from './components/login-cmp';
import {HomeCmp} from './components/home-cmp';

@Component({
	selector:'app',
	directives: [ROUTER_DIRECTIVES],
	template:`<h1>Welcome</h1>
				<router-outlet></router-outlet>
				` ,
	providers: [ROUTER_PROVIDERS, provide(LocationStrategy, { useClass: HashLocationStrategy }), LoginService]
})

@RouteConfig([
    { path: '/', redirectTo: ['./Login'] },
    { path: '/home', name: 'Home', component: HomeCmp},
    { path: '/login', name: 'Login', component: LoginCmp }
])
export class App {
	constructor() { }
}

//bootstrap(App, [ROUTER_PROVIDERS]);

