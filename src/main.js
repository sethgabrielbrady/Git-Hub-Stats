
let fetch = require('node-fetch');

let promise = fetch(
     'https://api.github.com/users/' + process.argv[2],

    {
      method: 'GET',
      headers: {
         Authorization: 'token '  + process.argv[3]//PERSONAL access github token
      }

    }

);//puts the request in



/**********************************************START OF Question 1**********************/
promise.then( function handleResponse(responseObj){// says, when the promise is ready, do somththing

    // console.log(responseObj.status);

    if(responseObj.status > 199 && responseObj.status < 300 ){
      //in here i know the request was succesul
      responseObj.json().then( function printData(userData){
        console.log(userData.name);//calls the entire object of user data
        console.log(userData.login);
        console.log(userData.location);
      });
    }else {
      //now i know there is a problem
      ////maybe we shoudl tell the user.
      console.log('there was problem', responseObj.status );//error condition
    }
});


/**********************************************START OF Question 2**********************/

let promise2 = fetch(
     'https://api.github.com/users/' + process.argv[2] + '/repos',

    {
      method: 'GET',
      headers: {
         Authorization: 'token '  + process.argv[3]//PERSONAL access github token
      }
    }
);

  let count = 0;
  let tempCount;
  promise2.then(function handleResponse(responseObj){

    // console.log(responseObj.status);

    if(responseObj.status > 199 && responseObj.status < 300 ){
      responseObj.json().then(function printData(userData){
        // console.log(userData[0].stargazers_count);//calls the entire object of user data
        // console.log(userData[1]);2

      userData.forEach(function starCount(star) {
        // console.log(star);
        // console.log( star.stargazers_count);
        tempCount = star.stargazers_count;
        // console.log('tempCount', typeof(tempCount));
        count = count + Number(tempCount);
        // console.log('Starcount', count);
        // console.log('Count type', typeof(count));


      // for (i=0; i<=userData.length; i++) {
      //     // console.log('length', userData.length);
      //     // console.log( userData[i]);
      //     console.log( 'stars', userData[i].stargazers_count);
      //     tempCount = userData[i].stargazers_count;
      //     // console.log('tempCount', typeof(tempCount));
      //     count = count + tempCount;
      //     console.log('count', count);
      //   }
    });
    console.log('Starcount', count);
      });
    }else {
      console.log('there was problem', responseObj.status );//error condition
    }
});
