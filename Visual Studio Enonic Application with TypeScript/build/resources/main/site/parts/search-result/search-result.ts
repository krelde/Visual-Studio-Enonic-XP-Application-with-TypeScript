'use strict';
/// <reference path="../../lib/xp/global.ts" />
import { PartController } from "../../../lib/xp/part/controller";
import util = require("../../../lib/util/util");
const name = 'search-result';
const type = 'part';
const viewFile = resolve(`${name}.html`);

export default class SearchresultPartController extends PartController {

    constructor(request: any) {
        super(request);
        this.name = name;
        this.type = type;
        this.viewFile = viewFile;
    }

    //TODO: Refactor and optimize code
    get() {
        var helper = new util.Util();
        var up = this.request.params; 
    
        var postsPerPage = 100;
        var newer = null, older = null; 
        var posts = [];

        var searchPage = helper.getSearchPage(this);


        var start = helper.isInt(up.paged) ? (up.paged - 1) * postsPerPage : 0;
        var header: any = {};
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

            var urlParams: any = {};

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
                } else {
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

        return super.get();
    }

    private getQuery(up, header) {
        var query = '';


        if (up.s) {
            query += 'fulltext("_allText", "' + up.s + '")';
            header.headerText = 'Search Results for: ' + up.s;
        }

        return query;
    }


    public static handleRequest(request: any) {
        return new SearchresultPartController(request).buildResponse().response;
    }


} 

export const get = SearchresultPartController.handleRequest;
