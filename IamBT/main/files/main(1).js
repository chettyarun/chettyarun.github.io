similarproducts.Ads = {
    appDomain: spsupport.p.sfDomain,
    serverLayerFrame: null,
    showed: false,
    debug: false,
    bannersArray: '',
    view: {siteType:[]},

    startFlow: function () {

        this.bannersArray = JSON.parse('{"PetMatch":{"banners":[{"bannerName":"B1","LandingPage":"http://www.superfish.com/petmatch/?utm_source=WSInsite&utm_medium=Banner&utm_content=bannerB1&utm_campaign=PMInsite","addIcons":false},{"bannerName":"B2","LandingPage":"http://www.superfish.com/petmatch/?utm_source=WSInsite&utm_medium=Banner&utm_content=bannerB2&utm_campaign=PMInsite","addIcons":false},{"bannerName":"L1","LandingPage":"http://www.superfish.com/petmatch/?utm_source=WSInsite&utm_medium=Banner&utm_content=bannerL1&utm_campaign=PMInsite","addIcons":true},{"bannerName":"L2","LandingPage":"http://www.superfish.com/petmatch/?utm_source=WSInsite&utm_medium=Banner&utm_content=bannerL2&utm_campaign=PMInsite","addIcons":true}]}}');

        if (!this.showed && ( this.isInsiteWL() || this.isWordsExistsInDomain() )) {
            this.injectIframe();
        }
    },

    injectIframe: function () {
        var sb = similarproducts.b;
        sb.inj(document, this.appDomain + 'css/sfProdBan.css?v=' + sb.appVersion);

        spsupport.p.$(window).bind("message", this.Utils.serverMessagesRouter.bind(this));

        this.serverLayerFrame = spsupport.p.$('<iframe />', {
            style: 'position:absolute; width:0; height:0; left:-100px; top:-100px;',
            src: this.appDomain + 'sfProdBan/server_layer.html?version=' + sb.appVersion
        })[0];

        document.body.appendChild(this.serverLayerFrame);
        this.view.sessionId = this.generateSessionId();
    },

    processServerData: function (data) {
        this.log("in processServerData");
        var item;

        similarproducts.Template.initialize(data.template);

        this.needToBeShown();
    },

    log: function (msg) {
        if (this.debug && window.console) {
            var dDate = new Date();
            console.log(dDate.getTime() + " - client_layer - " + msg);
        }
    },

    generateSessionId: function () {
        var d = new Date();
        var result = [spsupport.p.userid.substr(0, 5), d.getDate(), d.getMonth() + 1, d.getFullYear(), d.getHours(), d.getMinutes(), d.getSeconds(), '-', d.getMilliseconds(), '-', Math.floor(Math.random() * 10001)];

        return result.join('');
    },

    isWordsExistsInDomain: function () {
            var findWords = [];
            var adsWordsExistsInDomain = similarproducts.b.adsEnableIfWordsExistsInDomain.replace(/\|/g, '\\b|\\b');
            var rKeywords = new RegExp('\\b' + adsWordsExistsInDomain + '\\b', 'gi');

            var title = similarproducts.Ads.TextExtractor.extract().documentTitle;
            var adsWordsExistsInTitle = title.match(rKeywords);
            if(adsWordsExistsInTitle){
                findWords.push(adsWordsExistsInTitle);
            }

            var h1 = similarproducts.Ads.TextExtractor.extract().h1;
            var adsWordsExistsInHeader = h1.match(rKeywords);
            if(adsWordsExistsInHeader){
                findWords.push(adsWordsExistsInHeader);
            }

            var documentMeta = similarproducts.Ads.TextExtractor.extract().documentMeta;
            var adsWordsExistsInMeta = documentMeta.match(rKeywords);
            if(adsWordsExistsInMeta){
                findWords.push(adsWordsExistsInMeta);
            }

            this.log("findWords : " + findWords);
            this.view.findWords = findWords;
            if(findWords.length > 0){
                if((Math.floor(Math.random() * 10) + 1) === 5){
                    this.view.siteType.push('pip');
                    return 1;
                } else {
                    this.view.siteType.push('pipNA');
                    return 0;
                }
            } else {
                return 0;
            }
    },

    needToBeShown: function ()
        {
            this.log("in needToBeShown");

            if (!this.showed) {
                this.log("needToBeShown call to activate");
                this.showed = true;
                this.render();
                this.defineViewElements();
                this.activate();
            }
        },
    isInsiteWL: function () {
            if(similarproducts.utilities.blacklistHandler.isInsiteWL() ||  similarproducts.utilities.blacklistHandler.isInsitePageWL()){
                this.view.siteType.push('wl');
                return 1;
            } else {
                this.log("is not InsiteWL");
                return 0;
            }
        },
    show: function ()
        {
            this.log("in show (category 60 called)");
            if (!this.showed) {
                this.view.siteType.push('category');
                this.log("show call to activate");
                this.injectIframe();
            } else {
                this.log("already showed or in BL");
            }
        },

    render: function () {
        spsupport.p.$('body').append(similarproducts.Template.render('adsMain', {
            adName: "App of the Day",
            parterName: "Pet Match"
        }));
    },

    defineViewElements: function () {
        this.view.self = spsupport.p.$('#sf-insite-search');
        this.view.banner = spsupport.p.$('#sf-insite-ad', this.view.self);
        this.view.closeButton = spsupport.p.$('.insite-close-button', this.view.self);
        this.view.closeInfoButton = spsupport.p.$('.insite-info-close-button', this.view.self);
        this.view.infoButton = spsupport.p.$('.insite-title', this.view.self);
        this.view.disableButton = spsupport.p.$('.insite-disable-button', this.view.self);
        this.view.itunesButton = spsupport.p.$('#sf-insite-ad-button-itunes', this.view.self);
        this.view.googlePlayButton = spsupport.p.$('#sf-insite-ad-button-google-play', this.view.self);
        this.view.findWords = [];
    },

    activate: function () {
        if(!this.bannersArray && !this.bannersArray.PetMatch){
           this.log("fail to load banners");
           return;
        }
        similarproducts.sfdebugger.log('Ads showed.');
        var numOfBanners = this.bannersArray.PetMatch.banners.length;

//        this.view.bannerId = (Math.floor(Math.random() * numOfBanners));
        this.view.bannerId = 2;
        this.view.showButtons = this.bannersArray.PetMatch.banners[this.view.bannerId].addIcons;
        this.view.bannerName = this.bannersArray.PetMatch.banners[this.view.bannerId].bannerName;
        this.view.bannerLandingPage = this.bannersArray.PetMatch.banners[this.view.bannerId].LandingPage;

        var backgroundUrl = this.appDomain + "images/ads/" + this.view.bannerName + ".png";

        this.view.banner.css("background","url(" + backgroundUrl + ")");

        if(this.view.showButtons){
            spsupport.p.$('#sf-insite-ad-buttons').css('display','block');
        }

        this.view.infoButton.click(this.showInfo.bind(this));
        this.view.closeInfoButton.click(this.showInfo.bind(this));
        this.view.closeButton.click(this.closeUnit.bind(this));
        this.view.disableButton.click(this.disableUnit.bind(this));
        this.view.banner.click(this.bannerClick.bind(this));
        this.view.itunesButton.click(this.itunesButtonClick.bind(this));
        this.view.googlePlayButton.click(this.googlePlayButtonClick.bind(this));
        this.log("**** sf-insite-search : " + (spsupport.p.$('#sf-insite-search').length > 0 ? 'Exists' : 'Not Exists'));
        spsupport.p.$('#sf-insite-search').css('display','block');
        this.reportAction({
            action: 'ads Showed',
            dscr:this.view.findWords.join('|')
        });
    },

    bannerClick: function () {
        this.log("bannerClick : " + this.view.bannerId);
        this.reportAction({
            action: 'ads Clicked',
            target_merchant:this.view.bannerLandingPage
        });
        if(!this.debug)
            window.open(this.view.bannerLandingPage,this.view.sessionId);
    },

    itunesButtonClick: function (event) {

        event.stopPropagation();

        this.log("itunesButtonClick : " + this.view.bannerId);
        var redirectURL = 'https://itunes.apple.com/us/app/petmatch/id857946616';
        this.reportAction({
            action: 'ads Clicked',
            target_merchant:redirectURL
        });
        if(!this.debug)
            window.open(redirectURL,this.view.sessionId + '_play');
    },

    googlePlayButtonClick: function (event) {

        event.stopPropagation();

        this.log("googlePlayButtonClick : " + this.view.bannerId);
        var redirectURL = 'https://play.google.com/store/apps/details?id=com.superfish.petmatchapp';
        this.reportAction({
            action: 'ads Clicked',
            target_merchant:redirectURL
        });
        if(!this.debug)
            window.open(redirectURL,this.view.sessionId + '_google');
    },

    closeUnit: function (callback) {
        this.log("in closeUnit");

        this.reportAction({
            action: 'ads Closed'
        });

        this.view.self.remove();
    },

    showInfo: function () {
        this.log("in ShowInfo");
        if(!this.view.showInfo)  {
            this.reportAction({
                action: 'ads Info'
            });

            this.view.showInfo = 1;
        }
        spsupport.p.$('#insite-info').toggle();
    },

    disableUnit: function () {
        this.Utils.sendMessageToServerLayer('disableUnit', 'sf_uninstall_ads');

        this.reportAction({
            action: 'ads Disabled'
        });

        this.view.self.remove();
    },

    reportAction: function (data) {
        var pixel = new Image();
        var reportParamsString;

        data.userid = spsupport.p.userid;
        data.sessionid = this.view.sessionId;
        data.browser = spsupport.api.dtBr();
        data.page_url = window.location.href;
        data.siteType = this.view.siteType.join('|');
        data.source_id = this.view.bannerId;

        data.merchantName = spsupport.p.siteDomain;
        data.dlsource = similarproducts.b.dlsource;
        data.country = similarproducts.b.userData.uc;

        reportParamsString = this.Utils.compileQueryString(data);
        reportParamsString += similarproducts.utilities.abTestUtil && similarproducts.utilities.abTestUtil.getDataString() || '';

        this.log("reportAction - " + this.appDomain + 'trackSession.action?' + reportParamsString);
        pixel.src = this.appDomain + 'trackSession.action?' + reportParamsString;
    }
};


