// http://latentflip.com/loupe/
// https://javascript.info/settimeout-setinterval
// https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout
/*

instructions
...
now set iReadTheInstructions to true

*/

const examples = [];
examples.iReadTheInstructions = true;

function setTimeoutZero() {

  console.log(1);

  setTimeout(function sto_1() {
    console.log(4);
  }, 0);

  console.log(2);

  setTimeout(function sto_2() {
    console.log(5);
  }, 0);

  console.log(3);

}
examples.push(setTimeoutZero);



function example1() {

  console.log(1);

  setTimeout(function sto_1() {
    console.log(5);
  }, 500);

  console.log(2);

  setTimeout(function sto_2() {
    console.log(4);
  }, 0);

  console.log(3);

}
examples.push(example1);


function example2() {

  let x = '';

  setTimeout(function sto_1() {
    x += 'script'
    console.assert(x === 'javascript', 'x should be "javascript"')
  }, 500);

  x += 'java';
  console.assert(x === 'java', 'x should be "java"');

}
examples.push(example2);



function example3() {

  let x = '';

  setTimeout(function sto_1() {
    console.assert(x === 'javascript', 'x should be "javascript"')
  }, 1000);

  setTimeout(function sto_2() {
    x += 'script';
  }, 500);

  x += 'java';
  console.assert(x === 'java', 'x should be "java"');

}
examples.push(example3);



function example4() {
  const arr = [];
  let result;
  console.log('setting initial values')

  setTimeout(function sto_1() {
    result = arr.filter(x => x % 3 === 0);
    console.log('filtering for divisibility by 3');
  }, 1500);

  setTimeout(function sto_2() {
    arr.push(2, 4, 6);
    console.log('pushing 2, 4, 6');
  }, 1000);

  setTimeout(function sto_3() {
    console.assert(result[0] === 3, 'result[0] should be 3');
    console.assert(result[1] === 6, 'result[1] should be 6');
  }, 2000);

  setTimeout(function sto_4() {
    arr.push(1, 3, 5);
    console.log('pushing 1, 3, 5');
  }, 500);
}
examples.push(example4);

function lateFail() {
  setTimeout(function passingNow() {
    console.assert(true)
  }, 3000)
  setTimeout(function faillingNow() {
    console.assert(false)
  }, 4000)
}
examples.push(lateFail);


const loupedExamples = examples.map(louping);
loupedExamples.iReadTheInstructions = examples.iReadTheInstructions;
const liveStudiedExamples = liveStudy(loupedExamples, 'Examples');
document.body.appendChild(liveStudiedExamples.container);
