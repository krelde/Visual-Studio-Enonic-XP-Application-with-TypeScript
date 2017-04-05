'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var portal = require("xp/portal");
var thymelef = require("xp/thymeleaf");
var content = require("xp/content");
var mail = require("xp/mail");
var Controller = (function () {
    function Controller(request) {
        this.request = request;
        this.cookies = request.cookies;
        this.headers = request.headers;
        this.method = request.method;
        this.mode = request.mode;
        this.params = request.params;
        this.content = portal.getContent();
        this.component = portal.getComponent() || this.content.page;
        this.config = this.component.config;
        this.siteConfig = portal.getSiteConfig();
        this.site = portal.getSite();
        this.contentLib = content;
        this.mailLib = mail;
        this.model = {};
    } // constructor
    Controller.prototype.debug = function () {
        return this; // chainable
    };
    Controller.prototype.render = function () {
        this.body = thymelef.render(this.viewFile, this.model);
        return this; // chainable
    };
    //fistil f = asdjks;
    Controller.prototype.get = function () {
        this.model.name = this.name;
        return this; // chainable
    };
    Controller.prototype.post = function () {
        this.model.name = this.name;
        return this; // chainable
    };
    Controller.prototype.buildResponse = function () {
        switch (this.method) {
            case 'GET':
                this.get();
                break;
            case 'POST':
                this.post();
                break;
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
    };
    //log object as JSON
    Controller.prototype.jlog = function (o) {
        log.info(JSON.stringify(o));
    };
    Controller.handleRequest = function (request) { };
    return Controller;
}()); // abstract class Controller
exports.Controller = Controller;
var ControllerWithRegions = (function (_super) {
    __extends(ControllerWithRegions, _super);
    function ControllerWithRegions(request) {
        var _this = _super.call(this, request) || this;
        _this.regions = _this.component.regions;
        _this.model.regions = _this.regions;
        _this.model.regionsArray = Object.keys(_this.regions).map(function (k) { return _this.regions[k]; });
        return _this;
    }
    ControllerWithRegions.prototype.debug = function () {
        _super.prototype.debug.call(this);
        return this; // chainable
    };
    return ControllerWithRegions;
}(Controller));
exports.ControllerWithRegions = ControllerWithRegions;
//# sourceMappingURL=controller.js.map