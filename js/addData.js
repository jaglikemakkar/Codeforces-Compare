function addConData() {
    var contestDataDiv = document.createElement('div');
    contestDataDiv.id = "contestDataDiv";
    contestDataDiv.className = "dataDiv";

    var contestDataHeading = document.createElement('h3');
    contestDataHeading.className = "divHeading";
    contestDataHeading.innerText = "Contests Data";
    contestDataDiv.appendChild(contestDataHeading)

    var table = document.createElement('table');
    table.id = "contestDataTable";
    table.className = "dataTable";
    var html = `
        <tr>
            <th>Handle</th>
            <th>${handle1}</th>
            <th>${handle2}</th>
        </tr>
        <tr>
            <td>Rating</td>
            <td>${conData1.rating}</td>
            <td>${conData2.rating}</td>
        </tr>
        <tr>
            <td>Max Rating</td>
            <td>${conData1.maxRating}</td>
            <td>${conData2.maxRating}</td>
        </tr>
        <tr>
            <td>Min Rating</td>
            <td>${conData1.minRating}</td>
            <td>${conData2.minRating}</td>
        </tr>
        <tr>
            <td>Best Rank</td>
            <td>${conData1.best} <a href="https://codeforces.com/contest/${conData1.bestCon}">(${conData1.bestCon})</a></td>
            <td>${conData2.best} <a href="https://codeforces.com/contest/${conData2.bestCon}">(${conData2.bestCon})</a></td>
        </tr>
        <tr>
            <td>Worst Rank</td>
            <td>${conData1.worst} <a href="https://codeforces.com/contest/${conData1.worstCon}">(${conData1.worstCon})</a></td>
            <td>${conData2.worst} <a href="https://codeforces.com/contest/${conData2.worstCon}">(${conData2.worstCon})</a></td>
        </tr>
        <tr>
            <td>Max Up</td>
            <td>${conData1.maxUp} <a href="https://codeforces.com/contest/${conData1.maxUpCon}">(${conData1.maxUpCon})</a></td>
            <td>${conData2.maxUp} <a href="https://codeforces.com/contest/${conData2.maxUpCon}">(${conData2.maxUpCon})</a></td>
        </tr>
        <tr>
            <td>Max Down</td>
            <td>${conData1.maxDown} <a href="https://codeforces.com/contest/${conData1.maxDownCon}">(${conData1.maxDownCon})</a></td>
            <td>${conData2.maxDown} <a href="https://codeforces.com/contest/${conData2.maxDownCon}">(${conData2.maxDownCon})</a></td>
        </tr>
    `
    table.innerHTML = html;
    contestDataDiv.appendChild(table);
    compareBox.appendChild(contestDataDiv);
}

function addSubmissionsData() {
    var subDataDiv = document.createElement('div');
    subDataDiv.id = "subDataDiv";
    subDataDiv.className = "dataDiv";
    var subDataHeading = document.createElement('h3');
    subDataHeading.className = "divHeading";
    subDataHeading.innerText = "Submissions Data";
    subDataDiv.appendChild(subDataHeading)

    var table = document.createElement('table');
    table.id = "subDataTable";
    table.className = "dataTable";

    var html = `
        <tr>
            <th>Handle</th>
            <th>${handle1}</th>
            <th>${handle2}</th>
        </tr>
        <tr>
            <td>Solved</td>
            <td>${subData1.solved}</td>
            <td>${subData2.solved}</td>
        </tr>
        <tr>
            <td>Tried</td>
            <td>${subData1.tried}</td>
            <td>${subData2.tried}</td>
        </tr>
        <tr>
            <td>Total Submissions</td>
            <td>${subData1.totalSub}</td>
            <td>${subData2.totalSub}</td>
        </tr>
        <tr>
            <td>Average Attemps</td>
            <td>${subData1.avgSub}</td>
            <td>${subData2.avgSub}</td>
        </tr>
        <tr>
            <td>Max Attemps</td>
            <td>${subData1.maxAttempts[0]} <a href="https://codeforces.com/contest/${subData1.maxAttempts[1].split('-')[0]}/problem/${subData1.maxAttempts[1].split('-')[1]}">${subData1.maxAttempts[1]}</a></td>
            <td>${subData2.maxAttempts[0]} <a href="https://codeforces.com/contest/${subData2.maxAttempts[1].split('-')[0]}/problem/${subData2.maxAttempts[1].split('-')[1]}">${subData2.maxAttempts[1]}</a></td>
        </tr>
        <tr>
            <td>Solved with 1 submission</td>
            <td>${subData1.oneSub}</td>
            <td>${subData2.oneSub}</td>
        </tr>
    `
    table.innerHTML = html;
    subDataDiv.appendChild(table);
    compareBox.appendChild(subDataDiv);
}

