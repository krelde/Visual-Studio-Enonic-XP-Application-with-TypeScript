/// <reference path="../../../lib/menu/menu.ts" />
'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../lib/xp/global.ts" />
var controller_1 = require("../../../lib/xp/page/controller");
var util = require("../../../lib/util/util");
var name = 'system';
var type = 'page';
var viewFile = resolve(name + ".html");
var SystemPageController = (function (_super) {
    __extends(SystemPageController, _super);
    function SystemPageController(request) {
        var _this = _super.call(this, request) || this;
        _this.name = name;
        _this.type = type;
        _this.viewFile = viewFile;
        return _this;
    }
    SystemPageController.prototype.get = function () {
        var helper = new util.Util();
        this.viewFile = resolve('mailform.html');
        var systemPage = this.portalLib.pageUrl({
            path: helper.getSystemPage(this)
        });
        this.model.sourceUrl = this.portalLib.pageUrl({
            path: this.request.params.sourceUrl,
            type: 'absolute'
        });
        this.model.systemPage = systemPage;
        return _super.prototype.get.call(this);
    };
    SystemPageController.prototype.post = function () {
        this.viewFile = resolve('mailresponse.html');
        this.sendMail();
        this.model.email = this.request.params.mottaker;
        return _super.prototype.post.call(this);
    };
    SystemPageController.handleRequest = function (request) {
        return new SystemPageController(request).buildResponse().response;
    };
    SystemPageController.prototype.sendMail = function () {
        var from = this.request.params.sender;
        var to = this.request.params.mottaker;
        this.mailLib.send({
            from: from,
            to: to,
            subject: 'Tips om ei side på Vegtilsynet.com',
            body: this.createMailBody(),
            contentType: 'text/html; charset="UTF-8"'
        });
    };
    SystemPageController.prototype.createMailBody = function () {
        var body = '<p>Hei!</p>' +
            '<p>' + this.request.params.sendernavn + ' har tipsa deg om ei side på <a href="http://wwww.vegtilsynet.com">Vegtilsynet.com</a> </p>' +
            '<a href="' + this.request.params.url + '">' + this.request.params.url + '</a>' +
            '<br />' +
            '<p>Vennleg helsing</p>' +
            '<p>Vegtilsynet</p>';
        return body;
    };
    return SystemPageController;
}(controller_1.PageController));
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = SystemPageController;
exports.get = SystemPageController.handleRequest;
exports.post = SystemPageController.handleRequest;
//# sourceMappingURL=system.js.map