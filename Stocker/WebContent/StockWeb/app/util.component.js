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
var http_1 = require('@angular/http');
var UtilComponent = (function () {
    function UtilComponent(http) {
        this.http = http;
        this.showdropdown = false;
        this.loadingGIF = false;
    }
    UtilComponent.prototype.import = function () {
        var _this = this;
        // hide existing data 
        this.toggleLoadingGIF(true);
        this.loadres = null;
        this.http.get('http://localhost:8080/Stocker/stocker/utils/invoke/run')
            .map(function (response) { return response.json(); })
            .subscribe(function (data) {
            // set items to json response
            _this.loadres = data;
            _this.toggleLoadingGIF(false);
        });
        console.log('Completed Import');
    };
    UtilComponent.prototype.viewlogs = function () {
        this.loadlogslist();
        this.showdropdown = true;
    };
    UtilComponent.prototype.loadlogslist = function () {
        var _this = this;
        this.http.get('http://localhost:8080/Stocker/stocker/utils/loglist')
            .map(function (response) { return response.json(); })
            .subscribe(function (data) {
            // set items to json response
            _this.dropdownValues = data;
            _this.loadselectedlog(_this.dropdownValues[0]);
        });
    };
    UtilComponent.prototype.loadselectedlog = function (logname) {
        var _this = this;
        // hide existing data 
        this.toggleLoadingGIF(true);
        this.loadres = null;
        this.http.get('http://localhost:8080/Stocker/stocker/utils/readlog/' + logname)
            .map(function (response) { return response.json(); })
            .subscribe(function (data) {
            // set items to json response
            _this.loadres = data;
            _this.toggleLoadingGIF(false);
        });
    };
    UtilComponent.prototype.action = function (logname) {
        console.log("action");
        this.loadselectedlog(logname);
    };
    UtilComponent.prototype.viewdata = function () {
        this.loadres = null;
    };
    UtilComponent.prototype.toggleLoadingGIF = function (loading) {
        this.loadingGIF = loading;
    };
    UtilComponent = __decorate([
        core_1.Component({
            selector: 'my-util',
            template: "<h3 class=\"header\">Utilities</h3>\n               <div class=\"row\">\n                 <button class=\"btn btn-success\" (click)=\"import()\">Run Import</button>\n                 <button class=\"btn btn-info\" (click)=\"viewlogs()\">View Import Logs</button>\n                 <button class=\"btn btn-primary\" (click)=\"viewdata()\">View Import Data</button>\n               </div>\n               <div style=\"margin-top:15px\"></div>\n\n               <div *ngIf=\"showdropdown\" class=\"row\">\n                 <dropdown [values]=\"dropdownValues\" (select)=\"action($event)\"></dropdown>\n               </div> \n               \n               <div style=\"margin-top:15px\"></div>\n               <div *ngIf=\"loadres\" class=\"panel panel-default\">\n                <div *ngIf=\"loadres\" class=\"panel-heading\">\n                  <h3 class=\"panel-title\">{{loadres.loadId}}</h3>\n                </div>\n                <ul class=\"list-group\" *ngIf=\"loadres\">\n                  <li class=\"list-group-item\">\n                    <h4 class=\"list-group-item-heading\">Stocks Processed</h4>\n                    <p class=\"list-group-item-text\">{{loadres.stocksProcessed}}</p>\n                  </li>\n                  <li class=\"list-group-item\">\n                    <h4 class=\"list-group-item-heading\">Stocks Loaded</h4>\n                    <p class=\"list-group-item-text\">{{loadres.stocksLoaded}}</p>\n                  </li>\n                  <li class=\"list-group-item\">\n                    <h4 class=\"list-group-item-heading\">Stocks Failed</h4>\n                    <p class=\"list-group-item-text\">{{loadres.stocksFailed}}</p>\n                  </li>\n                  <li class=\"list-group-item\">\n                    <h4 class=\"list-group-item-heading\">Stock Errors</h4>\n                    <p class=\"list-group-item-text\">{{loadres.stocksErrors}}</p>\n                  </li>      \n                  <li class=\"list-group-item\">\n                    <h4 class=\"list-group-item-heading\">Stock Duration</h4>\n                    <p class=\"list-group-item-text\">{{loadres.loadDuration}}</p>\n                  </li>                        \n              </ul>\n              </div>            \n              <div *ngIf=\"loadingGIF\" class=\"row\">\n                <img src=\"../img/spin.svg\">\n              </div>  \n            "
        }), 
        __metadata('design:paramtypes', [http_1.Http])
    ], UtilComponent);
    return UtilComponent;
}());
exports.UtilComponent = UtilComponent;
//# sourceMappingURL=util.component.js.map