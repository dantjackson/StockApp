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
var core_2 = require('@angular/core');
require('rxjs/Rx');
var stockdetail_1 = require('./stockdetail');
var stockdetail_service_1 = require('./stockdetail.service');
var StockDetailComponent = (function () {
    function StockDetailComponent(stockDetailService) {
        this.stockDetailService = stockDetailService;
        this.selstockdetail = new stockdetail_1.StockDetail();
    }
    StockDetailComponent.prototype.getStockDets = function (arg) {
        var _this = this;
        this.stockDetailService.getStockFromIdObs(arg)
            .subscribe(function (selstockdetail) { return _this.selstockdetail = selstockdetail[0]; });
        // Not the [0] to get the first element in the list.
    };
    StockDetailComponent.prototype.runme = function (arg) {
        console.log("CompDemo", arg);
        this.getStockDets(arg.stockId);
        console.log(this.selstockdetail);
    };
    // Check This - https://www.typescriptlang.org/docs/release-notes/typescript-1.7.html
    StockDetailComponent.prototype.ngOnInit = function () {
        // Add here
    };
    StockDetailComponent = __decorate([
        core_2.Injectable(),
        core_1.Component({
            selector: 'stock-detail',
            providers: [stockdetail_service_1.StockDetailService],
            template: "\n  <div class=\"panel panel-default\">\n    <div *ngIf=\"!selstockdetail\" class=\"panel-heading\">\n      <h3 class=\"panel-title\">{{message}}</h3>\n    </div>\n    <div *ngIf=\"selstockdetail\" class=\"panel-heading\">\n      <h3 class=\"panel-title\">{{selstockdetail.stockName}} {{selstockdetail.stockName}}</h3>\n    </div>\n    <ul class=\"list-group\" *ngIf=\"selstockdetail\">\n      <li class=\"list-group-item\">\n        <h4 class=\"list-group-item-heading\">Stock Id</h4>\n        <p class=\"list-group-item-text\">{{selstockdetail.stockId}}</p>\n      </li>\n      <li class=\"list-group-item\">\n        <h4 class=\"list-group-item-heading\">Stock Name</h4>\n        <p class=\"list-group-item-text\">{{selstockdetail.stockName}}</p>\n      </li>\n      <li class=\"list-group-item\">\n        <h4 class=\"list-group-item-heading\">Stock High</h4>\n        <p class=\"list-group-item-text\">{{selstockdetail.stockYearHigh}}</p>\n      </li>\n      <li class=\"list-group-item\">\n        <h4 class=\"list-group-item-heading\">Stock Low</h4>\n        <p class=\"list-group-item-text\">{{selstockdetail.stockYearLow}}</p>\n      </li>      \n  </ul>\n  </div>\n  "
        }), 
        __metadata('design:paramtypes', [stockdetail_service_1.StockDetailService])
    ], StockDetailComponent);
    return StockDetailComponent;
}());
exports.StockDetailComponent = StockDetailComponent;
//# sourceMappingURL=stockdetail.component.js.map