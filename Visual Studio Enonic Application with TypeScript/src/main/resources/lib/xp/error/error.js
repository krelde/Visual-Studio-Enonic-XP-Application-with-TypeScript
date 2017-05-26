'use strict';
/// <reference path="./global.d.ts" />
var portal = require("xp/portal");
var content = require("xp/content");
var thymelef = require("xp/thymeleaf");
var ErrorBase = (function () {
    function ErrorBase(err) {
        this.portal = portal;
        this.content = content;
        this.thymelef = thymelef;
        this.model = {};
    }
    ErrorBase.prototype.handle404 = function (err) {
        //this.body = thymelef.render(this.view404,{});
        if (this.model != null) {
            this.body = thymelef.render(this.view404, this.model);
        }
        else {
            this.body = thymelef.render(this.view404, {});
        }
        return this; // chainable
    };
    ErrorBase.prototype.handleError = function (err) {
        this.body = thymelef.render(this.viewGeneric, this.errorParams);
        return this; // chainable
    };
    ErrorBase.prototype.buildResponse = function (err) {
        if (err.status == 404) {
            this.handle404(err);
        }
        else {
            this.handleError(err);
        }
        this.response = {
            body: this.body,
            contentType: 'text/html'
        };
        return this; // chainable
    };
    return ErrorBase;
}());
exports.ErrorBase = ErrorBase;
//# sourceMappingURL=error.js.map