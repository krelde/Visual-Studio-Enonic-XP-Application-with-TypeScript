'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../lib/xp/global.ts" />
var controller_1 = require("../../../lib/xp/part/controller");
var util = require("../../../lib/util/util");
var menu = require("../../../lib/menu/menu");
var name = 'article';
var type = 'part';
var viewFile = resolve(name + ".html");
var ArticlePartController = (function (_super) {
    __extends(ArticlePartController, _super);
    function ArticlePartController(request) {
        var _this = _super.call(this, request) || this;
        _this.name = name;
        _this.type = type;
        _this.viewFile = viewFile;
        return _this;
    }
    ArticlePartController.prototype.get = function () {
        var helper = new util.Util();
        var menus = new menu.Menu();
        this.model.breadcrumbs = menus.generateBreadcrumb(this.content._path).reverse();
        this.model.pagename = helper.capitalizeFirstLetter((this.content.data.title) ? this.content.data.title : this.content.displayName);
        this.model.mainbody = this.portalLib.processHtml({
            value: this.content.data.mainbody
        });
        this.model.mainintro = this.content.data.mainintro;
        if (this.component.path.indexOf('maincontent') > 0) {
            this.model.image = helper.getImageURLs(this.content.data.mainimage, 550, 366, this);
        }
        else {
            this.model.image = helper.getImageURLs(this.content.data.mainimage, 700, 542, this);
        }
        if (this.content.data.attachments) {
            this.model.attachments = this.getAttachemnts(this.content.data.attachments);
        }
        if (this.content.data.mainimage) {
            var imageData = this.contentLib.get({ key: this.content.data.mainimage });
            if (imageData != null) {
                this.lj(imageData.data);
                if (imageData.data.caption != null && imageData.data.caption.length > 0) {
                    this.model.imagecaption = imageData.data.caption;
                }
                if (imageData.data.artist != null && imageData.data.artist.length > 0) {
                    this.model.imagecaptionbyline = "Foto: " + imageData.data.artist;
                }
            }
        }
        var systemPage = this.portalLib.pageUrl({
            path: helper.getSystemPage(this),
            params: {
                sourceUrl: this.content._path
            }
        });
        this.model.systemPage = systemPage;
        this.model.isTopicArticle = (this.component.path.indexOf('maincontent') > 0);
        if (this.content.data.relatedcontent != null) {
            var articleList = [];
            for (var i = 0; i < this.content.data.relatedcontent.length; i++) {
                var article = this.contentLib.get({ key: this.content.data.relatedcontent[i] });
                articleList.push({
                    name: article.displayName,
                    intro: article.data.mainintro,
                    path: article._path,
                    img: helper.getImageURLs(article.data.featureimage, 104, 104, this)
                });
            }
            this.model.relatedContent = articleList;
        }
        return _super.prototype.get.call(this);
    };
    ArticlePartController.handleRequest = function (request) {
        return new ArticlePartController(request).buildResponse().response;
    };
    ArticlePartController.prototype.getAttachemnts = function (attachemnts) {
        var attachmentList = [];
        if (attachemnts.constructor === Array) {
            for (var i = 0; i < attachemnts.length; i++) {
                var attachmentData = this.contentLib.get({
                    key: attachemnts[i]
                });
                var abstractData = (attachmentData.data.abstract != null) ? attachmentData.data.abstract.split(';') : [];
                attachmentList.push({
                    id: attachemnts[i],
                    number: (abstractData[0] != null) ? abstractData[0] : "",
                    supervision: (abstractData[1] != null) ? abstractData[1] : "",
                    name: attachmentData.displayName,
                    topic: (attachmentData.data.tags != null && attachmentData.data.tags.constructor === Array) ? attachmentData.data.tags.join(" ") : attachmentData.data.tags
                });
            }
        }
        else {
            var attachmentData = this.contentLib.get({
                key: attachemnts
            });
            attachmentList.push({
                id: attachemnts,
                number: attachmentData.data.abstract,
                name: attachmentData.displayName,
                topic: (attachmentData.data.tags != null && attachmentData.data.tags.constructor === Array) ? attachmentData.data.tags.join(" ") : attachmentData.data.tags
            });
        }
        return attachmentList;
    };
    return ArticlePartController;
}(controller_1.PartController));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ArticlePartController;
exports.get = ArticlePartController.handleRequest;
//# sourceMappingURL=article.js.map