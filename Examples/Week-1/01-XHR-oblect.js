// Create the instance of XMLHttpRequest

const xhr = new XMLHttpRequest();


// Add the function
// this function will be trigger automatically each time that readyState change
xhr.onreadystatechange = function () {

  // Just check when the request in done and if it's successful
  if (xhr.readyState === 4 && xhr.status >= 200 && xhr.status < 300) {
    console.log(xhr.response)
  }

}

// Open the request passing the method and the endpoint
xhr.open('GET', 'https://dog.ceo/api/breed/cairn/images/random');

// Send it
xhr.send();