function addTimeline() {
    var timelineDiv = document.createElement('div');
    timelineDiv.id = "timelineDiv";
    timelineDiv.className = "outerDiv";

    var html = `
        <h3 class="divHeading">Timeline</h3>
        <canvas id="timeline" class="fullChart"></canvas>
    `

    timelineDiv.innerHTML = html;
    compareBox.appendChild(timelineDiv);


    var labels = []
    var handle1Data = []
    var handle2Data = []
    var timeline1 = conData1.timeline;
    var timeline2 = conData2.timeline;

    function convertDate(inputFormat) {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        var d = new Date(inputFormat)
        return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
    }

    var i = 0, j = 0;
    while (i < timeline1.length && j < timeline2.length) {
        if (Math.abs(timeline1[i][0] - timeline2[j][0]) < 7200) {
            labels.push(convertDate(new Date(timeline1[i][0] * 1000)));
            handle1Data.push(timeline1[i][1]);
            handle2Data.push(timeline2[j][1]);
            i++; j++;
        }
        else if (timeline1[i][0] < timeline2[j][0]) {
            labels.push(convertDate(new Date(timeline1[i][0] * 1000)));
            handle1Data.push(timeline1[i][1]);
            handle2Data.push(null);
            i++;
        }
        else {
            labels.push(convertDate(new Date(timeline2[j][0] * 1000)));
            handle1Data.push(null);
            handle2Data.push(timeline2[j][1]);
            j++;
        }
    }

    while (i < timeline1.length) {
        labels.push(convertDate(new Date(timeline1[i][0] * 1000)));
        handle1Data.push(timeline1[i][1]);
        handle2Data.push(null);
        i++;
    }

    while (j < timeline2.length) {
        labels.push(convertDate(new Date(timeline2[j][0] * 1000)));
        handle1Data.push(null);
        handle2Data.push(timeline2[j][1]);
        j++;
    }

    var cdata = {
        type: 'line',
        data: {
            labels: labels,
            datasets: [
                {
                    data: handle1Data,
                    label: handle1,
                    borderColor: "#3e95cd",
                    fill: false,
                    borderWidth: 2
                },
                {
                    data: handle2Data,
                    label: handle2,
                    borderColor: "#c45850",
                    fill: false,
                    borderWidth: 2
                }
            ]
        },
        options: {
            title: {
                display: true,
                text: 'Timeline'
            },
            spanGaps: true,
            scales: {
                x: {
                    ticks: {
                        autoSkip: true,
                        maxTicksLimit: 7,
                        maxRotation: 0
                    }
                }
            },
            responsive: true,
        }
    }

    new Chart(document.getElementById("timeline"), cdata);
}


