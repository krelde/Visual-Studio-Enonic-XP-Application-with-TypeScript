'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../lib/xp/global.ts" />
var controller_1 = require("../../../lib/xp/part/controller");
var util = require("../../../lib/util/util");
var name = 'search-result';
var type = 'part';
var viewFile = resolve(name + ".html");
var SearchresultPartController = (function (_super) {
    __extends(SearchresultPartController, _super);
    function SearchresultPartController(request) {
        var _this = _super.call(this, request) || this;
        _this.name = name;
        _this.type = type;
        _this.viewFile = viewFile;
        return _this;
    }
    //TODO: Refactor and optimize code
    SearchresultPartController.prototype.get = function () {
        var helper = new util.Util();
        var up = this.request.params;
        var postsPerPage = 100;
        var newer = null, older = null;
        var posts = [];
        var searchPage = helper.getSearchPage(this);
        var start = helper.isInt(up.paged) ? (up.paged - 1) * postsPerPage : 0;
        var header = {};
        var query = this.getQuery(up, header);
        var results = this.contentLib.query({
            start: start,
            count: postsPerPage,
            query: query,
            contentTypes: [
                app.name + ':article'
            ]
        });
        var hasResult = results.hits.length > 0 ? true : false;
        var numMatches = results.total | 0;
        if (results.total > postsPerPage) {
            var urlParams = {};
            for (var param in up) {
                if (param != 'paged') {
                    urlParams[param] = up[param];
                }
            }
            if (start < (results.total - postsPerPage)) {
                urlParams.paged = helper.isInt(up.paged) ? (parseInt(up.paged) + 1).toString() : 2;
                older = this.portalLib.pageUrl({
                    path: this.content._path == searchPage ? searchPage : this.site._path,
                    params: urlParams
                });
            }
            if (start != 0) {
                if (helper.isInt(up.paged) && up.paged > 2) {
                    urlParams.paged = (parseInt(up.paged) - 1).toString();
                }
                else {
                    urlParams.paged = null;
                }
                newer = this.portalLib.pageUrl({
                    path: this.content._path == searchPage ? searchPage : this.site._path,
                    params: urlParams
                });
            }
        }
        for (var i = 0; i < results.hits.length; i++) {
            var data = results.hits[i].data;
            data.title = results.hits[i].displayName;
            data.class = 'post-' + results.hits[i]._id + ' post type-post status-publish format-standard hentry';
            if (data.stickyPost && Object.keys(up).length == 0) {
                data.class += ' sticky';
            }
            var date = new Date(results.hits[i].createdTime);
            date = helper.getFormattedDate(date);
            data.pubDate = date;
            data.path = results.hits[i]._path;
            data.createdTime = results.hits[i].createdTime;
            data.mainintro = (data.mainintro) ? data.mainintro : helper.getMainBodyFirstP(data.mainbody);
            posts.push(data);
        }
        this.model.posts = posts;
        this.model.site = this.site;
        this.model.searchPage = searchPage;
        this.model.order = older;
        this.model.newer = newer;
        this.model.headerText = header.headerText;
        this.model.hasPosts = hasResult;
        this.model.numMatches = numMatches;
        this.model.searchTerm = up.s;
        this.model.componentUrl = this.portalLib.componentUrl({});
        this.model.pageUrl = this.portalLib.pageUrl({});
        this.model.urlParams = up;
        this.model.pagename = this.content._name;
        return _super.prototype.get.call(this);
    };
    SearchresultPartController.prototype.getQuery = function (up, header) {
        var query = '';
        if (up.s) {
            query += 'fulltext("_allText", "' + up.s + '")';
            header.headerText = 'Search Results for: ' + up.s;
        }
        return query;
    };
    SearchresultPartController.handleRequest = function (request) {
        return new SearchresultPartController(request).buildResponse().response;
    };
    return SearchresultPartController;
}(controller_1.PartController));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SearchresultPartController;
exports.get = SearchresultPartController.handleRequest;
//# sourceMappingURL=search-result.js.map