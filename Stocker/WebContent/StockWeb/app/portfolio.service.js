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
var http_1 = require("@angular/http");
require("rxjs/add/operator/toPromise");
var Observable_1 = require("rxjs/Observable");
var AddStock = (function () {
    function AddStock(stockId, stockPrice, stockQty, stockAdded, stockMessage) {
        this.stockId = stockId;
        this.stockPrice = stockPrice;
        this.stockQty = stockQty;
        this.stockAdded = stockAdded;
        this.stockMessage = stockMessage;
    }
    return AddStock;
}());
AddStock = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [String, String, String, Boolean, String])
], AddStock);
exports.AddStock = AddStock;
var Perf = (function () {
    function Perf() {
    }
    return Perf;
}());
Perf = __decorate([
    core_1.Injectable()
], Perf);
exports.Perf = Perf;
var PortFolioService = (function () {
    function PortFolioService(http) {
        this.http = http;
        this.headers = new http_1.Headers({ 'Content-Type': 'application/json' });
        this.stockUrl = 'http://localhost:8080/Stocker/stocker/stocks/folio/1'; // URL to web api
        this.postAddStockUri = "http://localhost:8080/Stocker/stocker/stocks/folio/addstock";
        this.stockPerfUrl = 'http://localhost:8080/Stocker/stocker/stocks/folio/perfbytime/12'; // URL to web api
    }
    PortFolioService.prototype.getPortFoliosSvc = function (arg) {
        return this.http.get(this.stockUrl + arg)
            .catch(this.handleError)
            .map(this.extractData);
    };
    PortFolioService.prototype.getFolioPerf = function (arg) {
        return this.http.get(this.stockPerfUrl + arg)
            .catch(this.handleError)
            .map(this.extractData);
    };
    PortFolioService.prototype.extractData = function (res) {
        var body = res.json();
        console.log(res);
        return body || {};
        //return body.data || { };
    };
    PortFolioService.prototype.handleError = function (error) {
        console.error('An error occurred', error); // for demo purposes only
        return Observable_1.Observable.throw(error.message || error);
    };
    PortFolioService.prototype.postAddStockToPort = function (addStock) {
        var json = JSON.stringify({ "stockId": addStock.stockId,
            stockPrice: addStock.stockPrice, stockQty: addStock.stockQty,
            stockAdded: addStock.stockAdded, stockMessage: addStock.stockMessage });
        console.debug("Params");
        var headers = new http_1.Headers();
        headers.append('Content-Type', 'application/json');
        return this.http.post(this.postAddStockUri, json, { headers: headers })
            .map(function (res) { return res.json(); });
    };
    return PortFolioService;
}());
PortFolioService = __decorate([
    core_1.Injectable(),
    __metadata("design:paramtypes", [http_1.Http])
], PortFolioService);
exports.PortFolioService = PortFolioService;
//# sourceMappingURL=portfolio.service.js.map