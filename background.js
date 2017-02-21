var googleTranslationBySlamId = "google-translation-by-slam";
var toLang = browser.i18n.getUILanguage();
var goToGoogleTranslate = function(data) {
    var text = data.shift();

    if (! text) {
        return;
    }

    browser.tabs.create({
        url: "https://translate.google.com/#en/" + toLang + "/" + text
    });
};

browser.contextMenus.create({
    id: googleTranslationBySlamId,
    title: "Google Translation (en -> " + toLang + ")",
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
        code: "window.prompt(\"Text to translate (en -> " + toLang + ")?\");"
    });

    executing.then(goToGoogleTranslate);
});
