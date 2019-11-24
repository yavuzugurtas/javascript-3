
const examples = [];


function fetchGetsDataFromURLs() {

  const requestURL = 'https://hackyourfuture.be/practice-api/types.json';

  fetch(requestURL)
    .then(function then_1(response) {
      console.log('the API returns an HTTP response');
      const convertedToObj = response.json();
      console.log('to use it, you need to convert the json to a JS object');
      return convertedToObj;
    })
    .then(function then_2(dataObj) {
      console.log('now you can use the data just like a regular JS object!');
      const evenNumbers = dataObj.array.filter(x => x % 2 == 0);
      const nestedEvenNumbers = dataObj.nested.numbers.filter(x => x % 2 === 0);
      console.log('to use something in the next ".then", return it');
      return [...evenNumbers, ...nestedEvenNumbers];
    })
    .then(function then_3(evenNumbers) {
      console.assert(JSON.stringify(evenNumbers) === '[2,0,2]', 'evenNumbers should be [2,0,2]');
    })
    .catch(function errorHandler(err) { console.error(err) })

  return requestURL;
}
examples.push(fetchGetsDataFromURLs)


function invalidURLs() {
  const requestURL = "https://hackyourfuture.be/practice-api/type.json";

  fetch(requestURL)
    .then(function then_1(response) {
      console.assert(response.ok === false, 'if a URL does not exist, response.ok will be false');
      return response.json();
    })
    .catch(function catch_1(err) {
      console.log('fetch will throw an error if your try parsing a not-ok response');
      console.error(err);
    })

  return requestURL;
}
examples.push(invalidURLs);


function errorHandling() {
  const requestURL = "https://hackyourfuture.be/practice-api/file-that-does-not-exist.json";

  fetch(requestURL)
    .then(function then_1(response) {
      console.log('errors are handled by the nearest catch statement')
      return response.json();
    })
    .catch(function catch_1(err) { console.error(err) })
    .then(function then_2() {
      console.log('when there is an error, fetch will skip to the nearest catch ...');
      throw new Error('error in then 2');
    })
    // .catch(function catch_2(err) { console.error(err) })
    .then(function then_3() {
      console.log("... and skip over any then's on the way!");
    })
    .catch(function catch_3(err) { console.error(err) })
    .then(function then_4() {
      console.log("after an error has been handled, then's will again be executed");
    })

  return requestURL;
}
examples.push(errorHandling);


function fetchUsesTheEventLoop() {
  const requestURL = "https://hackyourfuture.be/practice-api/animals/worms.json";

  console.log('written before fetch');

  fetch(requestURL)
    .then(resp => {
      console.log("this is a bit like setTimeout, but you can't control the timing")
      return resp.json();
    })
    .then(data => {
      console.log('each .then will always happen in order');
      return data.spotted[3];
    })
    .then(thirdCountryWithSpottedWorms => {
      console.assert(thirdCountryWithSpottedWorms === 'canada', 'thirdCountryWithSpottedWorms should be "canada"');
    })

  console.log('written after fetch');

  return requestURL;
}
examples.push(fetchUsesTheEventLoop);

const fetchingExamples = examples.map(fetching);
const liveStudiedExamples = liveStudy(fetchingExamples, 'Examples');
document.body.appendChild(liveStudiedExamples.container);
