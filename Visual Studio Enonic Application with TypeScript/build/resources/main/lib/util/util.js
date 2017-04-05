"use strict";
//TODO: Rewrite to namespace/module
var Util = (function () {
    function Util() {
    }
    Util.prototype.isInt = function (value) {
        return !isNaN(value) &&
            parseInt(value) == value &&
            !isNaN(parseInt(value, 10));
    };
    Util.prototype.getFormattedDate = function (date) {
        var dateString = date.getDate();
        dateString += '. ' + this.getMonthName(date);
        dateString += ' ' + date.getFullYear();
        return dateString;
    };
    ;
    Util.prototype.getMonthName = function (date) {
        var month = date.getMonth();
        var monthName;
        switch (month) {
            case 0:
                monthName = 'januar';
                break;
            case 1:
                monthName = 'februar';
                break;
            case 2:
                monthName = 'mars';
                break;
            case 3:
                monthName = 'april';
                break;
            case 4:
                monthName = 'mai';
                break;
            case 5:
                monthName = 'juni';
                break;
            case 6:
                monthName = 'juli';
                break;
            case 7:
                monthName = 'august';
                break;
            case 8:
                monthName = 'september';
                break;
            case 9:
                monthName = 'oktober';
                break;
            case 10:
                monthName = 'november';
                break;
            case 11:
                monthName = 'desember';
                break;
        }
        return monthName;
    };
    ;
    Util.prototype.getSearchPage = function (controller) {
        var siteConfig = controller.siteConfig;
        var searchPageKey = siteConfig.searchPage;
        if (searchPageKey) {
            var searchContent = controller.contentLib.get({ key: searchPageKey });
            if (searchContent) {
                return searchContent._path;
            }
        }
        return controller.site._path + '/search';
    };
    Util.prototype.getNewsContainerPage = function (controller) {
        var siteConfig = controller.siteConfig;
        var newsContainer = siteConfig.newsContainerPage;
        if (newsContainer) {
            var newsContainerPageContent = controller.contentLib.get({ key: newsContainer });
            if (newsContainerPageContent) {
                return newsContainerPageContent;
            }
        }
        return "";
    };
    Util.prototype.capitalizeFirstLetter = function (string) {
        if (string == null || string.length == 0) {
            return string;
        }
        return string.charAt(0).toUpperCase() + string.slice(1);
    };
    Util.prototype.lowercaseFirstLetter = function (string) {
        if (string == null || string.length == 0) {
            return string;
        }
        return string.charAt(0).toLowerCase() + string.slice(1);
    };
    Util.prototype.getImageURLs = function (image, width, height, controller) {
        if (image == null) {
            return;
        }
        return controller.portalLib.imageUrl({ id: image, scale: 'block(' + width + ',' + height + ')' });
    };
    Util.prototype.getMainBodyFirstP = function (str) {
        if (str != null) {
            var matches = str.match(/<p>[\S\s]*?<\/p>/gi);
            return matches[0].replace(/(<\/?[^>]+>)/gi, '');
        }
    };
    Util.prototype.getSystemPage = function (controller) {
        var siteConfig = controller.siteConfig;
        var systemPageKey = siteConfig.systemPage;
        if (systemPageKey) {
            var systemContent = controller.contentLib.get({ key: systemPageKey });
            if (systemContent) {
                return systemContent._path;
            }
        }
        return controller.site._path + '/system';
    };
    Util.prototype.removeLastDirectoryPartOf = function (path) {
        var result = path.split('/');
        result.pop();
        return (result.join('/'));
    };
    return Util;
}());
exports.Util = Util;
//# sourceMappingURL=util.js.map