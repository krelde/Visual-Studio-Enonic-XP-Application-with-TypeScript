var portalLib = require('/lib/xp/portal');
var httpClient = require('/lib/xp/http-client');
exports.get = handleGet;

function handleGet(req) {

    var params = parseparams(req.params);

    var body = createresults(getItems(), params);

    return {
        contentType: 'application/json',
        body: body
    }
}

function getItems() {
    var result = [];
    var response = httpClient.request({
        url: 'https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css',
        method: 'GET',
        connectTimeout: 5000,
        readTimeout: 10000
    });

    var matchResult = response.body.match(/\.fa-[A-Za-z0-9\-\_]+:before/g);
    var iconWrapper = "<div class='icon-wrapper' data-icon='fa {fa-class}'><span><i class='fa {fa-class}'></i>{display-name}</span></div>";
    for (var i = 0; i < matchResult.length; i++) {
        matchResult[i] = matchResult[i].replace(".", "").replace(":before", "");
        result.push({
            id: matchResult[i],
            displayName: matchResult[i],
            description: matchResult[i],
            icon: {
                data: iconWrapper.replace("{fa-class}", matchResult[i]).replace("{fa-class}", matchResult[i]).replace("{display-name}", matchResult[i].replace("fa-", ""))
            }

        });
        //log.info(JSON.stringify(o));
    }
    return result;

    //log.info(JSON.stringify(result));

    //return [{
    //    id: "TEXT ID",
    //    displayName: "Option number 1",
    //    description: "External SVG file is used as icon",
    //    iconUrl: portalLib.assetUrl({ path: 'images/number_1.svg' }),
    //    icon: null
    //}, {
    //    id: "TEXT ID2",
    //    displayName: "Option number 2",
    //    description: "Inline SVG markup is used as icon",
    //    iconUrl: null,
    //    icon: {
    //        data: '<svg version="1.1" xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 32 32"><path fill="#000" d="M16 3c-7.18 0-13 5.82-13 13s5.82 13 13 13 13-5.82 13-13-5.82-13-13-13zM16 27c-6.075 0-11-4.925-11-11s4.925-11 11-11 11 4.925 11 11-4.925 11-11 11zM17.564 17.777c0.607-0.556 1.027-0.982 1.26-1.278 0.351-0.447 0.607-0.875 0.77-1.282 0.161-0.408 0.242-0.838 0.242-1.289 0-0.793-0.283-1.457-0.848-1.99s-1.342-0.8-2.331-0.8c-0.902 0-1.654 0.23-2.256 0.69s-0.96 1.218-1.073 2.275l1.914 0.191c0.036-0.56 0.173-0.96 0.41-1.201s0.555-0.361 0.956-0.361c0.405 0 0.723 0.115 0.952 0.345 0.23 0.23 0.346 0.56 0.346 0.988 0 0.387-0.133 0.779-0.396 1.176-0.195 0.287-0.727 0.834-1.592 1.64-1.076 0.998-1.796 1.799-2.16 2.403s-0.584 1.242-0.656 1.917h6.734v-1.781h-3.819c0.101-0.173 0.231-0.351 0.394-0.534 0.16-0.183 0.545-0.552 1.153-1.109z"></path></svg>',
    //        type: "image/svg+xml"
    //    }
    //}];
}

function parseparams(params) {

    var query = params['query'],
        ids, start, count;

    try {
        ids = JSON.parse(params['ids']) || []
    } catch (e) {
        log.warning('Invalid parameter ids: %s, using []', params['ids']);
        ids = [];
    }

    try {
        start = Math.max(parseInt(params['start']) || 0, 0);
    } catch (e) {
        log.warning('Invalid parameter start: %s, using 0', params['start']);
        start = 0;
    }

    try {
        count = 100;
    } catch (e) {
        log.warning('Invalid parameter count: %s, using 15', params['count']);
        count = 15;
    }

    return {
        query: query,
        ids: ids,
        start: start,
        end: start + count,
        count: count
    }
}

function createresults(items, params, total) {

    var body = {};

    items.unshift({
        id: "DO NOT USE",
        displayName: "DO NOT USE",
        icon: {
            //data: "<script src='http://enonic.test/_/asset/com.company.vts:1490952359/scripts/vts.js'/>"
            data: "<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'/>"
        }

    });

    var hitCount = 0, include;
    body.hits = items.sort(function (hit1, hit2) {
        
        if (!hit1 || !hit2) {
            return !!hit1 ? 1 : -1;
        }
        return hit1.displayName.localeCompare(hit2.displayName);
    }).filter(function (hit) {
        include = true;
      
        if (!!params.ids && params.ids.length > 0) {
            include = params.ids.some(function (id) {
                return id == hit.id;
            });
        } else if (!!params.query && params.query.trim().length > 0) {
           
            var qRegex = new RegExp(params.query, 'i');
            include = qRegex.test(hit.displayName) || qRegex.test(hit.description) || qRegex.test(hit.id);
        }

        if (include) {
        
            hitCount++;
          
        }
        return include && hitCount > params.start && hitCount <= params.end;
    });
   
    body.count = Math.min(params.count, body.hits.length);
   
    body.total = params.query ? hitCount : (total || items.length);
    var cssInResult = body.hits.some(function (hit) {
        return hit.id === "DO NOT USE";
    });


    if (!cssInResult) {
        body.hits.unshift({
            id: "DO NOT USE",
            displayName: "DO NOT USE",
            icon: {
                //data: "<script src='http://enonic.test/_/asset/com.company.vts:1490952359/scripts/vts.js'/>"
                data: "<link rel='stylesheet' href='https://maxcdn.bootstrapcdn.com/font-awesome/4.7.0/css/font-awesome.min.css'/>"
            }

        });
    }
    
    return body;
}
function makeid() {
    var text = "";
    var possible = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789";

    for (var i = 0; i < 5; i++)
        text += possible.charAt(Math.floor(Math.random() * possible.length));

    return text;
}