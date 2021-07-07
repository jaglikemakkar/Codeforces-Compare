function addCompareTab() {
    const cfTabsList = $("#pageContent > div.second-level-menu > ul > li:nth-child(2)");
    const tab = document.createElement('li');
    const html = `<a href="#" id="compareBtn">Compare</a>`;
    tab.innerHTML = html;
    cfTabsList.after(tab);
}

function getPhaseStart(){
    var currDate = new Date();
    chrome.storage.sync.get("phaseStart", function(data){
        var phasePeriod = data.phaseStart || 100000;
        phasePeriod = eval(phasePeriod);
        var currSec = currDate.getTime() / 1000;
        var phaseSec = phasePeriod * 2628002.88;
        phaseStart = currSec - phaseSec;
        console.log(currSec, phaseSec, data);
    });
}

const compareBox = document.createElement("div");
compareBox.id = "compareBox";
var api_url = "https://codeforces.com/api/";
var handle1 = "";
var handle2 = "";
var conData1 = {};
var conData2 = {};
var subData1 = {};
var subData2 = {};
var phaseStart = getPhaseStart();
var req1, req2, req3, req4;

$(document).ready(function () {
    addCompareTab();

    handle1 = $("#header > div.lang-chooser > div:nth-child(2) > a:nth-child(1)").text();
    handle2 = $("#pageContent > div:nth-child(3) > div.userbox > div.info > div > h1 > a").text();
    compareUsers();
    const page = $("#pageContent");
    const compareBtn = $("#compareBtn");

    compareBtn.click(function () {
        page.find(".roundbox").remove();
        page.append(compareBox);
        $.when(req1, req2, req3, req4).then(function(){
            if (handle1 != handle2){
                addTimeline();
                addProblemRatings();
                addProblemLevels();
                // addProblemTags();
                addSubmissionLangs();
                // addSubmissionVerdicts();
                addAllProblems();
            }
            else{
                addSelfTimeline();
                addSelfProblemRatings();
                addSelfProblemLevels();
                // addSelfProblemTags();
                addSelfSubmissionLangs();
                // addSelfSubmissionVerdicts();
                addSelfAllProblems();
            }
        })
    });

})

function compareUsers() {

    req1 = $.get(api_url + 'user.rating', { handle: handle1 }, function (data, status) {
        console.log(data);
        conData1 = getContestStats(data);
    });
    if (handle1 != handle2){
        req2 = $.get(api_url + 'user.rating', { handle: handle2 }, function (data, status) {
            console.log(data);
            conData2 = getContestStats(data);
        })
    }

    $.when(req1, req2).then(function () {
        if (handle1 == handle2) addSelfConData();
        else addConData();
    })
    req3 = $.get(api_url + 'user.status', { handle: handle1 }, function (data, status){
        console.log(data);
        subData1 = getSubmissionsStats(data);
    })

    if (handle1 != handle2){
        req4 = $.get(api_url + 'user.status', { handle: handle2 }, function (data, status){
            console.log(data);
            subData2 = getSubmissionsStats(data);
        })
    }

    $.when(req3, req4).then(function(){
        if (handle1 == handle2) addSelfSubmissionsData();
        else addSubmissionsData();
    })
}