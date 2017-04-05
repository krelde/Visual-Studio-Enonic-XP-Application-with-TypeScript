/// <reference path="../../../lib/menu/menu.ts" />
'use strict';
/// <reference path="../../lib/xp/global.ts" />
import { PageController } from "../../../lib/xp/page/controller";
import menu = require("../../../lib/menu/menu");
import util = require("../../../lib/util/util");
const name = 'page';
const type = 'page';
const viewFile = resolve(`${name}.html`);
//const viewFile = `./${name}.html`;

export default class PagePageController extends PageController {

    constructor(request: any) {
        super(request);
        this.name = name;
        this.type = type;
        this.viewFile = viewFile;
    }

    get() {
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
        }

        return super.get();
    }

    post() {
    
        return super.post();
    }


    public static handleRequest(request: any) {
        return new PagePageController(request).buildResponse().response;
    }

    private createHeaderMenu() {
        var menuUtil = new menu.Menu();
        var helper = new util.Util();
        var menuItems = [
            {
                name: this.site.displayName,
                path: this.site._path,
                isActive: menuUtil.isActive(this.site)
            }];

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
    }


} // PagePageController

export const get = PagePageController.handleRequest;
export const post = PagePageController.handleRequest;