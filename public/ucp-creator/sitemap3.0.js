Evergage.init().then(() => {
    var config = {
        global: {
            contentZones: []
        },
        pageTypes: []
    };
    
    // This section will globally set any parameters as user attributes. 
    
    config.global.onActionEvent = function(event) {
        
        if (!event.user) {
            event.user = {};
        }
        
        // This uses Sam's code to only look at the the 2 params and Aaron is hardcoding to 2 specific attributes userId and kuID
        // userId is an email address in our demos. Feel free to change kuid to whatever attribute you want.
        // querystring params can be whatever you want in this model but need to go in order. ie. userId is param 1, kuID is param 2
        let urlParam = (pos) => {
            let qs = window.location.href.split('?')[1].split("&")
            qs.forEach(function(part, i) {
                this[i] = this[i].substring(this[i].indexOf("=") + 1)
            }, qs);
            return qs[pos];
        }
        if (window.location.href.split('?')[1]){
            const qsMapping = { param1:urlParam(0),param2:urlParam(1)}
            event.user.id = qsMapping.param1;
            event.user.attributes = { kuID: qsMapping.param2 };
        }  
            
        
        // TACO team - requires QS and that they have exact match.
        // Make sure the attributes are created with the same name as the parameter
        // let url = window.location.href;
        // let parser = document.createElement('a');
        // parser.href = url;
        // let searchParams = parser.search.substring(1);
        // if (searchParams) {
        //     event.user.attributes = event.user.attributes || {};
        //     let searchParamsSplit = searchParams.split("&");
        //     for (var i = 0; i < searchParamsSplit.length; i++) {
        //         let paramSplit = searchParamsSplit[i].split('=');
        //         if (paramSplit[0] === "id") {
        //             event.user.id = paramSplit[0];
        //         } else {
        //             event.user.attributes[paramSplit[0]] = decodeURIComponent(paramSplit[1]);
        //         }
        //     }
        // }
        return event;
    }

    // Fill out any page types for you demo here. These are key value pairs, where the key (before the colon)
    // is the action name that will be sent in the event when navigating to the url (after the colon). Copy
    // the entire url from the browser (including the https and www) that you want to map

    const pageTypeMapping = {
        "Page Name 1": "https://www.northerntrailoutfitters.com/default/homepage",
        "Page Name 2": "https://www.salesforce.com",
    };
    
    
    // Fill out any actions for your demo here. These are key value pairs, where the key (before the colon)
    // is the action name that will be sent in the event when the selector (after the colon) is clicked on the page

    const actionMappingClicks = {
        "Action 1": "#selector1",
        "Action 2": "#selector2",
    };

    // Fill out any content zones for your demo here. These are key value pairs, where the key (before the colon)
    // is the content zone name that will be defined on the page when the selector (after the colon) appears on that page

    const contentZoneMapping = {
        "Content Zone 1": "#selector1",
        "Content Zone 2": "#selector2"
    };
    
    // HELPER CODE BELOW - DO NOT EDIT
    
    // The code below handles all of the page types that are defined in the pageTypeMapping object above

    Object.keys(pageTypeMapping).forEach(pageType => {
        const url = pageTypeMapping[pageType];
        const re = new RegExp("^" + url);
        config.pageTypes.push({
            isMatch: () => {
                return re.test(window.location.href);
            },
            name: pageType,
            action: pageType
        });
    });


    // If no pages are matched from pageTypeMapping, then an event will be sent with an "Unmapped Page" page type 

    config.pageTypes.push({
        isMatch: () => true,
        name: "Unmapped Page",
        action: "Unmapped Page"
    });

    // The code below handles all of the actions that are defined in the actionMappingClicks object above

    Object.keys(actionMappingClicks).forEach(action => {
        const selector = actionMappingClicks[action];
        Evergage.cashDom(selector).on("click", () => {
            Evergage.sendEvent({action});
        });
    });

    // The code below handles all of the content zones that are defined in the contentZonesMapping object above

    Object.keys(contentZoneMapping).forEach(contentZone => {
        const selector = contentZoneMapping[contentZone];
        config.global.contentZones.push({name: contentZone, selector: selector});
    });

    
    Evergage.cashDom(() => {
        Evergage.initSitemap(config);
    });
});