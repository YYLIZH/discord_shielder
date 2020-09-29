chrome.runtime.onMessage.addListener(function (request, sender, sendresponse) {
    if (request.from == "content") {
        chrome.storage.local.get(null, function (data) {
            console.log(data['name']);
            chrome.tabs.query({
                active: true,
                currentWindow: true
            }, function (tabs) {
                chrome.tabs.sendMessage(tabs[0].id, {
                    message: data
                });
            });

        });
    }
    return true;
});