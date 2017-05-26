'use strict';
import portal = require("xp/portal");
export abstract class Service {
    portalLib: lib.xp.portal;
    contentType: string;
    body: any;
    method: any;
    response:any;
    params:any;
    constructor(request: any) {
        this.portalLib = portal;
        this.contentType = 'application/json';
        this.method = request.method;
        this.params = this.parseparams(request.params);
    }

    get() {
        return this; // chainable
    }

    post() {
        return this; // chainable
    }

    buildResponse() {
        switch (this.method) {
            case 'GET': this.get(); break;
            case 'POST': this.post(); break;
        }
        
        this.body = this.createresults(this.getItems(), this.params);
        
        this.response = {
            body: this.body,
            contentType: this.contentType
        };

        return this;
    }

    abstract createresults(items, params, total?);

    abstract getItems();

    abstract parseparams(params);

    public static handleRequest(request: any): any { }
} 

