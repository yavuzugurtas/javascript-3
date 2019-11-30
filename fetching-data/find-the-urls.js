/* explore the data available behind the practice API
    can you figure out which URL's point to the resources that will pass the asserts?

    live API for fetching: https://hackyourfuturebelgiu.github.io/practice-api/
    data in source: https://github.com/HackYourFutureBelgium/practice-api

    This set of exercises is to help you look behind the mystery of an API call.
    An API is simply a structured way of providing access to some data across the internet
    One of the most effective ways to understand API's is to begin by seeing them from both sides
      client: the browser making a request for some data
      server: the API storing and providing access to that data

    Before you dive right into trying to writing code passing the asserts, look through the raw data
    Navigate around the repository a bit to become familiar with what's in the .json files
       https://github.com/HackYourFutureBelgium/practice-api
    Then try accessing the same data via the API by entering this URL in your browser ...
      https://hackyourfuturebelgiu.github.io/practice-api/
    ... adding paths to the URL until you find the same data you were studying as source code on github


  Hint:  there are no errors or mistakes in the code besides missing URL strings
    all you need to do is paste in the correct URL and the asserts will pass
*/

const findTheURLs = [];
findTheURLs.iReadTheInstructions = false;

function findTheURL1() {
  const requestURL = null;

  fetch(requestURL)
    .then(function parseResponse(resp) { return resp.json() })
    .then(function workWithData(data) {
      return data.string;
    })
    .then(function assertResult(result) {
      console.assert(result === "Hello World", 'Hello World');
    })
    .catch(function handleErrors(err) {
      console.error(err)
    });

  return requestURL;
}
findTheURLs.push(findTheURL1);


function findTheURL2() {
  const requestURL = null;

  fetch(requestURL)
    .then(function parseResponse(resp) { return resp.json() })
    .then(function workWithData(data) {
      const dataKeys = Object.keys(data);
      return dataKeys.filter(key => data[key] === true);
    })
    .then(function assertResult(result) {
      console.assert(JSON.stringify(result) === '["pea","lentil"]',
        'these things are delicious');
    })
    .catch(function handleErrors(err) {
      console.error(err)
    });

  return requestURL;
}
findTheURLs.push(findTheURL2);


function findTheURL3() {
  const requestURL = null;

  fetch(requestURL)
    .then(function parseResponse(resp) { return resp.json() })
    .then(function workWithData(data) {
      return data.varieties[1];
    })
    .then(function assertResult(result) {
      console.assert(result === atob("YnJhemls"), 'this one is also a country');
    })
    .catch(function handleErrors(err) {
      console.error(err)
    });

  return requestURL;
}
findTheURLs.push(findTheURL3);


function findTheURL4() {
  const requestURL = null;

  fetch(requestURL)
    .then(function parseResponse(resp) { return resp.json() })
    .then(function workWithData(data) {
      const dataKeys = Object.keys(data);
      return dataKeys.filter(key => data[key].indexOf('siberia') !== -1);
    })
    .then(function assertResult(result) {
      console.assert(JSON.stringify(result) === '["striped","wavy"]', 'residents of siberia');
    })
    .catch(function handleErrors(err) {
      console.error(err)
    });

  return requestURL;
}
findTheURLs.push(findTheURL4);



const fetchingFindTheURLs = findTheURLs.map(fetching);
fetchingFindTheURLs.iReadTheInstructions = findTheURLs.iReadTheInstructions;
const liveStudiedFindTheURLs = liveStudy(fetchingFindTheURLs, 'Find The URLs');
document.body.appendChild(liveStudiedFindTheURLs.container);
