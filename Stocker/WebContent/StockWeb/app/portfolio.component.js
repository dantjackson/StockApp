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
var portfolio_service_1 = require('./portfolio.service');
var PortfolioComponent = (function () {
    function PortfolioComponent(portFolioService) {
        this.portFolioService = portFolioService;
        this.showaddoptions = false;
        this.addStock = new portfolio_service_1.AddStock('', '', '', false, '');
        this.retAddStock = new portfolio_service_1.AddStock('', '', '', false, '');
    }
    PortfolioComponent.prototype.getPortfolios = function (arg) {
        var _this = this;
        this.portFolioService.getPortFoliosSvc(arg)
            .subscribe(function (portfolios) { return _this.portfolios = portfolios; });
    };
    PortfolioComponent.prototype.addStockClick = function () {
        console.log("Add Stock");
        this.showaddoptions = true;
    };
    PortfolioComponent.prototype.validateStockClick = function () {
        var _this = this;
        console.log("Validate Stock");
        this.portFolioService.postAddStockToPort(this.addStock)
            .subscribe(function (data) { return _this.retAddStock = data; }, function (error) { return alert(error); }, function () { return _this.getPortfolios(""); });
    };
    PortfolioComponent.prototype.ngOnInit = function () {
        // initialize to page 1
        this.getPortfolios("");
        console.log(this.portfolios);
    };
    PortfolioComponent = __decorate([
        core_1.Component({
            selector: 'portfolio',
            template: "<h3>My Portfolio</h3>\n  \n  <table class=\"table table-sm\">\n  <thead class=\"bg-primary\">\n    <tr>\n      <th>Symbols</th>\n      <th>Quantity</th>\n      <th>Currency</th>\n      <th>Purchase Price</th>\n      <th>Purchase Value</th>\n      <th>Current Bid</th>  \n      <th>Current Ask</th>      \n      <th>Current Value</th>    \n      <th>Profit</th> \n      <th>50 Day Bid</th> \n      <th>50 %</th> \n      <th>200 Day Bid</th>   \n      <th>200 %</th> \n      <th>Year High</th> \n      <th>Year Low</th> \n      <th>Book Value</th>          \n      <th>Earnings</th>            \n    </tr>\n  </thead>\n  <tr class=\"text-black\" style=\"background-color: rgba(133, 193, 233, 0.3)\" *ngFor=\"let portfolio of portfolios\">\n    <td class=\"\">{{portfolio.stockId}}</td>\n    <td class=\"\">{{portfolio.stockQty}}</td>\n    <td class=\"\">{{portfolio.stockCurrency}}</td>\n    <td class=\"\">{{portfolio.stockPurchasePrice}}</td> \n    <td class=\"\">{{portfolio.purchaseValue}}</td>\n    <td class=\"\">{{portfolio.stockBid}}</td>\n    <td class=\"\">{{portfolio.stockAsk}}</td> \n    <td class=\"\">{{portfolio.currentValue}}</td>    \n    <td class=\"\">{{portfolio.profit}}</td> \n    <td class=\"\">{{portfolio.changeFromFiftydayMovingAverage}}</td>    \n    <td class=\"\">{{portfolio.fiftyDayChangePercent}}</td> \n    <td class=\"\">{{portfolio.changeFromTwoHundreddayMovingAverage}}</td>\n    <td class=\"\">{{portfolio.twoHundredDayChangePercent}}</td>        \n    <td class=\"\">{{portfolio.yearHigh}}</td>\n    <td class=\"\">{{portfolio.yearLow}}</td>\n    <td class=\"\">{{portfolio.bookValue}}</td>    \n    <td class=\"\">{{portfolio.earningsShare}}</td>    \n  </tr>\n  </table>\n  <div style=\"margin-top:15px\"></div>\n  <div class=\"row\">\n    <button class=\"btn btn-success\" (click)=\"addStockClick()\">Add Stock</button>\n    <button class=\"btn btn-danger\" (click)=\"delStock()\">Delete Stock</button>\n    <button class=\"btn btn-primary\" (click)=\"editStock()\">Edit Stock</button>\n  </div>\n               \n  <div style=\"margin-top:25px\"></div>\n\n  <div *ngIf=\"showaddoptions\" class=\"row\">\n    <div class=\"col-sm-4\">\n    <table class=\"table table-sm\">\n    <thead class=\"bg-primary small h3\">\n      <tr>\n        <th>Symbol</th><th>Price</th><th>Qty</th>\n      </tr>\n    </thead>\n    <tr>\n      <td>\n        <input [(ngModel)]=\"addStock.stockId\" name=\"Symbol\" type=\"text\" id=\"Symbol\" class=\"form-control\" placeholder=\"Symbol\" required>\n      </td>\n      <td>\n        <input [(ngModel)]=\"addStock.stockPrice\" name=\"Price\" type=\"number\" id=\"price\" class=\"form-control\" placeholder=\"0.0\" required> \n      </td>\n      <td>\n        <input [(ngModel)]=\"addStock.stockQty\" name=\"quantity\" type=\"number\" step=\"1\" min=\"1\" id=\"quantity\" class=\"form-control\" placeholder=\"1\" required> \n      </td>  \n    </tr>   \n    </table>\n    </div>\n    <div class=\"col-sm-1\" style=\"display:table-cell; vertical-align:middle\">\n       <div style=\"margin-top:40px\"></div>\n       <button class=\"btn btn-success\" (click)=\"validateStockClick()\" type=\"button\"> <span class=\"glyphicon glyphicon-ok\"></span> </button>    \n    </div>\n  </div>   \n"
        }), 
        __metadata('design:paramtypes', [portfolio_service_1.PortFolioService])
    ], PortfolioComponent);
    return PortfolioComponent;
}());
exports.PortfolioComponent = PortfolioComponent;
//# sourceMappingURL=portfolio.component.js.map