/// <reference path="../../../lib/menu/menu.ts" />
'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../lib/xp/global.ts" />
var controller_1 = require("../../../lib/xp/page/controller");
var menu = require("../../../lib/menu/menu");
var util = require("../../../lib/util/util");
var name = 'page';
var type = 'page';
var viewFile = resolve(name + ".html");
//const viewFile = `./${name}.html`;
var PagePageController = (function (_super) {
    __extends(PagePageController, _super);
    function PagePageController(request) {
        var _this = _super.call(this, request) || this;
        _this.name = name;
        _this.type = type;
        _this.viewFile = viewFile;
        return _this;
    }
    PagePageController.prototype.get = function () {
        var helper = new util.Util();
        this.model.lang = 'nb-no';
        this.model.title = this.content.displayName + " | Vegtilsynet";
        var searchPage = this.portalLib.pageUrl({
            path: helper.getSearchPage(this)
        });
        this.model.searchPage = searchPage;
        this.model.topMenu = this.createHeaderMenu();
        this.model.isSite = (this.content.type == "portal:site");
        this.model.footer = {
            adress: this.siteConfig.adress,
            phone: this.siteConfig.phone,
            email: this.siteConfig.email,
            editor: this.siteConfig.editor,
            editoremail: this.siteConfig.editoremail
        };
        return _super.prototype.get.call(this);
    };
    PagePageController.prototype.post = function () {
        return _super.prototype.post.call(this);
    };
    PagePageController.handleRequest = function (request) {
        return new PagePageController(request).buildResponse().response;
    };
    PagePageController.prototype.createHeaderMenu = function () {
        var menuUtil = new menu.Menu();
        var helper = new util.Util();
        var menuItems = [
            {
                name: this.site.displayName,
                path: this.site._path,
                isActive: menuUtil.isActive(this.site)
            }
        ];
        var children = this.contentLib.getChildren({
            key: this.site._id,
            count: 200
        });
        for (var i = 0; i < children.hits.length; i++) {
            var child = children.hits[i];
            if (menuUtil.isMenuItem(child) && child.type == "com.company.vts:article") {
                menuItems.push({
                    name: helper.capitalizeFirstLetter(child._name),
                    path: child._path,
                    isActive: menuUtil.isActive(child)
                });
            }
        }
        return menuItems;
    };
    return PagePageController;
}(controller_1.PageController)); // PagePageController
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PagePageController;
exports.get = PagePageController.handleRequest;
exports.post = PagePageController.handleRequest;
//# sourceMappingURL=page.js.map