'use strict';
/// <reference path="../../lib/xp/global.ts" />
import { PartController } from "../../../lib/xp/part/controller";
import util = require("../../../lib/util/util");
const name = 'article-list';
const type = 'part';
const viewFile = resolve(`${name}.html`);

export default class ArticlelistPartController extends PartController {

    constructor(request: any) {
        super(request);
        this.name = name;
        this.type = type;
        this.viewFile = viewFile;
    }

    get() {
        var helper = new util.Util();
        if (this.content.type == "portal:site") {
            this.viewFile = resolve("article-list-fp.html");
            var newsContainerPage = helper.getNewsContainerPage(this);
            this.model.articleList = this.createArticleListFp(newsContainerPage._id);
            this.model.pagename = helper.capitalizeFirstLetter(newsContainerPage.displayName);
            return super.get();
        }

        this.model.pagename = helper.capitalizeFirstLetter(this.content.displayName);
        this.model.articleList = this.createArticleList();

        return super.get();
    }

    private createArticleList() {
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
    }

    private createArticleListFp(id) {
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
    }

    public static handleRequest(request: any) {
        return new ArticlelistPartController(request).buildResponse().response;
    }

} // ExamplePartController

export const get = ArticlelistPartController.handleRequest;
