function getContestStats(data) {
    var stat = {};
    var inf = 1000000000;
    stat.rating = 0;
    stat.maxUp = 0;
    stat.maxDown = 0;
    stat.maxUpCon = '';
    stat.maxDownCon = '';
    stat.best = inf;
    stat.worst = -inf;
    stat.bestCon = '';
    stat.worstCon = '';
    stat.maxRating = 0;
    stat.minRating = inf;
    stat.total = data.result.length;
    stat.timeline = [];
    for (var i = 0; i < data.result.length; i++) {
        var curr = data.result[i];
        if (curr.ratingUpdateTimeSeconds < phaseStart){
            continue;
        }
        if (curr.rank < stat.best) {
            stat.best = curr.rank;
            stat.bestCon = curr.contestId;
        }
        if (curr.rank > stat.worst) {
            stat.worst = curr.rank;
            stat.worstCon = curr.contestId;
        }
        if (curr.newRating > stat.maxRating) {
            stat.maxRating = curr.newRating;
        }
        if (curr.newRating < stat.minRating) {
            stat.minRating = curr.newRating;
        }

        var ratingChange = curr.newRating - curr.oldRating
        if (stat.maxUp < ratingChange) {
            stat.maxUp = curr.newRating;
            stat.maxUpCon = curr.contestId;
        }
        if (ratingChange < 0 && stat.maxDown > ratingChange) {
            stat.maxDown = ratingChange;
            stat.maxDownCon = curr.contestId;
        }

        stat.timeline.push([curr.ratingUpdateTimeSeconds, curr.newRating]);

        if (i == data.result.length - 1) {
            stat.rating = curr.newRating;
        }
    }

    if (stat.maxRating === 0){
        stat.rating = '-';
        stat.maxUp = '-';
        stat.maxDown = '-';
        stat.maxUpCon = '';
        stat.maxDownCon = '';
        stat.best = '-';
        stat.worst = '-';
        stat.bestCon = '';
        stat.worstCon = '';
        stat.maxRating = '-';
        stat.minRating = '-';
        stat.total = data.result.length;
    }
    return stat;
}


function getSubmissionsStats(data) {
    var stat = {};
    stat.rating = {};
    stat.tags = {};
    problems = {};
    stat.levels = {};
    stat.totalSub = data.result.length;
    stat.tried = 0;
    stat.solved = 0;
    stat.unsolved = 0;
    stat.problems = {};
    stat.langs = {};
    stat.verdicts = {};
    stat.allProblems = {};

    for(var i=data.result.length - 1; i>=0; i--){
        var curr = data.result[i];
        if (curr.creationTimeSeconds < phaseStart){
            continue;
        }
        var problemId = curr.problem.contestId + '-' + curr.problem.index;
        if (problems[problemId] == undefined){
            problems[problemId] = {
                subs: 1,
                solved: 0
            }
            stat.tried++;
        }
        else{
            if (problems[problemId].solved == 0) {
                problems[problemId].subs++;
            }
        }
        var cverdict = curr.verdict;
        var clang = curr.programmingLanguage;
        if(stat.verdicts[cverdict] == undefined){
            stat.verdicts[cverdict] = 1;
        }
        else{
            stat.verdicts[cverdict]++;
        }
        
        if (stat.langs[clang] == undefined){
            stat.langs[clang] = 1;
        }
        else{
            stat.langs[clang]++;
        }

        if (curr.problem.rating != undefined)
            stat.allProblems[problemId] = [0, curr.problem.rating];

        if (curr.verdict == 'OK' && problems[problemId].solved == 0){
            problems[problemId].solved = 1;
            stat.solved++;
            var ctags = curr.problem.tags;
            for(var j=0; j<ctags.length; j++){
                if(stat.tags[ctags[j]] == undefined){
                    stat.tags[ctags[j]]=1;
                }
                else stat.tags[ctags[j]]++;
            }
            var clevel = curr.problem.index[0];
            var crating = curr.problem.rating;

            if (stat.levels[clevel] == undefined){
                stat.levels[clevel] = 1;
            }
            else{
                stat.levels[clevel]++;
            }
            

            if (crating == undefined) continue;   // April fools contest 
            
            if (stat.problems[problemId] == undefined){
                stat.problems[problemId] = crating;
            }
            if (stat.rating[crating] == undefined){
                stat.rating[crating] = 1;
            }
            else{
                stat.rating[crating]++;
            }
        }
    }
    stat.unsolved = stat.tried - stat.unsolved;
    if (stat.solved !=0 ) stat.avgSub = Math.round(stat.totalSub*10/stat.solved)/10;
    else stat.avgSub = '-';
    stat.oneSub = 0;
    stat.maxAttempts = [0, '']

    for(var i in problems){
        if (problems[i].solved && problems[i].subs == 1){
            stat.oneSub++;
        }
        if (problems[i].subs > stat.maxAttempts[0]){
            stat.maxAttempts[0] = problems[i].subs;
            stat.maxAttempts[1] = i;
        }
        if (i in stat.allProblems) stat.allProblems[i][0] = problems[i].solved;
    }

    return stat;
}
