window.addEventListener('load', function () {
    chrome.runtime.sendMessage({
        from: "content"
    }, function () {
        console.log("send the request");
        changeListener();
    });
});




function changeListener() {
    if (document.querySelector(".chat-3bRxxu")) {
        var target = document.querySelector(".container-2lgZY8");
        var observer = new MutationObserver(function (mutations) {
            chrome.runtime.sendMessage({
                from: "content"
            }, function () {
                //console.log("DOM_changed");
            });
        });
        // configuration of the observer:
        var config = {
            subtree: true,
            attributes: true,
            childList: true,
            characterData: true
        };
        // pass in the target node, as well as the observer options
        observer.observe(target, config);
    } else {
        setTimeout(function () {
            changeListener();
        }, 500);
    }
}



chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        if (request.message != undefined) {
            waitForElementToDisplay(".message-2qnXI6", 500, request.message);
        }
        return true;
    }
);


function hide(prohibition) {
    var blocks = document.querySelectorAll(".message-2qnXI6");
    var sentence;
    var count = 0;
    while (count < blocks.length) {
        try {
            var sentence_block = blocks[count].children[0].children[2];
            sentence = sentence_block.textContent;
        } catch (e) {
            sentence = "No String";
        }
        
        if (prohibition.word != []) {
            for (var i = 0; i < prohibition.word.length; i++) {
                if (sentence.includes(prohibition.word[i])) {
                    blocks[count].style.display = "None";
                }
            }
        }
        count = count + 1;
    }
}


function waitForElementToDisplay(selector, time, prohibition) {
    if (document.querySelector(selector) != null) {
        hide(prohibition);
        return;
    } else {
        setTimeout(function () {
            waitForElementToDisplay(selector, time, prohibition);
        }, time);
    }
}