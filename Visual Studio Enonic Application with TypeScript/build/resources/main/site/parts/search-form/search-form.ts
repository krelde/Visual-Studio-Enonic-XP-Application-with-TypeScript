'use strict';
/// <reference path="../../lib/xp/global.ts" />
import { PartController } from "../../../lib/xp/part/controller";
import util = require("../../../lib/util/util");
const name = 'search-form';
const type = 'part';
const viewFile = resolve(`${name}.html`);

export default class SearchFormPartController extends PartController {

    constructor(request: any) {
        super(request);
        this.name = name;
        this.type = type;
        this.viewFile = viewFile;
    }

    get() {
        var helper = new util.Util();
        var searchPage = this.portalLib.pageUrl({
            path: helper.getSearchPage(this)
        });
        this.model.searchPage = searchPage;
        return super.get();
    }

    public static handleRequest(request: any) {
        return new SearchFormPartController(request).buildResponse().response;
    }

} 

export const get = SearchFormPartController.handleRequest;