'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../lib/xp/global.ts" />
var controller_1 = require("../../../lib/xp/part/controller");
var util = require("../../../lib/util/util");
var name = 'focus-articles';
var type = 'part';
var viewFile = resolve(name + ".html");
var FocusArticlesPartController = (function (_super) {
    __extends(FocusArticlesPartController, _super);
    function FocusArticlesPartController(request) {
        var _this = _super.call(this, request) || this;
        _this.name = name;
        _this.type = type;
        _this.viewFile = viewFile;
        return _this;
    }
    FocusArticlesPartController.prototype.get = function () {
        var helper = new util.Util();
        var articleList = [];
        for (var i = 0; i < this.config.focusarticles.length; i++) {
            var article = this.contentLib.get({ key: this.config.focusarticles[i] });
            articleList.push({
                name: article.displayName,
                path: article._path,
                img: helper.getImageURLs(article.data.featureimage, 104, 104, this)
            });
        }
        this.model.focusArticles = articleList;
        return _super.prototype.get.call(this);
    };
    FocusArticlesPartController.handleRequest = function (request) {
        return new FocusArticlesPartController(request).buildResponse().response;
    };
    return FocusArticlesPartController;
}(controller_1.PartController)); // ExamplePartController
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = FocusArticlesPartController;
exports.get = FocusArticlesPartController.handleRequest;
//# sourceMappingURL=focus-articles.js.map