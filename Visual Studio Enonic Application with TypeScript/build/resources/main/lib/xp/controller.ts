'use strict';

import portal = require("xp/portal");
import thymelef = require("xp/thymeleaf");
import content = require("xp/content");
import mail = require("xp/mail");

export abstract class Controller {
    body: string;
    component: any;
    pageContributions: any;
    config: any;
    content: any;
    cookies: any;
    headers: any;
    method: string;
    mode: string;
    model: any;
    name: string;
    params: any;
    request: any;
    response: any;
    responseContentType: string;
    siteConfig: any;
    status: number;
    type: string;
    viewFile: string; // resolved path
    site:any;
    contentLib: any;
    portalLib: any;
    mailLib:any;
    constructor(request: any) {
        this.request = request;
        this.cookies = request.cookies;
        this.headers = request.headers;
        this.method  = request.method;
        this.mode    = request.mode;
        this.params  = request.params;
        this.content = portal.getContent(); 
        this.component = portal.getComponent() || this.content.page;
        this.config    = this.component.config;
        this.siteConfig = portal.getSiteConfig();
        this.site = portal.getSite();
        this.contentLib = content;
        this.mailLib = mail;
        this.model = {};
    } // constructor

    debug() {
        return this; // chainable
    }

    render() {
        this.body = thymelef.render(this.viewFile, this.model);
        return this; // chainable
    }
    //fistil f = asdjks;
    get(): any {
        this.model.name = this.name;
        return this; // chainable
    }

    post(): any {
        this.model.name = this.name;
        return this; // chainable
    }

    buildResponse() {
        switch (this.method) {
            case 'GET': this.get(); break;
            case 'POST': this.post(); break;
        }
        this.render();
        this.responseContentType = 'text/html';
        this.status = 200;
        this.response = {
            body: this.body,
            pageContributions: this.pageContributions,
            contentType: this.responseContentType,
            status: this.status
        };
        this.debug();
        return this; // chainable
    }

    //log object as JSON
    jlog(o) {
        log.info(JSON.stringify(o));
    }

    public static handleRequest(request: any): any {}

} // abstract class Controller

export abstract class ControllerWithRegions extends Controller {
    regions: any;

    constructor(request) {
        super(request);
        this.regions = this.component.regions;
        this.model.regions = this.regions;
        this.model.regionsArray = Object.keys(this.regions).map(k=>this.regions[k]);
    }

    debug() {
        super.debug();
        return this; // chainable
    }

} 
