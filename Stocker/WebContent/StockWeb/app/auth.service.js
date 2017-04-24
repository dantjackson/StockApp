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
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var user_1 = require("./user");
var router_1 = require("@angular/router");
var http_1 = require("@angular/http");
var Observable_1 = require("rxjs/Observable");
var users = [
    new user_1.User('admin@admin.com', 'welcome1', '', '', '', false, '', '', ''),
    new user_1.User('test@gmail.com', 'welcome1', '', '', '', false, '', '', '')
];
var AuthenticationService = (function () {
    function AuthenticationService(_router, _http) {
        this._router = _router;
        this._http = _http;
        this.userLoginUri = "http://localhost:8080/Stocker/stocker/utils/uservalidation/";
        this.postCreateUserUri = "http://localhost:8080/Stocker/stocker/utils/adduser";
    }
    AuthenticationService.prototype.logout = function () {
        localStorage.removeItem("user");
        this._router.navigate(['login']);
    };
    AuthenticationService.prototype.login = function (user) {
        localStorage.setItem("user", JSON.stringify(user.email));
        this._router.navigate(['dashboard']);
        return true;
    };
    AuthenticationService.prototype.checkCredentials = function () {
        if (localStorage.getItem("user") === null) {
            this._router.navigate(['login']);
        }
        else {
            console.debug("Logged In");
            return localStorage.getItem("user");
        }
    };
    AuthenticationService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Observable_1.Observable.throw(error.message || error);
    };
    AuthenticationService.prototype.getUser = function (user) {
        return this._http.get(this.userLoginUri + user.email + "," + user.password)
            .map(function (res) { return res.json(); });
    };
    AuthenticationService.prototype.addUserPost = function (user) {
        var json = JSON.stringify({ "userFirstName": user.userFirstName,
            userLastName: user.userLastName, userTitle: user.userTitle, password: user.password, email: user.email, sessionID: '123' });
        console.debug("Params");
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this._http.post(this.postCreateUserUri, json, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    return AuthenticationService;
}());
AuthenticationService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [router_1.Router, http_1.Http])
], AuthenticationService);
exports.AuthenticationService = AuthenticationService;
//# sourceMappingURL=auth.service.js.map