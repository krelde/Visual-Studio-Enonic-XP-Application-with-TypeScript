'use strict';
/// <reference path="../../lib/xp/global.ts" />
import { PartController } from "../../../lib/xp/part/controller";
import util = require("../../../lib/util/util");
const name = 'focus-articles';
const type = 'part';
const viewFile = resolve(`${name}.html`);

export default class FocusArticlesPartController extends PartController {

    constructor(request: any) {
        super(request);
        this.name = name;
        this.type = type;
        this.viewFile = viewFile;
    }

    get() {
        var helper = new util.Util();
        var articleList = [];
        for (var i = 0; i < this.config.focusarticles.length; i++) {
            var article = this.contentLib.get({ key: this.config.focusarticles[i] });
            articleList.push({
                name: article.displayName,
                path: article._path,
                img: helper.getImageURLs(article.data.featureimage, 104,104, this)
            });
        }
        this.model.focusArticles = articleList;

        return super.get();
    }

    public static handleRequest(request: any) {
        return new FocusArticlesPartController(request).buildResponse().response;
    }

} // ExamplePartController

export const get = FocusArticlesPartController.handleRequest;
