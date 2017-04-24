"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var platform_browser_1 = require("@angular/platform-browser");
var http_1 = require("@angular/http");
var forms_1 = require("@angular/forms");
var app_component_1 = require("./app.component");
var dashboard_component_1 = require("./dashboard.component");
var portfolio_component_1 = require("./portfolio.component");
var portfolio_service_1 = require("./portfolio.service");
var util_component_1 = require("./util.component");
var stocklist_component_1 = require("./stocklist.component");
var stocklist_service_1 = require("./stocklist.service");
var stockdetail_component_1 = require("./stockdetail.component");
var search_box_1 = require("./search.box");
var search_name_1 = require("./search.name");
var search_pipe_1 = require("./search.pipe");
var dropdown_component_1 = require("./dropdown.component");
var app_routing_module_1 = require("./app-routing.module");
var index_1 = require("./_services/index");
var auth_private_component_1 = require("./auth.private.component");
var auth_component_1 = require("./auth.component");
var GoogleChartComponent_1 = require("./GoogleChartComponent");
var ng_bootstrap_1 = require("@ng-bootstrap/ng-bootstrap");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [
            platform_browser_1.BrowserModule,
            http_1.HttpModule,
            forms_1.FormsModule,
            app_routing_module_1.AppRoutingModule,
            ng_bootstrap_1.NgbModule.forRoot()
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
            util_component_1.UtilComponent, dropdown_component_1.DropdownComponent,
            GoogleChartComponent_1.GoogleChartComponent
        ],
        providers: [stocklist_service_1.StockListService, index_1.PagerService, portfolio_service_1.PortFolioService],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map