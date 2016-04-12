"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var core_1 = require('angular2/core');
var http_1 = require('angular2/http');
//declare var Auth0Lock;
var LoginService = (function () {
    //lock = new Auth0Lock('YOUR_AUTH0_CLIENT_ID', 'YOUR_AUTH0_DOMAIN');
    //jwtHelper: JwtHelper = new JwtHelper();
    function LoginService(_http) {
        this._http = _http;
        this.loggedIn = false;
        this.loggedIn = !!localStorage.getItem(this.token);
    }
    LoginService.prototype.login = function (user, pass) {
        var _this = this;
        var datos = JSON.stringify({ user: user, pass: pass });
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this._http
            .post(LoginService.ENDPOINT, datos, { headers: headers })
            .map(function (res) {
            var data = res.json();
            var dato = JSON.stringify(data);
            var usuario = user;
            var u = dato.search("\"user\":\"" + usuario + "\"");
            var pasw = pass;
            var p = dato.search("\"pass\":\"" + pasw + "\"");
            //var creds = "username=" + user + "&pass=" + pass;
            if (u != -1 && p != -1) {
                alert("Todo OK.");
                var cred = dato.search("\"tipo\":\"admin\"");
                if (cred != -1) {
                    localStorage.setItem(_this.token, "admin");
                    alert("es un usuario admin");
                }
                else {
                    localStorage.setItem(_this.token, "encargado");
                    alert("es un usuario del monton");
                }
                _this.loggedIn = true;
            }
            else {
                alert("Credenciales incorrectas. Try again.");
                _this.loggedIn = false;
                localStorage.setItem(_this.token, "");
            }
        });
    };
    LoginService.prototype.logout = function () {
        localStorage.removeItem(this.token);
        //localStorage.removeItem('id_token');
    };
    LoginService.prototype.isLoggedIn = function () {
        return [this.loggedIn, localStorage.getItem(this.token)];
    }; /*
    getSecretThing() {
      this.authHttp.get('http://localhost:3001/secured/ping')
        .subscribe(
        data => console.log(data.json()),
        err => console.log(err),
        () => console.log('Complete')
        );
    }
  
    tokenSubscription() {
      this.authHttp.tokenStream.subscribe(
        data => console.log(data),
        err => console.log(err),
        () => console.log('Complete')
        );
    }
  
    useJwtHelper() {
      var token = localStorage.getItem('id_token');
  
      console.log(
        this.jwtHelper.decodeToken(token),
        this.jwtHelper.getTokenExpirationDate(token),
        this.jwtHelper.isTokenExpired(token)
      );
    }*/
    LoginService.ENDPOINT = '/auth/login';
    LoginService = __decorate([
        core_1.Injectable(),
        __param(0, core_1.Inject(http_1.Http)), 
        __metadata('design:paramtypes', [http_1.Http])
    ], LoginService);
    return LoginService;
}());
exports.LoginService = LoginService;
/*
bootstrap(App, [
  HTTP_PROVIDERS,
  ROUTER_PROVIDERS,
  provide(AuthHttp, {
    useFactory: (http) => {
      return new AuthHttp(new AuthConfig(), http);
    },
    deps: [Http]
  }),
  provide(APP_BASE_HREF, { useValue: '/' })
]);
}
*/
