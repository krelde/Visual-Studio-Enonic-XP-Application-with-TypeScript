'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../lib/xp/global.ts" />
var controller_1 = require("../../../lib/xp/part/controller");
var util = require("../../../lib/util/util");
var name = 'search-form';
var type = 'part';
var viewFile = resolve(name + ".html");
var SearchFormPartController = (function (_super) {
    __extends(SearchFormPartController, _super);
    function SearchFormPartController(request) {
        var _this = _super.call(this, request) || this;
        _this.name = name;
        _this.type = type;
        _this.viewFile = viewFile;
        return _this;
    }
    SearchFormPartController.prototype.get = function () {
        var helper = new util.Util();
        var searchPage = this.portalLib.pageUrl({
            path: helper.getSearchPage(this)
        });
        this.model.searchPage = searchPage;
        return _super.prototype.get.call(this);
    };
    SearchFormPartController.handleRequest = function (request) {
        return new SearchFormPartController(request).buildResponse().response;
    };
    return SearchFormPartController;
}(controller_1.PartController));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SearchFormPartController;
exports.get = SearchFormPartController.handleRequest;
//# sourceMappingURL=search-form.js.map