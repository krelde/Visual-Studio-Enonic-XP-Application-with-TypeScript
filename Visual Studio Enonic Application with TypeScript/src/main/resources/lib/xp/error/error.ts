'use strict';
/// <reference path="./global.d.ts" />
import portal = require("xp/portal");
import content = require("xp/content");
import thymelef = require("xp/thymeleaf");


export abstract class ErrorBase {
    portal: lib.xp.portal = portal;
    content: lib.xp.content = content;
    thymelef: lib.xp.thymeleaf = thymelef;
    viewGeneric: string;
    view404: string;
    response: any;
    body: any;
    model: any;
    errorParams: any;
    constructor(err: any) {
        this.model = {};
    }

    handle404(err): any {

        //this.body = thymelef.render(this.view404,{});
        if (this.model != null) {
            this.body = thymelef.render(this.view404, this.model);
        } else {
            this.body = thymelef.render(this.view404, {});
        }

        return this; // chainable
    }

    handleError(err): any {

        this.body = thymelef.render(this.viewGeneric, this.errorParams);
        return this; // chainable
    }

    buildResponse(err) {
        if (err.status == 404) {
            this.handle404(err);
        } else {
            this.handleError(err);
        }
        this.response = {
            body: this.body,
            contentType: 'text/html'
        };
        return this; // chainable
    }
}