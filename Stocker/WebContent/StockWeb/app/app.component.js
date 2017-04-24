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
var auth_service_1 = require("./auth.service");
var user_1 = require("./user");
var router_1 = require("@angular/router");
var AppComponent = (function () {
    function AppComponent(_service, router) {
        var _this = this;
        this._service = _service;
        this.user = new user_1.User('', '', '', '', '', false, '', '', '');
        router.events.forEach(function (event) {
            if (event instanceof router_1.NavigationStart) {
                //console.debug("Route Changed");
                //console.debug(event.url);
                var eventstr = event.url.toLowerCase();
                if (!eventstr.includes("/login")) {
                    // Detects the route has changed.
                    var userstr = _this._service.checkCredentials();
                    //console.debug(userstr);
                    if (typeof userstr != 'undefined') {
                        var userJSON = JSON.parse(userstr);
                        Object.assign(_this.user, userJSON);
                    }
                }
            }
        });
    }
    AppComponent.prototype.ngOnInit = function () {
        this._service.checkCredentials();
    };
    AppComponent.prototype.logout = function () {
        console.debug("logout");
        this._service.logout();
    };
    return AppComponent;
}());
AppComponent = __decorate([
    core_1.Component({
        selector: 'my-app',
        providers: [auth_service_1.AuthenticationService],
        template: "\n      <div class=\"navbar navbar-inverse navbar-fixed-top\" role=\"navigation\">\n        <div class=\"container-fluid\">\n          <div class=\"navbar-header\">\n            <a class=\"navbar-brand\">Stocker</a>\n            <ul class=\"nav navbar-nav\" routerLinkActive=\"active\">\n                <li class=\"nav-item\"><a class=\"nav-link\" routerLink=\"/dashboard\">Home</a></li>\n                <li class=\"nav-item\"><a class=\"nav-link\" routerLink=\"/portfolio\">Portfolio</a></li>\n                <li class=\"nav-item\"><a class=\"nav-link\" routerLink=\"/stocksearch\">Stock Search</a></li>\n                <li class=\"nav-item\"><a class=\"nav-link\" routerLink=\"/utils\">Utilities</a></li>\n            </ul>\n          </div>\n          <div class=\"collapse navbar-collapse\">\n            <ul class=\"nav navbar-nav navbar-right\">\n              <li><a href=\"https://github.com/mlaval/angular2-bootstrap\">Github</a></li>\n              <li>\n                    <a class=\"nav-link\" (click)=\"logout()\">Logout</a>\n              </li>\n              <li class=\"nav-item\">{{user.email}}</li>\n            </ul>\n          </div>\n        </div>\n      </div>      \n      <div class=\"container\">\n          <div class=\"content\">\n            <router-outlet></router-outlet>\n        </div>\n      </div>\n  "
    }),
    __metadata("design:paramtypes", [auth_service_1.AuthenticationService, router_1.Router])
], AppComponent);
exports.AppComponent = AppComponent;
//# sourceMappingURL=app.component.js.map