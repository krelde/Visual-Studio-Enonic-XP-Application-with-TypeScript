'use strict';
/// <reference path="../../lib/xp/global.ts" />
import { PartController } from "../../../lib/xp/part/controller";
import util = require("../../../lib/util/util");
const name = 'top-article';
const type = 'part';
const viewFile = resolve(`${name}.html`);

export default class ToparticlePartController extends PartController {

    constructor(request: any) {
        super(request);
        this.name = name;
        this.type = type;
        this.viewFile = viewFile;
    }

    get() {
        var helper = new util.Util();
        if (this.config.toparticle != null){
            var toparticle = this.contentLib.get({ key: this.config.toparticle });
            this.model.heading = this.config.heading;
            this.model.text = helper.capitalizeFirstLetter((this.config.description) ? this.config.description : toparticle.data.mainintro);
            this.model.displayName = "Gå til " + (helper.lowercaseFirstLetter((toparticle.data.title) ? toparticle.data.title : toparticle.displayName));
            this.model.path = toparticle._path;
        }
        return super.get();
    }

    public static handleRequest(request: any) {
        return new ToparticlePartController(request).buildResponse().response;
    }

} // ExamplePartController

export const get = ToparticlePartController.handleRequest;
