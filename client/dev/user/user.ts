
import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';
import {provide} from 'angular2/core';
import {ROUTER_PROVIDERS,
	LocationStrategy, HashLocationStrategy} from 'angular2/router';
	
import {isLogged} from '../login/services/isloggedin';
import {UserCmp} from './components/user-cmp';
import {UserListCmp} from './components/userlist-cmp';
bootstrap(UserCmp, [HTTP_PROVIDERS]);
bootstrap(UserListCmp, [HTTP_PROVIDERS]);

