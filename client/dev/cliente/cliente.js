"use strict";
var browser_1 = require('angular2/platform/browser');
var http_1 = require('angular2/http');
var user_cmp_1 = require('./components/user-cmp');
var userlist_cmp_1 = require('./components/userlist-cmp');
browser_1.bootstrap(user_cmp_1.UserCmp, [http_1.HTTP_PROVIDERS]);
browser_1.bootstrap(userlist_cmp_1.UserListCmp, [http_1.HTTP_PROVIDERS]);
