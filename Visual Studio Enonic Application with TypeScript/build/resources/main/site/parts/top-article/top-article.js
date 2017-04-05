'use strict';
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/// <reference path="../../lib/xp/global.ts" />
var controller_1 = require("../../../lib/xp/part/controller");
var util = require("../../../lib/util/util");
var name = 'top-article';
var type = 'part';
var viewFile = resolve(name + ".html");
var ToparticlePartController = (function (_super) {
    __extends(ToparticlePartController, _super);
    function ToparticlePartController(request) {
        var _this = _super.call(this, request) || this;
        _this.name = name;
        _this.type = type;
        _this.viewFile = viewFile;
        return _this;
    }
    ToparticlePartController.prototype.get = function () {
        var helper = new util.Util();
        if (this.config.toparticle != null) {
            var toparticle = this.contentLib.get({ key: this.config.toparticle });
            this.model.heading = this.config.heading;
            this.model.text = helper.capitalizeFirstLetter((this.config.description) ? this.config.description : toparticle.data.mainintro);
            this.model.displayName = "Gå til " + (helper.lowercaseFirstLetter((toparticle.data.title) ? toparticle.data.title : toparticle.displayName));
            this.model.path = toparticle._path;
        }
        return _super.prototype.get.call(this);
    };
    ToparticlePartController.handleRequest = function (request) {
        return new ToparticlePartController(request).buildResponse().response;
    };
    return ToparticlePartController;
}(controller_1.PartController)); // ExamplePartController
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = ToparticlePartController;
exports.get = ToparticlePartController.handleRequest;
//# sourceMappingURL=top-article.js.map