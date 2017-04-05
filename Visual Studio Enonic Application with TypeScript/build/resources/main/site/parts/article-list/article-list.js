'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../lib/xp/global.ts" />
var controller_1 = require("../../../lib/xp/part/controller");
var util = require("../../../lib/util/util");
var name = 'article-list';
var type = 'part';
var viewFile = resolve(name + ".html");
var ArticlelistPartController = (function (_super) {
    __extends(ArticlelistPartController, _super);
    function ArticlelistPartController(request) {
        var _this = _super.call(this, request) || this;
        _this.name = name;
        _this.type = type;
        _this.viewFile = viewFile;
        return _this;
    }
    ArticlelistPartController.prototype.get = function () {
        var helper = new util.Util();
        if (this.content.type == "portal:site") {
            this.viewFile = resolve("article-list-fp.html");
            var newsContainerPage = helper.getNewsContainerPage(this);
            this.model.articleList = this.createArticleListFp(newsContainerPage._id);
            this.model.pagename = helper.capitalizeFirstLetter(newsContainerPage.displayName);
            return _super.prototype.get.call(this);
        }
        this.model.pagename = helper.capitalizeFirstLetter(this.content.displayName);
        this.model.articleList = this.createArticleList();
        return _super.prototype.get.call(this);
    };
    ArticlelistPartController.prototype.createArticleList = function () {
        var helper = new util.Util();
        var articleList = [];
        var children = this.contentLib.getChildren({
            key: this.content._id,
            count: 10
        });
        for (var i = 0; i < children.hits.length; i++) {
            var child = children.hits[i];
            articleList.push({
                name: helper.capitalizeFirstLetter(child.displayName),
                path: child._path,
                modified: helper.getFormattedDate(new Date(child.modifiedTime)),
                mainintro: (child.data.mainintro) ? child.data.mainintro : helper.getMainBodyFirstP(child.data.mainbody),
                mainimage: child.data.mainimage
            });
        }
        return articleList;
    };
    ArticlelistPartController.prototype.createArticleListFp = function (id) {
        var helper = new util.Util();
        var articleList = [];
        var children = this.contentLib.getChildren({
            key: id,
            count: 4
        });
        for (var i = 0; i < children.hits.length; i++) {
            var child = children.hits[i];
            articleList.push({
                name: helper.capitalizeFirstLetter(child.displayName),
                path: child._path,
                modified: helper.getFormattedDate(new Date(child.modifiedTime)),
                intro: child.data.mainintro
            });
        }
        return articleList;
    };
    ArticlelistPartController.handleRequest = function (request) {
        return new ArticlelistPartController(request).buildResponse().response;
    };
    return ArticlelistPartController;
}(controller_1.PartController)); // ExamplePartController
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ArticlelistPartController;
exports.get = ArticlelistPartController.handleRequest;
//# sourceMappingURL=article-list.js.map