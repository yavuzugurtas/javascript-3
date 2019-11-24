// http://latentflip.com/loupe/
// https://javascript.info/settimeout-setinterval
// https://developer.mozilla.org/en-US/docs/Web/API/WindowOrWorkerGlobalScope/setTimeout


const exercises = [];

function writeTheDelays1() {
  let x = '';

  setTimeout(function sto_1() {
    x += 'script'; console.log(x);
  }, null);

  setTimeout(function sto_2() {
    x = ''; console.log(x);
  }, null);

  x += 'java'; console.log(x);

  setTimeout(function sto_3() {
    x += 'java'; console.log(x);
  }, null);

  setTimeout(function sto_4() {
    console.assert(x === 'javascript', 'x should be "javascript"');
  }, null);
}
exercises.push(writeTheDelays1);




function writeTheDelays2() {
  let x = 'JavaScript';
  console.log(x);

  setTimeout(function sto_1() {
    console.assert(x === 'Java Script', 'x should be "Java Script"');
  }, null);

  setTimeout(function sto_2() {
    x = x.slice(1, x.length);
    console.log(x);
  }, null);

  setTimeout(function sto_3() {
    x = [].map.call(x, char => char.charCodeAt() < 97 ? ' ' + char : char);
    console.log(x.toString());
  }, null);

  setTimeout(function sto_4() {
    x = x.join('');
    console.log(x);
  }, null);
}
exercises.push(writeTheDelays2);


function writeTheDelays3() {
  let x = ["b", "c"];

  setTimeout(function sto_1() {
    x = x.reduce((acc, entry) => acc + entry, '');
    console.log(typeof x, x.toString());
  }, null);

  setTimeout(function sto_2() {
    console.assert(x === 'abc', 'x should be string abc');
  }, null);

  setTimeout(function sto_3() {
    x = ["a", ...x, "d"];
    console.log(typeof x, x.toString());
  }, null);

  setTimeout(function sto_4() {
    x.pop();
    console.log(typeof x, x.toString());
  }, null);

  setTimeout(function sto_5() {
    console.assert(x.toString() === 'a,b', 'x.toString() should be a,b');
  }, null);
}
exercises.push(writeTheDelays3);




const loupedExercises = exercises.map(louping);
const liveStudiedExercises = liveStudy(loupedExercises, 'Write The Delays');
document.body.appendChild(liveStudiedExercises.container);

