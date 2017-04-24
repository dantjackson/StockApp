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
var SearchBox = (function () {
    function SearchBox() {
        this.update = new core_1.EventEmitter();
    }
    SearchBox.prototype.ngOnInit = function () {
        this.update.emit('');
    };
    return SearchBox;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], SearchBox.prototype, "update", void 0);
SearchBox = __decorate([
    core_1.Component({
        selector: 'search-box',
        template: "\n\t<div class=\"container\">\n      <div class=\"row\">\n\t    <div class=\"col-md-3\">\n\t\t  <h3>Search Stocks</h3>\n          <div id=\"custom-search-input\">\n\t\t    <div class=\"input-group col-md-12\">\n\t\t      <input #input type=\"text\" (input)=\"update.emit(input.value);\" class=\"form-control input-lg\" placeholder=\"Stock ID\" />\n              <span class=\"input-group-btn\">\n\t\t\t    <button class=\"btn btn-info btn-lg\" type=\"button\">\n\t\t\t\t  <i class=\"glyphicon glyphicon-search\"></i>\n\t\t\t\t</button>\n\t\t\t  </span>\t\n\t\t\t</div>\t\t\n\t\t  </div>\n\t\t</div>\n      </div>\t\t  \t  \t  \n\t</div>"
    })
], SearchBox);
exports.SearchBox = SearchBox;
//# sourceMappingURL=search.box.js.map