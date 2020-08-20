var googleTranslationBySlamId = "google-translation-by-slam";
var fromLang = "auto";
var toLang = browser.i18n.getUILanguage();

/*
 * Remove country code except for in zh-CN and zh-TW
 * (All other languages don't accept country code, as of Aug. 2020)
 */
var ccLangs = [
    "zh-CN",
    "zh-TW"
];

if (toLang.includes("-") && !ccLangs.includes(toLang)) {
    toLang = toLang.split("-")[0];
}

var goToGoogleTranslate = function(data) {
    var text = data.shift();

    if (! text) {
        return;
    }

    browser.tabs.create({
        url: "https://translate.google.com/#view=home&op=translate&sl=" + fromLang + "&tl=" + toLang + "&text=" + text
    });
};

browser.contextMenus.create({
    id: googleTranslationBySlamId,
    title: "Google Translation (" + fromLang + " -> " + toLang + ")",
    contexts: ["all"]
});

browser.contextMenus.onClicked.addListener(function(info, tab) {
    if (info.menuItemId !== googleTranslationBySlamId) {
        return;
    }

    var text = info.selectionText;

    if (text) {
        goToGoogleTranslate([text]);

        return;
    }

    var executing = browser.tabs.executeScript(
        tab.id,
        {
            code: "window.prompt(\"Text to translate (" + fromLang + " -> " + toLang + ")?\");"
        }
    );

    executing.then(goToGoogleTranslate);
});
