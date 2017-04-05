'use strict';
/// <reference path="../../lib/xp/global.ts" />
import { LayoutController } from  "../../../lib/xp/layout/controller";

const name = 'frontpage';
const type = 'layout';
const viewFile = resolve(`${name}.html`);

export default class SubNavLayoutController extends LayoutController {

    constructor(request: any) {
        super(request);
        this.name = name;
        this.type = type;
        this.viewFile = viewFile;
    }

    get() {
        this.model.leftRegion = this.component.regions["left"];
        this.model.rightRegion = this.component.regions["right"];
        return super.get();
    }

    public static handleRequest(request: any) {
        return new SubNavLayoutController(request).buildResponse().response;
    }

} 

export const get = SubNavLayoutController.handleRequest;
