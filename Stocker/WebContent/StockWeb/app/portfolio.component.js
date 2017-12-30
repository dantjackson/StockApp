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
            height: 500,
            backgroundColor: '#DBEDF8',
            legend: {
                position: 'bottom'
            },
            vAxis: {
                viewWindow: { min: 0, max: 1.01 },
                gridlines: { color: '#222222', count: 6 }
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
        templateUrl: '../app/html/portfolio.component.html',
        styleUrls: ['/css/stocker.css']
    }),
    __metadata("design:paramtypes", [portfolio_service_1.PortFolioService])
], PortfolioComponent);
exports.PortfolioComponent = PortfolioComponent;
//# sourceMappingURL=portfolio.component.js.map