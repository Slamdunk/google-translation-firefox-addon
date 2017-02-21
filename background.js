var googleTranslationBySlamId = "google-translation-by-slam";
var fromLang = "auto";
var toLang = browser.i18n.getUILanguage();
var goToGoogleTranslate = function(data) {
    var text = data.shift();

    if (! text) {
        return;
    }

    browser.tabs.create({
        url: "https://translate.google.com/#" + fromLang + "/" + toLang + "/" + text
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

    var executing = browser.tabs.executeScript(tab.id, {
        code: "window.prompt(\"Text to translate (" + fromLang + " -> " + toLang + ")?\");"
    });

    executing.then(goToGoogleTranslate);
});
