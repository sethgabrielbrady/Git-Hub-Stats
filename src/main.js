
let fetch = require('node-fetch');

let promise = fetch(
     'https://api.github.com/users/' + process.argv[2],
    // 'https://api.github.com/users/sethgabrielbrady/repos',

    {
      method: 'GET',
      headers: {
         Authorization: 'token '  + process.argv[3]//PERSONAL access github token
      },
      body:'...'
    }

);//puts the request in


//Your application should accept a username and API key as arguments

/**********************************************START OF Question 1**********************/
promise.then( function handleResponse(responseObj){// says, when the promise is ready, do somththing

    console.log(responseObj.status);

    if(responseObj.status > 199 && responseObj.status < 300 ){
      //in here i know the request was succesul
      responseObj.json().then( function printData(userData){
        console.log(userData.name);//calls the entire object of user data
        // console.log(userData.stargazers_count);
      });
    }else {
      //now i know there is a problem
      ////maybe we shoudl tell the user.
      console.log('there was problem', responseObj.status );//error condition
    }
});



//
//
// process.argv[2] == "month";
// process.argv[3] == "year";
//
// let movingData = require('./moving.js');
// // let movingAnalysis = movingData(process.argv[2], process.argv[3]); //not needed
//
// let parkingData = require('./parking.js');
// // let parkingAnalysis = parkingData(process.argv[2], process.argv[3]); //not needed
//
// console.log(movingData(process.argv[2], process.argv[3]));
// console.log(parkingData(process.argv[2], process.argv[3]));