function addProblemRatings() {
    var pRatingsDiv = document.createElement('div');
    pRatingsDiv.id = "pRatingsDiv";
    pRatingsDiv.className = "outerDiv";

    var html = `
        <h3 class="divHeading">Problem Ratings</h3>
        <canvas id="pRatings" class="fullChart"></canvas>
    `

    pRatingsDiv.innerHTML = html;
    compareBox.appendChild(pRatingsDiv);

    var ratings = []
    for (var i in subData1.rating) ratings.push(i);
    for (var i in subData2.rating) ratings.push(i);
    ratings = [...new Set(ratings)];

    ratings.sort(function (a, b) { return b - a });

    var data1 = []
    var data2 = []
    for (var i = 0; i < ratings.length; i++) {
        var cr = ratings[i]
        if (cr in subData1.rating) {
            data1.push(subData1.rating[cr]);
        }
        else {
            data1.push(0);
        }
        if (cr in subData2.rating) {
            data2.push(subData2.rating[cr]);
        }
        else {
            data2.push(0);
        }
    }

    var cdata = {
        type: 'bar',
        data: {
            labels: ratings,
            datasets: [
                {
                    label: handle1,
                    backgroundColor: "#3e95cd",
                    data: data1
                },
                {
                    label: handle2,
                    backgroundColor: "#c45850",
                    data: data2
                }
            ]
        },
        options: {
            title: {
                display: true,
                text: "Problem ratings of " + handle1 + " and " + handle2
            },
            responsive: true
        }
    }

    new Chart(document.getElementById("pRatings"), cdata);
}

function addProblemLevels() {
    var pLevelsDiv = document.createElement('div');
    pLevelsDiv.id = "pLevelsDiv";
    pLevelsDiv.className = "outerDiv";

    var html = `
        <h3 class="divHeading">Problem Levels</h3>
        <canvas id="pLevels" class="fullChart"></canvas>
    `

    pLevelsDiv.innerHTML = html;
    compareBox.appendChild(pLevelsDiv);

    var levels = []
    for (var i in subData1.levels) levels.push(i);
    for (var i in subData2.levels) levels.push(i);
    levels = [...new Set(levels)];
    levels.sort();

    var data1 = []
    var data2 = []

    for (var i = 0; i < levels.length; i++) {
        var cl = levels[i]
        if (cl in subData1.levels) {
            data1.push(subData1.levels[cl]);
        }
        else {
            data1.push(0);
        }
        if (cl in subData2.levels) {
            data2.push(subData2.levels[cl]);
        }
        else {
            data2.push(0);
        }
    }

    var cdata = {
        type: 'bar',
        data: {
            labels: levels,
            datasets: [
                {
                    label: handle1,
                    backgroundColor: "#3e95cd",
                    data: data1
                },
                {
                    label: handle2,
                    backgroundColor: "#c45850",
                    data: data2
                }
            ]
        },
        options: {
            title: {
                display: true,
                text: "Problem levels of " + handle1 + " and " + handle2
            },
            responsive: true
        }
    }

    new Chart(document.getElementById("pLevels"), cdata);
}

function addProblemTags() {
    var pTagsDiv = document.createElement('div');
    pTagsDiv.id = "pTagsDiv";
    pTagsDiv.className = "outerDiv";

    var html = `
        <h3 class="divHeading">Problem Tags</h3>
        <div class="innerDiv">
            <div class="pTagsDiv1">
                <canvas id="pTags1"></canvas>
            </div>
            <div class="pTagsDiv2">
                <canvas id="pTags2"></canvas>
            </div>
        </div>
    `
    pTagsDiv.innerHTML = html;
    compareBox.appendChild(pTagsDiv);

    var tags1 = subData1.tags;
    var labels1 = Object.keys(tags1);
    var data1 = Object.values(tags1);

    var cData = {
        type: 'pie',
        data: {
            labels: labels1,
            datasets: [
                {
                    backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850",
                        "#2ecc71",
                        "#3498db",
                        "#95a5a6",
                        "#9b59b6",
                        "#f1c40f",
                        "#e74c3c",
                        "#34495e"
                    ],

                    data: data1
                }
            ]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    }

    new Chart(document.getElementById("pTags1"), cData);


    var tags2 = subData2.tags;
    var labels2 = Object.keys(tags2);
    var data2 = Object.values(tags2);

    var cData = {
        type: 'pie',
        data: {
            labels: labels2,
            datasets: [
                {
                    label: handle2,
                    backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850",
                        "#2ecc71",
                        "#3498db",
                        "#95a5a6",
                        "#9b59b6",
                        "#f1c40f",
                        "#e74c3c",
                        "#34495e"
                    ],

                    data: data2
                }
            ]
        },
        options: {
            plugins: {
                legend: {
                    display: false
                }
            }
        }
    }

    new Chart(document.getElementById("pTags2"), cData);

}

