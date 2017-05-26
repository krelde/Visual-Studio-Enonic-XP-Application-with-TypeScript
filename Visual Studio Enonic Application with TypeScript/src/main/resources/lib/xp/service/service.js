'use strict';
var portal = require("xp/portal");
var Service = (function () {
    function Service(request) {
        this.portalLib = portal;
        this.contentType = 'application/json';
        this.method = request.method;
        this.params = this.parseparams(request.params);
    }
    Service.prototype.get = function () {
        return this; // chainable
    };
    Service.prototype.post = function () {
        return this; // chainable
    };
    Service.prototype.buildResponse = function () {
        switch (this.method) {
            case 'GET':
                this.get();
                break;
            case 'POST':
                this.post();
                break;
        }
        this.body = this.createresults(this.getItems(), this.params);
        this.response = {
            body: this.body,
            contentType: this.contentType
        };
        return this;
    };
    Service.handleRequest = function (request) { };
    return Service;
}());
exports.Service = Service;
//# sourceMappingURL=service.js.map