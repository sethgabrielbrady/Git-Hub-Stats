

let fetch = require('node-fetch');

let promise = fetch(
    'https://api.github.com/users/' + process.argv[2],

    {
        method: 'GET',
        headers: {
            Authorization: 'token ' + process.argv[3] //PERSONAL access github token
        }

    }

); //puts the request in
promise.then(function handleResponse(responseObj) { // says, when the promise is ready, do somththing
    // console.log(responseObj.status);
    if (responseObj.status > 199 && responseObj.status < 300) {
        //in here i know the request was succesul
        responseObj.json().then(function printData(userData) {
            console.log('FULL USER NAME:', userData.name); //calls the entire object of user data
            console.log('USER LOGIN: ', userData.login);
            console.log('UUSER LOCATION:', userData.location);
        });
    } else {
        console.log('ERROR-', responseObj.status);
    }
});

/**********************************************START OF Question 2**********************/

let promise2 = fetch(
    'https://api.github.com/users/' + process.argv[2] + '/repos',

    {
        method: 'GET',
        headers: {
            Authorization: 'token ' + process.argv[3] //PERSONAL access github token
        }
    }
);

let starCount = {
    name: "something",
    count: 0
};
let contributorId = [];
let i = 0;

/******************************Iterates Through the star count************************************/
promise2.then(function handleResponse(responseObj) {
    if (responseObj.status > 199 && responseObj.status < 300) {
        responseObj.json().then(function printData(userData) {
            userData.forEach(function getStarCount(each) {

                //  console.log(each.stargazers_count, each.name);//this is correct
                if (each.stargazers_count > starCount.count) {
                    // console.log('test', each.name);
                    starCount.count = each.stargazers_count;
                    starCount.name = each.name;
                }


                /*********iterates through the contributors ******************************/

                let promise3 = fetch(
                    'https://api.github.com/repos/' + process.argv[2] + '/' + each.name + '/contributors', //cycles though user names
                    {
                        method: 'GET',
                        headers: {
                            Authorization: 'token ' + process.argv[3]
                        }
                    }
                );

                promise3.then(function handleResponse(responseObj) {
                    if (responseObj.status > 199 && responseObj.status < 300) {
                        responseObj.json().then(function contributors(contributorData) {
                            // console.log(contributorData[0].login);//get thelogin of each contributor
                            if (contributorData[0].login !== 'jakerella') {
                                i++;
                                let contributorName = contributorData[0].login;
                                console.log('CONTRIBUTOR ' + i + ':', contributorName);
                                contributorId.push(contributorName);
                            }
                            // console.log(contributorData[0].login);
                        });
                    } else {
                        console.log('ERROR-', responseObj.status);
                    }
                });

                /******************************************************************************/

            });
            // console.log('CONTRIBUTORS:', contributorId);
            console.log('REPO NAME: ', starCount.name);
            console.log('STAR COUNT: ', starCount.count);
            // repoName = starCount.name;
        });
    } else {
        console.log('ERROR-', responseObj.status); //error condition
    }

});
