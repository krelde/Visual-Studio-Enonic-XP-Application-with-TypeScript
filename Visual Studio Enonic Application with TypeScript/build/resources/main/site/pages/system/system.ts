/// <reference path="../../../lib/menu/menu.ts" />
'use strict';
/// <reference path="../../lib/xp/global.ts" />
import { PageController } from "../../../lib/xp/page/controller";
import util = require("../../../lib/util/util");
const name = 'system';
const type = 'page';
const viewFile = resolve(`${name}.html`);

export default class SystemPageController extends PageController {

    constructor(request: any) {
        super(request);
        this.name = name;
        this.type = type;
        this.viewFile = viewFile;
    }

    get() {
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
        return super.get();
    }

    post() {
        this.viewFile = resolve('mailresponse.html');
        this.sendMail();
        this.model.email = this.request.params.mottaker;
        return super.post();
    }

    public static handleRequest(request: any) {
        return new SystemPageController(request).buildResponse().response;
    }

    private sendMail() {
        var from = this.request.params.sender;
        var to = this.request.params.mottaker;
        this.mailLib.send({
            from: from,
            to: to,
            subject: 'Tips om ei side på Vegtilsynet.com',
            body: this.createMailBody(),
            contentType: 'text/html; charset="UTF-8"'
        });
    }

    private createMailBody() {
        var body = '<p>Hei!</p>'+
            '<p>' + this.request.params.sendernavn + ' har tipsa deg om ei side på <a href="http://wwww.vegtilsynet.com">Vegtilsynet.com</a> </p>' +
            '<a href="' + this.request.params.url + '">' + this.request.params.url + '</a>' +
            '<br />' +
            '<p>Vennleg helsing</p>' +
            '<p>Vegtilsynet</p>';
        return body;
    }
} 

export const get = SystemPageController.handleRequest;
export const post = SystemPageController.handleRequest;