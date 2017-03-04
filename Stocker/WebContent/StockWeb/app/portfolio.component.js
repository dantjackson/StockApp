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
        this.showAddStockMessage = false;
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
        this.showAddStockMessage = false;
    };
    PortfolioComponent.prototype.validateStockClick = function () {
        var _this = this;
        this.portFolioService.postAddStockToPort(this.addStock)
            .subscribe(function (data) { return _this.retAddStock = data; }, function (error) { return alert(error); }, function () { return _this.validateStockPostLoad(); });
    };
    PortfolioComponent.prototype.validateStockPostLoad = function () {
        // If Success Remove Add Stock Stuff
        if (this.retAddStock[0].stockAdded == true) {
            // Reload portfolio
            this.getPortfolios("");
            this.showaddoptions = false;
        }
        // Show Validation Messages.
        this.showAddStockMessage = true;
        this.addStockMessage = this.retAddStock[0].stockMessage;
        // Where we gonna get folio id from
    };
    PortfolioComponent.prototype.ngOnInit = function () {
        // initialize to page 1
        this.getPortfolios("");
        console.log(this.portfolios);
    };
    PortfolioComponent = __decorate([
        core_1.Component({
            selector: 'portfolio',
            template: "<h3>My Portfolio</h3>\n  \n  <table class=\"table table-sm table-bordered\">\n  <thead style=\"color:white;background: -webkit-linear-gradient(top, rgba(30,87,153,1) 0%,rgba(32,124,202,1) 52%,rgba(125,185,232,1) 100%,rgba(32,124,202,1) 100%);\">\n    <tr style=\"text-align: center;vertical-align: middle;font-weight:bold;font-color:white;\">\n      <th class=\"col-md-1\" style=\"text-align: center;vertical-align: middle;border-radius: 3px;\">Quantity</th>\n      <th class=\"col-md-1\" style=\"text-align: center;vertical-align: middle;\">Currency</th>\n      <th class=\"col-md-1\" style=\"text-align: center;vertical-align: middle;\">Purchase Price</th>\n      <th class=\"col-md-1\" style=\"text-align: center;vertical-align: middle;\">Purchase Value</th>\n      <th class=\"col-md-1\" style=\"text-align: center;vertical-align: middle;\">Current Bid</th>  \n      <th class=\"col-md-1\" style=\"text-align: center;vertical-align: middle;\">Current Ask</th>      \n      <th class=\"col-md-1\" style=\"text-align: center;vertical-align: middle;\">Current Value</th>    \n      <th class=\"col-md-1\" style=\"text-align: center;vertical-align: middle;\">Profit</th> \n      <th class=\"col-md-1\" style=\"text-align: center;vertical-align: middle;\">50 Day Bid</th> \n      <th class=\"col-md-1\" style=\"text-align: center;vertical-align: middle;\">50 %</th> \n      <th class=\"col-md-1\" style=\"text-align: center;vertical-align: middle;\">200 Day Bid</th>   \n      <th class=\"col-md-1\" style=\"text-align: center;vertical-align: middle;\">200 %</th> \n      <th class=\"col-md-1\" style=\"text-align: center;vertical-align: middle;\">Year High</th> \n      <th class=\"col-md-1\" style=\"text-align: center;vertical-align: middle;\">Year Low</th> \n      <th class=\"col-md-1\" style=\"text-align: center;vertical-align: middle;\">Book Value</th>          \n      <th class=\"col-md-1\" style=\"text-align: center;vertical-align: middle;\">Earnings</th>            \n    </tr>\n  </thead>\n  <template ngFor let-portfolio [ngForOf]=\"portfolios\" let-i=\"index\" [ngForTrackBy]=\"trackByFn\">\n    <tr class=\"text-black\" style=\"background-color:skyblue;border-bottom:3pt solid white;\" >\n      <td colspan=\"10\" style=\"font-weight:bold;font-color:black;\">&nbsp;{{portfolio.stockName}} ({{portfolio.stockId}})</td>\n      <td colspan=\"2\"><a href=\"#\">View</a>\n          <button class=\"btn btn-sm btn-primary\" (click)=\"viewStockClick()\" type=\"button\"> <span class=\"glyphicon glyphicon-stats\"></span> </button>      \n      </td>\n      <td colspan=\"2\"><a href=\"#\">Edit</a>\n          <button class=\"btn btn-sm btn-primary\" (click)=\"editStockClick()\" type=\"button\"> <span class=\"glyphicon glyphicon-cog\"></span> </button>      \n      </td>\n      <td colspan=\"2\"><a href=\"#\">Delete</a>\n          <button class=\"btn btn-sm btn-danger\" (click)=\"deleteStockClick()\" type=\"button\"> <span class=\"glyphicon glyphicon-trash\"></span> </button>    \n      </td> \n    </tr>   \n    <tr class=\"text-black\" style=\"background-color: rgba(133, 193, 233, 0.3);border-bottom:3pt solid white;\" >\n      <td class=\"col-md-1\" style=\"border-right:2pt solid white;\">{{portfolio.stockQty}}</td>\n      <td class=\"col-md-1\" style=\"border-right:2pt solid white;\">{{portfolio.stockCurrency}}</td>\n      <td class=\"col-md-1\" style=\"border-right:2pt solid white;\">{{portfolio.stockPurchasePrice}}</td> \n      <td class=\"col-md-1\" style=\"border-right:2pt solid white;\">{{portfolio.purchaseValue}}</td>\n      <td class=\"col-md-1\" style=\"border-right:2pt solid white;\">{{portfolio.stockBid}}</td>\n      <td class=\"col-md-1\" style=\"border-right:2pt solid white;\">{{portfolio.stockAsk}}</td> \n      <td class=\"col-md-1\" style=\"border-right:2pt solid white;\">{{portfolio.currentValue}}</td>    \n      <td class=\"col-md-1\" style=\"border-right:2pt solid white;\">{{portfolio.profit}}</td> \n      <td class=\"col-md-1\" style=\"border-right:2pt solid white;text-align: center;vertical-align: middle;\">{{portfolio.changeFromFiftydayMovingAverage}}</td>    \n      <td class=\"col-md-1\" style=\"border-right:2pt solid white;text-align: center;vertical-align: middle;\">{{portfolio.fiftyDayChangePercent}}</td> \n      <td class=\"col-md-1\" style=\"border-right:2pt solid white;\">{{portfolio.changeFromTwoHundreddayMovingAverage}}</td>\n      <td class=\"col-md-1\" style=\"border-right:2pt solid white;\">{{portfolio.twoHundredDayChangePercent}}</td>        \n      <td class=\"col-md-1\" style=\"border-right:2pt solid white;\">{{portfolio.yearHigh}}</td>\n      <td class=\"col-md-1\" style=\"border-right:2pt solid white;\">{{portfolio.yearLow}}</td>\n      <td class=\"col-md-1\" style=\"border-right:2pt solid white;\">{{portfolio.bookValue}}</td>    \n      <td class=\"col-md-1\" style=\"border-right:2pt solid white;\">{{portfolio.earningsShare}}</td>  \n    </tr>\n  </template>\n  </table>\n  <div style=\"margin-top:15px\"></div>\n  <div class=\"row\">\n    <button class=\"btn btn-success\" (click)=\"addStockClick()\">Add Stock</button>\n  </div>\n               \n  <div style=\"margin-top:25px\"></div>\n\n  <div *ngIf=\"showaddoptions\" class=\"row\">\n    <div class=\"col-sm-4\">\n    <table class=\"table table-sm\">\n    <thead class=\"bg-primary small h3\">\n      <tr>\n        <th>Symbol</th><th>Price</th><th>Qty</th>\n      </tr>\n    </thead>\n    <tr>\n      <td>\n        <input [(ngModel)]=\"addStock.stockId\" name=\"Symbol\" type=\"text\" id=\"Symbol\" class=\"form-control\" placeholder=\"Symbol\" required>\n      </td>\n      <td>\n        <input [(ngModel)]=\"addStock.stockPrice\" name=\"Price\" type=\"number\" id=\"price\" class=\"form-control\" placeholder=\"0.0\" required> \n      </td>\n      <td>\n        <input [(ngModel)]=\"addStock.stockQty\" name=\"quantity\" type=\"number\" step=\"1\" min=\"1\" id=\"quantity\" class=\"form-control\" placeholder=\"1\" required> \n      </td>  \n    </tr>   \n    </table>\n    </div>\n    <div class=\"col-sm-1\" style=\"display:table-cell; vertical-align:middle\">\n       <div style=\"margin-top:40px\"></div>\n       <button class=\"btn btn-success\" (click)=\"validateStockClick()\" type=\"button\"> <span class=\"glyphicon glyphicon-ok\"></span> </button>    \n    </div>\n  </div>   \n\n  <div *ngIf=\"showAddStockMessage\" class=\"row\">\n    <div style=\"margin-top:10px\"></div>\n        <table>\n            <tr>\n                <td class=\"h4\">{{addStockMessage}}</td>\n            </tr>\n        </table>   \n   </div>     \n"
        }), 
        __metadata('design:paramtypes', [portfolio_service_1.PortFolioService])
    ], PortfolioComponent);
    return PortfolioComponent;
}());
exports.PortfolioComponent = PortfolioComponent;
//# sourceMappingURL=portfolio.component.js.map