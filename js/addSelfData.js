function addSelfConData() {
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
        </tr>
        <tr>
            <td>Rating</td>
            <td>${conData1.rating}</td>
        </tr>
        <tr>
            <td>Max Rating</td>
            <td>${conData1.maxRating}</td>
        </tr>
        <tr>
            <td>Min Rating</td>
            <td>${conData1.minRating}</td>
        </tr>
        <tr>
            <td>Best Rank</td>
            <td>${conData1.best} <a href="https://codeforces.com/contest/${conData1.bestCon}">(${conData1.bestCon})</a></td>
        </tr>
        <tr>
            <td>Worst Rank</td>
            <td>${conData1.worst} <a href="https://codeforces.com/contest/${conData1.worstCon}">(${conData1.worstCon})</a></td>
        </tr>
        <tr>
            <td>Max Up</td>
            <td>${conData1.maxUp} <a href="https://codeforces.com/contest/${conData1.maxUpCon}">(${conData1.maxUpCon})</a></td>
        </tr>
        <tr>
            <td>Max Down</td>
            <td>${conData1.maxDown} <a href="https://codeforces.com/contest/${conData1.maxDownCon}">(${conData1.maxDownCon})</a></td>
        </tr>
    `
    table.innerHTML = html;
    contestDataDiv.appendChild(table);
    compareBox.appendChild(contestDataDiv);
}

function addSelfSubmissionsData() {
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
        </tr>
        <tr>
            <td>Solved</td>
            <td>${subData1.solved}</td>
        </tr>
        <tr>
            <td>Tried</td>
            <td>${subData1.tried}</td>
        </tr>
        <tr>
            <td>Total Submissions</td>
            <td>${subData1.totalSub}</td>
        </tr>
        <tr>
            <td>Average Attemps</td>
            <td>${subData1.avgSub}</td>
        </tr>
        <tr>
            <td>Max Attemps</td>
            <td>${subData1.maxAttempts[0]} <a href="https://codeforces.com/contest/${subData1.maxAttempts[1].split('-')[0]}/problem/${subData1.maxAttempts[1].split('-')[1]}">${subData1.maxAttempts[1]}</a></td>
        </tr>
        <tr>
            <td>Solved with 1 submission</td>
            <td>${subData1.oneSub}</td>
        </tr>
    `
    table.innerHTML = html;
    subDataDiv.appendChild(table);
    compareBox.appendChild(subDataDiv);
}

function addSelfTimeline() {
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
    var timeline1 = conData1.timeline;

    function convertDate(inputFormat) {
        function pad(s) { return (s < 10) ? '0' + s : s; }
        var d = new Date(inputFormat)
        return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('/')
    }

    var i = 0;
    while (i < timeline1.length) {
        labels.push(convertDate(new Date(timeline1[i][0] * 1000)));
        handle1Data.push(timeline1[i][1]);
        i++;
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


function addSelfProblemRatings() {
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

    ratings.sort(function (a, b) { return b - a });

    var data1 = []
    for (var i = 0; i < ratings.length; i++) {
        var cr = ratings[i]
        data1.push(subData1.rating[cr]);
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
            ]
        },
        options: {
            title: {
                display: true,
                text: "Problem ratings of " + handle1
            },
            responsive: true
        }
    }

    new Chart(document.getElementById("pRatings"), cdata);
}

function addSelfProblemLevels() {
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
    levels.sort();

    var data1 = []

    for (var i = 0; i < levels.length; i++) {
        var cl = levels[i]
        data1.push(subData1.levels[cl]);
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
            ]
        },
        options: {
            title: {
                display: true,
                text: "Problem levels of " + handle1
            },
            responsive: true
        }
    }

    new Chart(document.getElementById("pLevels"), cdata);
}

function addSelfProblemTags() {
    var pTagsDiv = document.createElement('div');
    pTagsDiv.id = "pTagsDiv";
    pTagsDiv.className = "outerDiv";

    var html = `
        <h3 class="divHeading">Problem Tags</h3>
        <div class="innerDiv">
            <div class="pTagsDiv1">
                <canvas id="pTags1"></canvas>
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
}

function addSelfSubmissionLangs() {
    var pLangsDiv = document.createElement('div');
    pLangsDiv.id = "pLangsDiv";
    pLangsDiv.className = "outerDiv";

    var html = `
        <h3 class="divHeading">Submission Languages</h3>
        <div class="innerDiv">
            <div class="pLangsDiv1">
                <canvas id="pLangs1"></canvas>
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
}

function addSelfSubmissionVerdicts() {
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


function addSelfAllProblems() {
    var allProblemsDiv = document.createElement('div');
    allProblemsDiv.id = "allProblemsDiv";
    // allProblemsDiv.className = "outerDiv";
    var html = `
        <h3 class="divHeading">All Problems</h3>
        <div class="innerDiv">
            <div class="dataDiv allProblemsInnerDiv">
                <table class="dataTable" id="solved">
                    
                </table>
            </div>
            <div class="dataDiv allProblemsInnerDiv">
                <table class="dataTable" id="notSolved">
                    
                </table>
            </div>
        </div>
    `
    allProblemsDiv.innerHTML = html;
    compareBox.appendChild(allProblemsDiv);

    var solved = [];
    var notSolved = [];

    var allp = subData1.allProblems;

    for (var i in allp){
        if (allp[i][0]){
            solved.push([i, allp[i][1]]);
        }
        else{
            notSolved.push([i, allp[i][1]]);
        }
    }
    
    solved.sort(function (a, b) { return b[1] - a[1] });
    notSolved.sort(function (a, b) { return b[1] - a[1] });

    var solvedHtml = `<th>Solved (${solved.length})</th>`;
    var notSolvedHtml = `<th>Not Solved (${handle1.length})</th>`;

    for (var i =0; i<solved.length; i++){
        var curr = solved[i];
        solvedHtml += `<tr><td><a href="https://codeforces.com/contest/${curr[0].split('-')[0]}/problem/${curr[0].split('-')[1]}">${curr[0]}</a> - ${curr[1]}</td></tr>`
    }

    for (var i =0; i<notSolved.length; i++){
        var curr = notSolved[i];
        notSolvedHtml += `<tr><td><a href="https://codeforces.com/contest/${curr[0].split('-')[0]}/problem/${curr[0].split('-')[1]}">${curr[0]}</a> - ${curr[1]}</td></tr>`
    }

    document.getElementById('notSolved').innerHTML = notSolvedHtml;
    document.getElementById('solved').innerHTML = solvedHtml;

}