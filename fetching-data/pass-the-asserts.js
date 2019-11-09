// https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API/Basic_concepts
// great site for practicing working with the JSON format: https://jsoneditoronline.org/

{
  const pageTitle = 'pass the asserts';
  const header = document.createElement("h2");
  header.innerHTML = pageTitle;
  document.body.appendChild(header);
}

try {


  function passTheAsserts1() {

    const requestURL = "https://hackyourfuture.be/practice-api/food/wet/soups.json";

    fetch(requestURL)
      .then(function parseResponse(resp) { return resp.json() })
      .then(function workWithData(data) {
        // write me!
      })
      .then(function assertResult(result) {
        console.assert(result === 3, 'result should be 3');
      })
      .catch(function handleErrors(err) {
        console.error(err)
      });

    return requestURL;

  }
  fetching(passTheAsserts1);


  function passTheAsserts2() {

    const requestURL = "https://hackyourfuture.be/practice-api/food/dry/grains.json";

    fetch(requestURL)
      .then(function parseResponse(resp) { return resp.json() })
      .then(function workWithData(data) {
        // write me!
      })
      .then(function assertResult(result) {
        console.assert(result === 5, 'result should be 5');
      })
      .catch(function handleErrors(err) {
        console.error(err)
      });

    return requestURL;

  }
  fetching(passTheAsserts2);


  function passTheAsserts3() {

    const requestURL = "https://hackyourfuture.be/practice-api/types.json";

    fetch(requestURL)
      .then(function parseResponse(resp) { return resp.json() })
      .then(function workWithData(data) {
        // write me!
      })
      .then(function assertResult(result) {
        console.assert(Object.keys(result).length === 5, 'result has 5 properties')
        console.assert(result.boolean === true, '.boolean should be true');
        console.assert(result.color === "#82b92c", '.color should be "#82b92c"');
        console.assert(result.null === null, '.null should be null');
        console.assert(result.number === 123, '.number should be 123');
        console.assert(result.string === "Hello World", '.null should be "Hello World"');
      })
      .catch(function handleErrors(err) {
        console.error(err)
      });

    return requestURL;

  }
  fetching(passTheAsserts3);


  function passTheAsserts4() {

    const requestURL = "https://hackyourfuture.be/practice-api/types.json";

    fetch(requestURL)
      .then(function parseResponse(resp) { return resp.json() })
      .then(function workWithData(data) {
        // write me!
      })
      .then(function assertResult(result) {
        console.assert(result instanceof Array, 'result should be an array')
        console.assert(JSON.stringify(result[0]) === '["a","b","c"]', 'result[0] should be ["a","b","c"]');
        console.assert(JSON.stringify(result[1]) === '[0,1,2]', 'result[1] should be [0,1,2');
        console.assert(JSON.stringify(result[2]) === '[true,false]', 'result[2] should be [true,false]');
      })
      .catch(function handleErrors(err) {
        console.error(err)
      });

    return requestURL;

  }
  fetching(passTheAsserts4);


} catch (err) {
  console.log(err);
  document.body.appendChild(
    fetching.errorSearchComponent(err)
  );
}

{
  document.body.appendChild(document.createElement('hr'));
}
