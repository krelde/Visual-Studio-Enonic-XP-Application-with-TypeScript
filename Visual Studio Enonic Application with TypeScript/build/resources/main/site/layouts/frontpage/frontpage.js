'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../lib/xp/global.ts" />
var controller_1 = require("../../../lib/xp/layout/controller");
var name = 'frontpage';
var type = 'layout';
var viewFile = resolve(name + ".html");
var SubNavLayoutController = (function (_super) {
    __extends(SubNavLayoutController, _super);
    function SubNavLayoutController(request) {
        var _this = _super.call(this, request) || this;
        _this.name = name;
        _this.type = type;
        _this.viewFile = viewFile;
        return _this;
    }
    SubNavLayoutController.prototype.get = function () {
        this.model.leftRegion = this.component.regions["left"];
        this.model.rightRegion = this.component.regions["right"];
        return _super.prototype.get.call(this);
    };
    SubNavLayoutController.handleRequest = function (request) {
        return new SubNavLayoutController(request).buildResponse().response;
    };
    return SubNavLayoutController;
}(controller_1.LayoutController));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SubNavLayoutController;
exports.get = SubNavLayoutController.handleRequest;
//# sourceMappingURL=frontpage.js.map