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
var stocklist_service_1 = require("./stocklist.service");
var http_1 = require("@angular/http");
var index_1 = require("./_services/index");
var StockListComponent = (function () {
    function StockListComponent(stockListService, http, pagerService) {
        this.stockListService = stockListService;
        this.http = http;
        this.pagerService = pagerService;
        // pager object
        this.pager = {};
    }
    StockListComponent.prototype.getStocks = function () {
        var _this = this;
        this.http.get('http://localhost:8080/Stocker/stocker/stocks/s&s&s')
            .map(function (response) { return response.json(); })
            .subscribe(function (data) {
            // set items to json response
            _this.stocks = data;
            // initialize to page 1
            _this.setPage(1);
            console.log(_this.stocks);
        });
    };
    StockListComponent.prototype.getHeroes = function () {
        var _this = this;
        this.stockListService
            .getHeroes()
            .then(function (stocks) { return _this.stocks = stocks; });
        console.log(this.pagedItems);
    };
    StockListComponent.prototype.ngOnInit = function () {
        //this.getHeroes();
        // initialize to page 1
        //this.setPage(1);    
        this.getStocks();
        console.log(this.pagedItems);
    };
    StockListComponent.prototype.onSelect = function (stock) {
        this.selectedStock = stock;
        console.log(this.selectedStock);
        this.setPage(1);
    };
    StockListComponent.prototype.setPage = function (page) {
        if (page < 1 || page > this.pager.totalPages) {
            return;
        }
        console.log(this.stocks.length);
        // get pager object from service
        this.pager = this.pagerService.getPager(this.stocks.length, page);
        // get current page of items
        this.pagedItems = this.stocks.slice(this.pager.startIndex, this.pager.endIndex + 1);
    };
    return StockListComponent;
}());
__decorate([
    core_1.Input(),
    __metadata("design:type", Object)
], StockListComponent.prototype, "term", void 0);
StockListComponent = __decorate([
    core_1.Component({
        moduleId: module.id,
        selector: 'my-stocks',
        templateUrl: 'stocklist.component.html',
        styleUrls: ['stocklist.component.css']
    }),
    __metadata("design:paramtypes", [stocklist_service_1.StockListService,
        http_1.Http,
        index_1.PagerService])
], StockListComponent);
exports.StockListComponent = StockListComponent;
//# sourceMappingURL=stocklist.component.js.map