var list = document.querySelector("#listShow");
list.addEventListener("click", function () {
    chrome.storage.local.get(null, function (data) {
        var hideList = document.querySelector("#hideList");
        if (hideList.firstChild!=undefined){
            hideList.removeChild(hideList.firstChild);
        }
        hideList.appendChild(createListBlock(data));
    });
    /*chrome.storage.local.get("world", function (data) {
        console.log(data);
    });
    */
});

function createListBlock(data) {
    var table = document.createElement("table");

    var wordTr = document.createElement("tr");
    var wordTd = document.createElement("td");
    var wordListTd = document.createElement("td");
    wordTd.textContent = "word";
    wordListTd.textContent = data['word'];
    wordTr.appendChild(wordTd);
    wordTr.appendChild(wordListTd);

    table.appendChild(wordTr);
    return table
}


$("#add").on("click", function () {
    var select = document.querySelector("#select").value;
    var text = document.querySelector("#text").value;
    chrome.storage.local.get(null, function (data) {
        var update_data;
        if (data[select] == undefined) {
            update_data = [];
        } else {
            update_data = data[select];
        }
        if (!update_data.includes(text)) {
            update_data.push(text);
        } else {
            console.log("The string has already been inside.");
        }
        console.log(update_data);
        var input_data = {};
        input_data[select] = update_data;
        chrome.storage.local.set(input_data, function () {
            console.log("set");
            chrome.storage.local.get(select, function (data) {
                console.log(data);
            });
        });
    });
});

$("#del").on("click", function () {
    var select = document.querySelector("#select").value;
    var text = document.querySelector("#text").value;
    chrome.storage.local.get(null, function (data) {
        var update_data;
        if (data[select] == undefined) {
            update_data = [];
        } else {
            update_data = data[select];
        }
        if (update_data.indexOf(text)!=-1) {
            update_data.splice(update_data.indexOf(text),1);
        } else {
            console.log("The string is not inside.");
        }
        console.log(update_data);
        var input_data = {};
        input_data[select] = update_data;
        chrome.storage.local.set(input_data, function () {
            console.log("set");
            chrome.storage.local.get(select, function (data) {
                console.log(data);
            });
        });
    });
});





   