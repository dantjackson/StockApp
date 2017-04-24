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
var DropdownComponent = (function () {
    function DropdownComponent() {
        this.select = new core_1.EventEmitter();
        //values = ["One","Two"];
    }
    return DropdownComponent;
}());
__decorate([
    core_1.Output(),
    __metadata("design:type", Object)
], DropdownComponent.prototype, "select", void 0);
__decorate([
    core_1.Input(),
    __metadata("design:type", Array)
], DropdownComponent.prototype, "values", void 0);
DropdownComponent = __decorate([
    core_1.Component({
        selector: 'dropdown',
        template: " \n  <div class=\"col-sm-4\">\n    <select #sel (change)=\"select.emit(sel.value)\" class=\"form-control\">\n      <option *ngFor=\"let value of values\" >\n        {{value}}\n      </option>\n    </select>\n  </div>\n  "
    })
], DropdownComponent);
exports.DropdownComponent = DropdownComponent;
//# sourceMappingURL=dropdown.component.js.map