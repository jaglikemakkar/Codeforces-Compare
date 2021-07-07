$(function () {
    chrome.storage.sync.get("phaseStart", function (data) {
        $("#phaseStart").text(data.phaseStart);
    })

    $("#changePhaseStart").click(function () {
        chrome.storage.sync.get("phaseStart", function () {
            const newPhaseStart = $("#newPhaseStart").val();
            chrome.storage.sync.set({ phaseStart: newPhaseStart });
            $("#phaseStart").text(newPhaseStart);
            $("newPhaseStart").val("");
        })
    })
});