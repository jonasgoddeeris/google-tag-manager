<script>
  (function () {
    var translationChange;
    var htmlTag = document.getElementsByTagName('html')[0];


    function detectedLanguageChange(method, oldLanguage, newLanguage) {
        //prevent double firing
        if (translationChange === oldLanguage + '-' + newLanguage) {
            return
        }
        translationChange = oldLanguage + '-' + newLanguage;
        dataLayer.push({
            event: 'translateTrigger',
            translateFrom: oldLanguage,
            translateTo: newLanguage,
            detectionMethod: method
        })
    }

    //The code below checks if the lang attribute contains a '-x-mtfrom-'
    //Pages that are translated in Google Translate get a value like pt-x-mtfrom-nl (portuguese to dutch)
    if (htmlTag.lang.includes('-x-mtfrom-')) {
        var languages = htmlTag.lang.split('-x-mtfrom-');
        detectedLanguageChange('GoogleTranslate', languages[1], languages[0]);
    }

    // Detect Bing Translate or translatetheweb.com
    // They set a variable called BV
    if (typeof window.BV != "undefined") {
        if (typeof window.BV.strToLang == "string") {
            detectedLanguageChange('TranslateTheWeb', htmlTag.lang, window.BV.strToLang);
        }
    }

    //The code below checks for changes on the lang attribute on the html tag
    new MutationObserver(function(mutations) {
        mutations.forEach(function(mutation) {
            if (mutation.attributeName === 'lang') {
                if (mutation.oldValue !== mutation.target.lang) {
                    detectedLanguageChange('ChromeTranslate', mutation.oldValue, mutation.target.lang);
                }
            }
        });
    }).observe(htmlTag, {
        attributes: true,
        characterData: false,
        childList: false,
        subtree: false,
        attributeOldValue: true,
        characterDataOldValue: false
    });
})();

</script>