function addSubmissionLangs() {
    var pLangsDiv = document.createElement('div');
    pLangsDiv.id = "pLangsDiv";
    pLangsDiv.className = "outerDiv";

    var html = `
        <h3 class="divHeading">Submission Languages</h3>
        <div class="innerDiv">
            <div class="pLangsDiv1">
                <canvas id="pLangs1"></canvas>
            </div>
            <div class="pLangsDiv2">
                <canvas id="pLangs2"></canvas>
            </div>
        </div>
    `
    pLangsDiv.innerHTML = html;
    compareBox.appendChild(pLangsDiv);

    var langs1 = [];
    for (var i in subData1.langs){
        langs1.push([subData1.langs[i], i]);
    }
    langs1.sort(function (a, b) { return b[0] - a[0] });

    var labels1 = [];
    var data1 = [];

    for(var i=0; i<langs1.length; i++){
        labels1.push(langs1[i][1]);
        data1.push(langs1[i][0]);
    }

    var cData = {
        type: 'pie',
        data: {
            labels: labels1,
            datasets: [
                {
                    backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850",
                        "#2ecc71",
                        "#3498db",
                        "#95a5a6",
                        "#9b59b6",
                        "#f1c40f",
                        "#e74c3c",
                        "#34495e"
                    ],

                    data: data1
                }
            ]
        },
        options: {
        }
    }

    new Chart(document.getElementById("pLangs1"), cData);

    var langs2 = [];
    for (var i in subData2.langs){
        langs2.push([subData2.langs[i], i]);
    }
    langs2.sort(function (a, b) { return b[0] - a[0] });

    var labels2 = [];
    var data2 = [];

    for(var i=0; i<langs2.length; i++){
        labels2.push(langs2[i][1]);
        data2.push(langs2[i][0]);
    }

    var cData = {
        type: 'pie',
        data: {
            labels: labels2,
            datasets: [
                {
                    label: handle2,
                    backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850",
                        "#2ecc71",
                        "#3498db",
                        "#95a5a6",
                        "#9b59b6",
                        "#f1c40f",
                        "#e74c3c",
                        "#34495e"
                    ],

                    data: data2
                }
            ]
        },
        options: {
        }
    }

    new Chart(document.getElementById("pLangs2"), cData);
}

function addSubmissionVerdicts() {
    var pVerdictsDiv = document.createElement('div');
    pVerdictsDiv.id = "pVerdictsDiv";
    pVerdictsDiv.className = "outerDiv";

    var html = `
        <h3 class="divHeading">Submission Verdicts</h3>
        <div class="innerDiv">
            <div class="pVerdictsDiv1">
                <canvas id="pVerdicts1"></canvas>
            </div>
            <div class="pVerdictsDiv2">
                <canvas id="pVerdicts2"></canvas>
            </div>
        </div>
    `
    pVerdictsDiv.innerHTML = html;
    compareBox.appendChild(pVerdictsDiv);

    var verdicts1 = [];
    for (var i in subData1.verdicts) {
        verdicts1.push([subData1.verdicts[i], i])
    }
    verdicts1.sort(function (a, b) { return b[0] - a[0] });

    var labels1 = []
    var data1 = []
    for (var i = 0; i < verdicts1.length; i++) {
        labels1.push(verdicts1[i][1]);
        data1.push(verdicts1[i][0]);
    }
    
    var cData = {
        type: 'pie',
        data: {
            labels: labels1,
            datasets: [
                {
                    backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850",
                        "#2ecc71",
                        "#3498db",
                        "#95a5a6",
                        "#9b59b6",
                        "#f1c40f",
                        "#e74c3c",
                        "#34495e"
                    ],

                    data: data1
                }
            ]
        },
        options: {
        }
    }

    new Chart(document.getElementById("pVerdicts1"), cData);


    var verdicts2 = [];
    for (var i in subData2.verdicts) {
        verdicts2.push([subData2.verdicts[i], i])
    }
    verdicts2.sort(function (a, b) { return b[0] - a[0] });

    var labels2 = []
    var data2 = []
    for (var i = 0; i < verdicts2.length; i++) {
        labels2.push(verdicts2[i][1]);
        data2.push(verdicts2[i][0]);
    }

    var cData = {
        type: 'pie',
        data: {
            labels: labels2,
            datasets: [
                {
                    label: handle2,
                    backgroundColor: ["#3e95cd", "#8e5ea2", "#3cba9f", "#e8c3b9", "#c45850",
                        "#2ecc71",
                        "#3498db",
                        "#95a5a6",
                        "#9b59b6",
                        "#f1c40f",
                        "#e74c3c",
                        "#34495e"
                    ],

                    data: data2
                }
            ]
        },
        options: {
        }
    }

    new Chart(document.getElementById("pVerdicts2"), cData);
}


