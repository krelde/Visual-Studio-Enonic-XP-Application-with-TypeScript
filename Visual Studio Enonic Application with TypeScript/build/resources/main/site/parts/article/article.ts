'use strict';
/// <reference path="../../lib/xp/global.ts" />
import { PartController } from "../../../lib/xp/part/controller";
import util = require("../../../lib/util/util");
import menu = require("../../../lib/menu/menu");
const name = 'article';
const type = 'part';
const viewFile = resolve(`${name}.html`);

export default class ArticlePartController extends PartController {

    constructor(request: any) {
        super(request);
        this.name = name;
        this.type = type;
        this.viewFile = viewFile;
    }

    get() {
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
        } else {
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
        return super.get();
    }

    public static handleRequest(request: any) {
        return new ArticlePartController(request).buildResponse().response;
    }

    private getAttachemnts(attachemnts) {

        var attachmentList = [];
        if (attachemnts.constructor === Array) {
            for (var i = 0; i < attachemnts.length; i++) {
                var attachmentData = this.contentLib.get({
                    key: attachemnts[i]
                });

                var abstractData = (attachmentData.data.abstract != null) ? attachmentData.data.abstract.split(';') : [];

                attachmentList.push
                    ({
                        id: attachemnts[i],
                        number: (abstractData[0] != null) ? abstractData[0] : "",
                        supervision: (abstractData[1] != null) ? abstractData[1] : "",
                        name: attachmentData.displayName,
                        topic: (attachmentData.data.tags != null && attachmentData.data.tags.constructor === Array) ? attachmentData.data.tags.join(" ") : attachmentData.data.tags

                    });
            }
        } else {
            var attachmentData = this.contentLib.get({
                key: attachemnts
            });

            attachmentList.push
                ({
                    id: attachemnts,
                    number: attachmentData.data.abstract,
                    name: attachmentData.displayName,
                    topic: (attachmentData.data.tags != null && attachmentData.data.tags.constructor === Array) ? attachmentData.data.tags.join(" ") : attachmentData.data.tags
                });
        }

        return attachmentList;
    }
}

export const get = ArticlePartController.handleRequest;