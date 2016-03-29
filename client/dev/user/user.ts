

import {bootstrap} from 'angular2/platform/browser';
import {HTTP_PROVIDERS} from 'angular2/http';

import {UserCmp} from './components/user-cmp';
bootstrap(UserCmp, [HTTP_PROVIDERS]);
