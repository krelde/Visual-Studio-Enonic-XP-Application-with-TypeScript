//'use strict';
///// <reference path="./global.d.ts" />
// Importing gradle dependencies via TS or ES2015 gives:
// error TS2307: Cannot find module 'xp/thymeleaf'
// So going old school:
"use strict";
//TODO: Remove old school require
var libs = {
    xp: {
        portal: require('xp/portal'),
        content: require('/lib/xp/content')
    }
};
var appPath = app.name;
var rappPath = appPath.replace(/\./g, '-');
var Menu = (function () {
    function Menu() {
    }
    /**
 * Get menu tree
 * @param {integer} levels - menu levels to get
 * @returns {Array}
 */
    Menu.prototype.getMenuTree = function (levels) {
        var menu = [];
        var site = libs.xp.portal.getSite();
        //log.info(site);
        levels = (this.isInt(levels) ? levels : 1);
        //log.info(levels);
        if (site) {
            menu = this.getSubMenus(site, levels);
        }
        return menu;
    };
    ;
    /**
 * Returns submenus of a parent menuitem.
 * @param {Content} parentContent - content object obtained with 'portal.getContent', 'portal.getSite' or any 'content.*' commands
 * @param {Integer} levels - The number of submenus to retrieve
 * @return {Array} Array of submenus
 */
    Menu.prototype.getSubMenus = function (parentContent, levels) {
        var subMenus = [];
        if (parentContent.type === 'portal:site' && this.isMenuItem(parentContent)) {
            subMenus.push(this.menuItemToJson(parentContent, 0));
        }
        var children = libs.xp.content.getChildren({
            key: parentContent._id,
            count: 200
        });
        levels--;
        var loopLength = children.hits.length;
        for (var i = 0; i < loopLength; i++) {
            var child = children.hits[i];
            if (this.isMenuItem(child)) {
                subMenus.push(this.menuItemToJson(child, levels));
            }
        }
        return subMenus;
    };
    ;
    /**
 * Checks if the content is a menu item.
 * @param {Content} content - content object obtained with 'portal.getContent', 'portal.getSite' or any 'content.*' commands
 * @return {Boolean} true if the content is marked as menu item
 */
    Menu.prototype.isMenuItem = function (content) {
        var extraData = content.x;
        if (!extraData) {
            return false;
        }
        var extraDataModule = extraData[rappPath];
        if (!extraDataModule || !extraDataModule['menu-item']) {
            return false;
        }
        var menuItemMetadata = extraDataModule['menu-item'] || {};
        return menuItemMetadata['menuItem'];
    };
    /**
 * Returns JSON data for a menuitem.
 * @param {Content} content - content object obtained with 'portal.getContent', 'portal.getSite' or any 'content.*' commands
 * @param {Integer} levels - The number of submenus to retrieve
 * @return {Object} Menuitem JSON data
 */
    Menu.prototype.menuItemToJson = function (content, levels) {
        var subMenus = [];
        if (levels > 0) {
            subMenus = this.getSubMenus(content, levels);
        }
        var inPath = false;
        var isActive = false;
        var currentContent = libs.xp.portal.getContent();
        // Is the menuitem we are processing in the currently viewed content's path?
        if (content._path == currentContent._path.substring(0, content._path.length)) {
            inPath = true;
        }
        // Is the currently viewed content the current menuitem we are processing?
        if (content._path == currentContent._path) {
            isActive = true;
            inPath = false; // Reset this so an menuitem isn't both in a path and active (makes no sense)
        }
        var menuItem = content.x[rappPath]['menu-item'];
        return {
            displayName: content.displayName,
            menuName: menuItem.menuName && menuItem.menuName.length ? menuItem.menuName : null,
            path: content._path,
            name: content._name,
            id: content._id,
            hasChildren: subMenus.length > 0,
            inPath: inPath,
            isActive: isActive,
            newWindow: menuItem.newWindow ? menuItem.newWindow : false,
            type: content.type,
            children: subMenus
        };
    };
    Menu.prototype.generateBreadcrumb = function (path, breadcrumb) {
        if (!breadcrumb) {
            breadcrumb = [];
        }
        var currentContent = libs.xp.portal.getContent();
        if (path == currentContent._path) {
            breadcrumb.push({
                name: currentContent.displayName,
                path: currentContent._path,
                isActive: true
            });
            path = path.substring(0, path.lastIndexOf('/'));
        }
        var content = libs.xp.content.get({
            key: path
        });
        if (content.type != "portal:site") {
            breadcrumb.push({
                name: content.displayName,
                path: content._path,
                isActive: false
            });
            this.generateBreadcrumb(path.substring(0, path.lastIndexOf('/')), breadcrumb);
        }
        else {
            breadcrumb.push({
                name: content.displayName,
                path: content._path,
                isActive: false
            });
        }
        return breadcrumb;
    };
    Menu.prototype.isActive = function (content) {
        var currentContent = libs.xp.portal.getContent();
        if (content._path == currentContent._path) {
            return true;
        }
        return false;
    };
    /**
     * Check if value is integer
     * @param value
     * @returns {boolean}
     */
    Menu.prototype.isInt = function (value) {
        return !isNaN(value) &&
            parseInt(value) == value &&
            !isNaN(parseInt(value, 10));
    };
    return Menu;
}());
exports.Menu = Menu;
//# sourceMappingURL=menu.js.map