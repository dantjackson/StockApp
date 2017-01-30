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
var platform_browser_1 = require('@angular/platform-browser');
var http_1 = require('@angular/http');
var forms_1 = require('@angular/forms');
var app_component_1 = require('./app.component');
var dashboard_component_1 = require('./dashboard.component');
var portfolio_component_1 = require('./portfolio.component');
var util_component_1 = require('./util.component');
var stocklist_component_1 = require('./stocklist.component');
var stocklist_service_1 = require('./stocklist.service');
var stockdetail_component_1 = require('./stockdetail.component');
var search_box_1 = require('./search.box');
var search_name_1 = require('./search.name');
var search_pipe_1 = require('./search.pipe');
var dropdown_component_1 = require('./dropdown.component');
var app_routing_module_1 = require('./app-routing.module');
var index_1 = require('./_services/index');
var auth_private_component_1 = require('./auth.private.component');
var auth_component_1 = require('./auth.component');
var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        core_1.NgModule({
            imports: [
                platform_browser_1.BrowserModule,
                http_1.HttpModule,
                forms_1.FormsModule,
                app_routing_module_1.AppRoutingModule
            ],
            declarations: [
                app_component_1.AppComponent,
                dashboard_component_1.DashboardComponent,
                auth_component_1.LoginComponent,
                auth_private_component_1.PrivateComponent,
                portfolio_component_1.PortfolioComponent,
                stocklist_component_1.StockListComponent,
                stockdetail_component_1.StockDetailComponent,
                search_box_1.SearchBox, search_name_1.SearchName, search_pipe_1.SearchPipe,
                util_component_1.UtilComponent, dropdown_component_1.DropdownComponent
            ],
            providers: [stocklist_service_1.StockListService, index_1.PagerService],
            bootstrap: [app_component_1.AppComponent]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map