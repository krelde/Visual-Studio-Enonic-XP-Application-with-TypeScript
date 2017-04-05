import Controller = require("../xp/controller");
//TODO: Rewrite to namespace/module
export class Util {
    public isInt(value) {
        return !isNaN(value) &&
            parseInt(value) == value &&
            !isNaN(parseInt(value, 10));
    }

    public getFormattedDate(date) {
        var dateString = date.getDate();
        dateString += '. ' + this.getMonthName(date);
        dateString += ' ' + date.getFullYear();
        return dateString;
    };

    public getMonthName(date) {

        var month = date.getMonth();
        var monthName;

        switch (month) {
            case 0: monthName = 'januar';
                break;
            case 1: monthName = 'februar';
                break;
            case 2: monthName = 'mars';
                break;
            case 3: monthName = 'april';
                break;
            case 4: monthName = 'mai';
                break;
            case 5: monthName = 'juni';
                break;
            case 6: monthName = 'juli';
                break;
            case 7: monthName = 'august';
                break;
            case 8: monthName = 'september';
                break;
            case 9: monthName = 'oktober';
                break;
            case 10: monthName = 'november';
                break;
            case 11: monthName = 'desember';
                break;
        }

        return monthName;
    };

    public getSearchPage(controller: Controller.Controller) {
        var siteConfig = controller.siteConfig;
        var searchPageKey = siteConfig.searchPage;
        if (searchPageKey) {
            var searchContent = controller.contentLib.get({ key: searchPageKey });
            if (searchContent) {
                return searchContent._path;
            }
        }
        return controller.site._path + '/search';
    }

    public getNewsContainerPage(controller: Controller.Controller) {
        var siteConfig = controller.siteConfig;
        var newsContainer = siteConfig.newsContainerPage;
        if (newsContainer) {
            var newsContainerPageContent = controller.contentLib.get({ key: newsContainer });
            if (newsContainerPageContent) {
                return newsContainerPageContent;
            }
        }
        return "";
    }

    public capitalizeFirstLetter(string) {
        if (string == null || string.length == 0) {
            return string;
        }
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    public lowercaseFirstLetter(string) {
        if (string == null || string.length == 0) {
            return string;
        }
        return string.charAt(0).toLowerCase()+ string.slice(1);
    }

    public getImageURLs(image, width, height, controller: Controller.Controller) {
        if (image == null) {
            return;
        }
        return controller.portalLib.imageUrl({ id: image, scale: 'block(' + width + ',' + height + ')' });
    }

    public getMainBodyFirstP(str) {
        if (str != null) {
            var matches = str.match(/<p>[\S\s]*?<\/p>/gi);
            return matches[0].replace(/(<\/?[^>]+>)/gi, '');
        }
    }

    public getSystemPage(controller: Controller.Controller) {
        var siteConfig = controller.siteConfig;
        var systemPageKey = siteConfig.systemPage;
        if (systemPageKey) {
            var systemContent = controller.contentLib.get({ key: systemPageKey });
            if (systemContent) {
                return systemContent._path;
            }
        }
        return controller.site._path + '/system';
    }

    public removeLastDirectoryPartOf(path): string {
        var result = path.split('/');
        result.pop();
        return (result.join('/'));
    }
}