function addAllProblems() {
    var allProblemsDiv = document.createElement('div');
    allProblemsDiv.id = "allProblemsDiv";
    // allProblemsDiv.className = "outerDiv";
    var html = `
        <h3 class="divHeading">All Problems</h3>
        <div class="innerDiv">
            <div class="dataDiv allProblemsInnerDiv">
                <table class="dataTable" id="handle1Problems">
                    
                </table>
            </div>
            <div class="dataDiv allProblemsInnerDiv">
                <table class="dataTable" id="commonProblems">
                    
                </table>
            </div>
            <div class="dataDiv allProblemsInnerDiv">
                <table class="dataTable" id="handle2Problems">
                    
                </table>
            </div>
        </div>
    `
    allProblemsDiv.innerHTML = html;
    compareBox.appendChild(allProblemsDiv);

    var commonProblems = [];
    var handle1Problems = [];
    var handle2Problems = [];

    p1 = subData1.problems;
    p2 = subData2.problems;

    for(var i in p1){
        if (i in p2){
            commonProblems.push([i, p1[i]]);
        }
        else{
            handle1Problems.push([i, p1[i]]);
        }
    }
    for(var i in p2){
        if (i in p1) continue;
        handle2Problems.push([i, p2[i]]);
    }

    commonProblems.sort(function (a, b) { return b[1] - a[1] });
    handle1Problems.sort(function (a, b) { return b[1] - a[1] });
    handle2Problems.sort(function (a, b) { return b[1] - a[1] });

    var commonHtml = `<th>Common Problems (${commonProblems.length})</th>`;
    var handle1Html = `<th>${handle1} (${handle1Problems.length})</th>`;
    var handle2Html = `<th>${handle2} (${handle2Problems.length})</th>`;

    for (var i =0; i<commonProblems.length; i++){
        var curr = commonProblems[i];
        commonHtml += `<tr><td><a href="https://codeforces.com/contest/${curr[0].split('-')[0]}/problem/${curr[0].split('-')[1]}">${curr[0]}</a> - ${curr[1]}</td></tr>`
    }

    for (var i =0; i<handle1Problems.length; i++){
        var curr = handle1Problems[i];
        handle1Html += `<tr><td><a href="https://codeforces.com/contest/${curr[0].split('-')[0]}/problem/${curr[0].split('-')[1]}">${curr[0]}</a> - ${curr[1]}</td></tr>`
    }

    for (var i =0; i<handle2Problems.length; i++){
        var curr = handle2Problems[i];
        handle2Html += `<tr><td><a href="https://codeforces.com/contest/${curr[0].split('-')[0]}/problem/${curr[0].split('-')[1]}">${curr[0]}</a> - ${curr[1]}</td></tr>`
    }

    document.getElementById('handle1Problems').innerHTML = handle1Html;
    document.getElementById('commonProblems').innerHTML = commonHtml;
    document.getElementById('handle2Problems').innerHTML = handle2Html;

}