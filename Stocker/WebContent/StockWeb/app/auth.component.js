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
var core_1 = require('@angular/core');
var auth_service_1 = require('./auth.service');
var user_1 = require('./user');
var LoginComponent = (function () {
    function LoginComponent(_service) {
        this._service = _service;
        this.user = new user_1.User('', '', '', '', '', false, '', '', '');
        this.retUser = new user_1.User('test@gmail.com', 'welcome1', '', '', '', false, '', '', '');
        this.errorMsg = '';
        this.showLoginRespMessage = false;
        this.showAddUser = false;
        this.showSignIn = true;
    }
    LoginComponent.prototype.LoginUserClick = function () {
        var _this = this;
        this._service.getUser(this.user)
            .subscribe(function (data) { return _this.retUser = data; }, function (error) { return alert(error); }, function () { return _this.login(); });
    };
    LoginComponent.prototype.login = function () {
        console.log(this.retUser);
        if (this.retUser[0].userValidated) {
            if (!this._service.login(this.user)) {
                this.errorMsg = 'Problem Logging In';
            }
        }
        else {
            this.errorMsg = this.retUser[0].userMessage;
        }
    };
    LoginComponent.prototype.showMessage = function () {
        this.showLoginRespMessage = true;
        this.showAddUser = false;
        this.showSignIn = true;
        console.log(this.retUser[0].userMessage);
    };
    LoginComponent.prototype.createUserClick = function () {
        this.showAddUser = true;
        this.showSignIn = false;
    };
    LoginComponent.prototype.addUserClick = function () {
        var _this = this;
        this._service.addUserPost(this.user)
            .subscribe(function (data) { return _this.retUser = data; }, function (error) { return alert(error); }, function () { return _this.showMessage(); });
    };
    LoginComponent = __decorate([
        core_1.Component({
            selector: 'login-form',
            providers: [auth_service_1.AuthenticationService],
            template: "\n        <div class=\"container col-sm-4\">\n          <form class=\"form-signin\">\n            <h2 class=\"form-signin-heading\">Please sign in</h2>\n            <label for=\"inputEmail\" class=\"sr-only\">Email address</label>\n            <input [(ngModel)]=\"user.email\" name=\"email\" type=\"email\" id=\"email\" class=\"form-control\" placeholder=\"Email address\" required autofocus>\n            <div style=\"margin-top:5px\"></div>\n            <label for=\"inputPassword\" class=\"sr-only\">Password</label>\n            <input [(ngModel)]=\"user.password\" name=\"password\" type=\"password\" id=\"password\" class=\"form-control\" placeholder=\"Password\" required>\n            \n            <div *ngIf=\"showAddUser\">\n                <div style=\"margin-top:5px\"></div>\n                <label for=\"inputTitle\" class=\"sr-only\">Title</label>\n                <input [(ngModel)]=\"user.userTitle\" name=\"title\" type=\"title\" id=\"title\" class=\"form-control\" placeholder=\"Title\" required>\n                <div style=\"margin-top:5px\"></div>\n                <label for=\"inputFirstName\" class=\"sr-only\">First Name</label>\n                <input [(ngModel)]=\"user.userFirstName\" name=\"firstName\" type=\"firstName\" id=\"firstName\" class=\"form-control\" placeholder=\"FirstName\" required>\n                <div style=\"margin-top:5px\"></div>\n                <label for=\"inputLastName\" class=\"sr-only\">Last Name</label>\n                <input [(ngModel)]=\"user.userLastName\" name=\"lastName\" type=\"lastName\" id=\"lastName\" class=\"form-control\" placeholder=\"LastName\" required>\n            </div>\n\n            <div class=\"checkbox\">\n            <label>\n                <input type=\"checkbox\" value=\"remember-me\"> Remember me\n            </label>\n            </div>\n            <div *ngIf=\"showSignIn\">\n                <button (click)=\"LoginUserClick()\" class=\"btn btn-lg btn-success btn-block\" type=\"submit\">Sign in</button>\n            </div>    \n            <div *ngIf=\"errorMsg\" class=\"row\">\n                    <h4 class=\"text-red\">{{errorMsg}}</h4>\n            </div>  \n\n            <div style=\"margin-top:20px\"></div>\n            <div *ngIf=\"showSignIn\">\n                <button (click)=\"createUserClick()\" class=\"btn btn-lg btn-primary btn-block\">Create New User</button>\n            </div> \n            <div style=\"margin-top:20px\"></div>    \n            <div *ngIf=\"showAddUser\">\n                <button (click)=\"addUserClick()\" class=\"btn btn-lg btn-info btn-block\">Add User</button>\n            </div>\n\n            <div class=\"row\" *ngIf=\"showLoginRespMessage\">\n                <div style=\"margin-top:10px\"></div>\n                <table>\n                    <tr *ngFor=\"let user of retUser \">\n                        <td class=\"h4\">{{user.userMessage}}</td>\n                    </tr>\n                </table>     \n            </div>   \n           </form>  \n         </div>      \n    \t"
        }), 
        __metadata('design:paramtypes', [auth_service_1.AuthenticationService])
    ], LoginComponent);
    return LoginComponent;
}());
exports.LoginComponent = LoginComponent;
//# sourceMappingURL=auth.component.js.map