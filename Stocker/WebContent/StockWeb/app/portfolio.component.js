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
var portfolio_service_1 = require("./portfolio.service");
var PortfolioComponent = (function () {
    function PortfolioComponent(portFolioService) {
        this.portFolioService = portFolioService;
        this.out = [];
        this.showaddoptions = false;
        this.showAddStockMessage = false;
        this.addStock = new portfolio_service_1.AddStock('', '', '', false, '');
        this.retAddStock = new portfolio_service_1.AddStock('', '', '', false, '');
        this.line_ChartOptions = {
            title: 'Portfolio Performance',
            curveType: 'function',
            legend: {
                position: 'bottom'
            }
        };
    }
    ;
    PortfolioComponent.prototype.getPortfolios = function (arg) {
        var _this = this;
        this.portFolioService.getPortFoliosSvc(arg)
            .subscribe(function (portfolios) { return _this.portfolios = portfolios; });
    };
    PortfolioComponent.prototype.getFolioPerf = function (arg) {
        var _this = this;
        this.portFolioService.getFolioPerf(arg)
            .subscribe(function (perf) { return _this.perf = perf; }, function (error) { return alert(error); }, function () { return _this.runPerf(); });
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
    PortfolioComponent.prototype.runPerf = function () {
        console.log("hello");
        var jsonAsArray = Object.values(this.perf);
        var distDatesArr = [];
        var titleArr = [];
        var iter = 0;
        // Get distinct list of Dates
        for (var _i = 0, jsonAsArray_1 = jsonAsArray; _i < jsonAsArray_1.length; _i++) {
            var i = jsonAsArray_1[_i];
            var danvar = Object.values(i);
            iter = 0;
            for (var _a = 0, danvar_1 = danvar; _a < danvar_1.length; _a++) {
                var dateStrIter = danvar_1[_a];
                iter++;
                var dateStrDay = +dateStrIter.toString().substring(0, 2);
                var dateStrMonth = +dateStrIter.toString().substring(3, 5) - 1;
                var dateStrYear = +dateStrIter.toString().substring(6, 8) + 2000;
                var dateVar = new Date(dateStrYear, dateStrMonth, dateStrDay);
                // Cannot compare date objects so use this map approach. 
                var idx = distDatesArr.map(Number).indexOf(+dateVar);
                if (idx == -1 && iter == 1) {
                    distDatesArr.push(dateVar);
                }
            }
        }
        var date_sort_asc = function (date1, date2) {
            // This is a comparison function that will result in dates being sorted in
            // ASCENDING order. As you can see, JavaScript's native comparison operators
            // can be used to compare dates. This was news to me.
            if (date1 > date2)
                return 1;
            if (date1 < date2)
                return -1;
            return 0;
        };
        // Sort Dates Array 
        distDatesArr = distDatesArr.sort(date_sort_asc);
        console.log(distDatesArr);
        // Get list of stocks and add each plus date to title array.
        titleArr.push("Date");
        for (var _b = 0, jsonAsArray_2 = jsonAsArray; _b < jsonAsArray_2.length; _b++) {
            var i = jsonAsArray_2[_b];
            var danvar = Object.values(i);
            iter = 0;
            for (var _c = 0, danvar_2 = danvar; _c < danvar_2.length; _c++) {
                var z = danvar_2[_c];
                iter++;
                if (titleArr.indexOf(z.toString()) == -1 && iter == 3) {
                    titleArr.push(z.toString());
                }
            }
        }
        console.log(titleArr);
        // Loop each distinct date and each stock.  Add entry for each
        var endArrayVar = [];
        endArrayVar.push(titleArr);
        for (var _d = 0, distDatesArr_1 = distDatesArr; _d < distDatesArr_1.length; _d++) {
            var dateIter = distDatesArr_1[_d];
            var rowArrayVar = [];
            rowArrayVar.push(dateIter);
            for (var _e = 0, titleArr_1 = titleArr; _e < titleArr_1.length; _e++) {
                var titleIter = titleArr_1[_e];
                var subinZeroVal = true;
                for (var _f = 0, jsonAsArray_3 = jsonAsArray; _f < jsonAsArray_3.length; _f++) {
                    var topArrayObj = jsonAsArray_3[_f];
                    var topArr = Object.values(topArrayObj);
                    var dateAsFormattedStr = this.getDay(dateIter) + '-' + this.getMonth(dateIter) + '-' + dateIter.getFullYear().toString().substr(2, 4);
                    //console.log('DATE'+dateIter); 
                    //console.log('DATEFORM'+dateAsFormattedStr); 
                    //console.log('DATEINARRAY'+topArr[0].toString()); 
                    if (topArr[0].toString() == dateAsFormattedStr && topArr[2].toString() == titleIter.toString()) {
                        rowArrayVar.push(topArr[1]);
                        subinZeroVal = false;
                        //console.log("Here");
                    }
                }
                // Sub in a row if no match
                if (subinZeroVal == true && titleIter != "Date") {
                    rowArrayVar.push(null);
                }
            } // for   
            endArrayVar.push(rowArrayVar);
        }
        console.log(endArrayVar);
        //this.arr = endArrayVar.sort((n1,n2) =>  {
        //     return n1 - n2
        // } );
        //this.arr = new google.visualization.DataTable(this.out);
        this.arr = endArrayVar;
    };
    PortfolioComponent.prototype.getMonth = function (date) {
        var month = date.getMonth() + 1;
        return month < 10 ? '0' + month : '' + month; // ('' + month) for string result
    };
    PortfolioComponent.prototype.getDay = function (date) {
        var day = date.getDate();
        return day < 10 ? '0' + day : '' + day;
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
        this.getFolioPerf("");
        console.log(this.perf);
    };
    return PortfolioComponent;
}());
PortfolioComponent = __decorate([
    core_1.Component({
        selector: 'portfolio',
        template: "<h3>My Portfolio</h3>\n  \n  <table class=\"table table-sm table-bordered\">\n  <thead style=\"color:white;background: -webkit-linear-gradient(top, rgba(30,87,153,1) 0%,rgba(32,124,202,1) 52%,rgba(125,185,232,1) 100%,rgba(32,124,202,1) 100%);\">\n    <tr style=\"text-align: center;vertical-align: middle;font-weight:bold;font-color:white;\">\n      <th class=\"col-md-1\" style=\"text-align: center;vertical-align: middle;border-radius: 3px;\">Quantity</th>\n      <th class=\"col-md-1\" style=\"text-align: center;vertical-align: middle;\">Currency</th>\n      <th class=\"col-md-1\" style=\"text-align: center;vertical-align: middle;\">Purchase Price</th>\n      <th class=\"col-md-1\" style=\"text-align: center;vertical-align: middle;\">Purchase Value</th>\n      <th class=\"col-md-1\" style=\"text-align: center;vertical-align: middle;\">Current Bid</th>  \n      <th class=\"col-md-1\" style=\"text-align: center;vertical-align: middle;\">Current Ask</th>      \n      <th class=\"col-md-1\" style=\"text-align: center;vertical-align: middle;\">Current Value</th>    \n      <th class=\"col-md-1\" style=\"text-align: center;vertical-align: middle;\">Profit</th> \n      <th class=\"col-md-1\" style=\"text-align: center;vertical-align: middle;\">50 Day Bid</th> \n      <th class=\"col-md-1\" style=\"text-align: center;vertical-align: middle;\">50 %</th> \n      <th class=\"col-md-1\" style=\"text-align: center;vertical-align: middle;\">200 Day Bid</th>   \n      <th class=\"col-md-1\" style=\"text-align: center;vertical-align: middle;\">200 %</th> \n      <th class=\"col-md-1\" style=\"text-align: center;vertical-align: middle;\">Year High</th> \n      <th class=\"col-md-1\" style=\"text-align: center;vertical-align: middle;\">Year Low</th> \n      <th class=\"col-md-1\" style=\"text-align: center;vertical-align: middle;\">Book Value</th>          \n      <th class=\"col-md-1\" style=\"text-align: center;vertical-align: middle;\">Earnings</th>            \n    </tr>\n  </thead>\n  <template ngFor let-portfolio [ngForOf]=\"portfolios\" let-i=\"index\" [ngForTrackBy]=\"trackByFn\">\n \n\n    <tr *ngIf=\"portfolio.stockId == 'TOTAL'\" colspan=\"16\" class=\"text-black\" style=\"background-color:#4863A0;border-bottom:3pt solid white;\" >\n      <td colspan=\"16\" style=\"font-weight:bold;font-color:white;color:white;\">&nbsp;{{portfolio.stockName}}</td>\n    </tr>  \n\n    <tr *ngIf=\"portfolio.stockId != 'TOTAL'\"class=\"text-black\" style=\"background-color:skyblue;border-bottom:3pt solid white;\" >\n      <td colspan=\"10\" style=\"font-weight:bold;font-color:black;\">&nbsp;{{portfolio.stockName}} ({{portfolio.stockId}})</td>\n      <td colspan=\"2\"><a href=\"#\">View</a>\n          <button class=\"btn btn-sm btn-primary\" (click)=\"viewStockClick()\" type=\"button\"> <span class=\"glyphicon glyphicon-stats\"></span> </button>      \n      </td>\n      <td colspan=\"2\"><a href=\"#\">Edit</a>\n          <button class=\"btn btn-sm btn-primary\" (click)=\"editStockClick()\" type=\"button\"> <span class=\"glyphicon glyphicon-cog\"></span> </button>      \n      </td>\n      <td colspan=\"2\"><a href=\"#\">Delete</a>\n          <button class=\"btn btn-sm btn-danger\" (click)=\"deleteStockClick()\" type=\"button\"> <span class=\"glyphicon glyphicon-trash\"></span> </button>    \n      </td> \n    </tr>  \n\n    <tr class=\"text-black\" style=\"background-color: rgba(133, 193, 233, 0.3);border-bottom:3pt solid white;\" >\n      <td class=\"col-md-1\" style=\"border-right:2pt solid white;\">{{portfolio.stockQty}}</td>\n      <td class=\"col-md-1\" style=\"border-right:2pt solid white;\">{{portfolio.stockCurrency}}</td>\n      <td class=\"col-md-1\" style=\"border-right:2pt solid white;\">{{portfolio.stockPurchasePrice}}</td> \n      <td class=\"col-md-1\" style=\"border-right:2pt solid white;\">{{portfolio.purchaseValue}}</td>\n      <td class=\"col-md-1\" style=\"border-right:2pt solid white;\">{{portfolio.stockBid}}</td>\n      <td class=\"col-md-1\" style=\"border-right:2pt solid white;\">{{portfolio.stockAsk}}</td> \n      <td class=\"col-md-1\" style=\"border-right:2pt solid white;\">{{portfolio.currentValue}}</td>    \n      \n       \n      <td *ngIf=\"portfolio.profit>= 0\" class=\"col-md-1\" style=\"color:green;border-right:2pt solid white;\">{{portfolio.profit}}</td> \n      <td *ngIf=\"portfolio.profit< 0\" class=\"col-md-1\" style=\"color:red;border-right:2pt solid white;\">{{portfolio.profit}}</td> \n\n      <td class=\"col-md-1\" style=\"border-right:2pt solid white;text-align: center;vertical-align: middle;\">{{portfolio.changeFromFiftydayMovingAverage}}</td>    \n      <td class=\"col-md-1\" style=\"border-right:2pt solid white;text-align: center;vertical-align: middle;\">{{portfolio.fiftyDayChangePercent}}</td> \n      <td class=\"col-md-1\" style=\"border-right:2pt solid white;\">{{portfolio.changeFromTwoHundreddayMovingAverage}}</td>\n      <td class=\"col-md-1\" style=\"border-right:2pt solid white;\">{{portfolio.twoHundredDayChangePercent}}</td>        \n      <td class=\"col-md-1\" style=\"border-right:2pt solid white;\">{{portfolio.yearHigh}}</td>\n      <td class=\"col-md-1\" style=\"border-right:2pt solid white;\">{{portfolio.yearLow}}</td>\n      <td class=\"col-md-1\" style=\"border-right:2pt solid white;\">{{portfolio.bookValue}}</td>    \n      <td class=\"col-md-1\" style=\"border-right:2pt solid white;\">{{portfolio.earningsShare}}</td>  \n    </tr>\n  </template>\n  </table>\n  <div style=\"margin-top:15px\"></div>\n  <div class=\"row\">\n    <button class=\"btn btn-success\" (click)=\"addStockClick()\">Add Stock</button>\n  </div>\n               \n  <div style=\"margin-top:25px\"></div>\n\n  <div *ngIf=\"showaddoptions\" class=\"row\">\n    <div class=\"col-sm-4\">\n    <table class=\"table table-sm\">\n    <thead class=\"bg-primary small h3\">\n      <tr>\n        <th>Symbol</th><th>Price</th><th>Qty</th>\n      </tr>\n    </thead>\n    <tr>\n      <td>\n        <input [(ngModel)]=\"addStock.stockId\" name=\"Symbol\" type=\"text\" id=\"Symbol\" class=\"form-control\" placeholder=\"Symbol\" required>\n      </td>\n      <td>\n        <input [(ngModel)]=\"addStock.stockPrice\" name=\"Price\" type=\"number\" id=\"price\" class=\"form-control\" placeholder=\"0.0\" required> \n      </td>\n      <td>\n        <input [(ngModel)]=\"addStock.stockQty\" name=\"quantity\" type=\"number\" step=\"1\" min=\"1\" id=\"quantity\" class=\"form-control\" placeholder=\"1\" required> \n      </td>  \n    </tr>   \n    </table>\n    </div>\n    <div class=\"col-sm-1\" style=\"display:table-cell; vertical-align:middle\">\n       <div style=\"margin-top:40px\"></div>\n       <button class=\"btn btn-success\" (click)=\"validateStockClick()\" type=\"button\"> <span class=\"glyphicon glyphicon-ok\"></span> </button>    \n    </div>\n  </div>   \n\n  <div *ngIf=\"showAddStockMessage\" class=\"row\">\n    <div style=\"margin-top:10px\"></div>\n        <table>\n            <tr>\n                <td class=\"h4\">{{addStockMessage}}</td>\n            </tr>\n        </table>   \n   </div>     \n\n   <div id=\"line_chart\" [chartData]=\"arr\" [chartOptions]= \"line_ChartOptions\" chartType=\"LineChart\" GoogleChart></div>\n"
    }),
    __metadata("design:paramtypes", [portfolio_service_1.PortFolioService])
], PortfolioComponent);
exports.PortfolioComponent = PortfolioComponent;
//# sourceMappingURL=portfolio.component.js.map