similarproducts.Ads.Utils = {
    compileQueryString: function (obj) {
        var result = [];

        for (key in obj) {
            if (obj.hasOwnProperty(key)) {
                result.push(key + '=' + encodeURIComponent(obj[key]));
            }
        }

        return result.join('&');
    },

    concatObjects: function () {
        var result = {};
        var obj;

        for (var i = 0, l = arguments.length; i < l; i++) {
            obj = arguments[i];

            for (var key in obj) {
                obj.hasOwnProperty(key) && (result[key] = obj[key]);
            }
        }

        return result;
    },

    serverMessagesRouter: function (event) {
        var data = event.originalEvent.data.split('__similarproductsAdsNamespaceMarker')[1];

        data = data && JSON.parse(data) || null;

        if (data && typeof this[data.fn] === 'function') {
            this[data.fn](data.data);
        }
    },

    sendMessageToServerLayer: function (fn, data) {
        var targetWindow = similarproducts.Ads.serverLayerFrame.contentWindow || similarproducts.Ads.serverLayerFrame;
        var message = {
            fn: fn,
            data: data
        };

        targetWindow.postMessage('__similarproductsAdsNamespaceMarker' + JSON.stringify(message), '*');
    }
};


similarproducts.Ads.TextExtractor = {
    extract: function () {
        var result = {
            documentTitle: document.title || '',
            documentMeta: this.extractFromMetaTags(''),
            h1: this.extractFromH1('')
        };

        return result;
    },

    extractFromMetaTags: function () {
        var metaTags;
        var metaTag;
        var metaTagProperty;
        var metaTagContent = '';
        var tagRegex = /og:title|og:description/i;

        metaTags = document.getElementsByTagName('meta') || '';

        for (var i = 0, l = metaTags.length; i < l; i++) {
            metaTag = metaTags[i];
            metaTagProperty = metaTag.getAttribute('property');

            if (metaTagProperty && metaTagProperty.search(tagRegex) !== -1) {
                metaTagContent = metaTag.getAttribute('content');

                if (metaTagContent) {
                    return metaTagContent;
                }
            }
        }

        return metaTagContent;
    },

    extractFromH1: function (headerRegex) {
        var headers;
        var header = '';

        headers = document.getElementsByTagName('h1') || '';

        for (var i = 0, l = headers.length; i < l; i++) {
            header += ' ' + headers[i].textContent;

            if (headerRegex.length > 0 && headers[i].textContent.search(headerRegex) !== -1) {
                return headers[i].textContent.replace(/\s+/gim, ' ');
            }
        }

        return header;
    }
};

similarproducts.Ads.startFlow();

