/*
  A good first step for mastering closure is learning how to recognize it when you see it.
*/


const identifyingClosure = [];

function example_functionsReturningFunctions() {

  // functions can return functions that were passed as arguments

  function argFunc() { };

  function returnsOldFunction(x) { return x }; // does not create a closure

  const sameFunctionAsArgument = returnsOldFunction(argFunc);
  console.assert(sameFunctionAsArgument === argFunc,
    'no closure created, the returned function was declared outside of "returnsOldfunction"');;


  function returnsNewFunction(x) {
    return function () { console.log(x) };
  }
  const newFunction = returnsNewFunction("hi!");
  console.assert(newFunction !== argFunc,
    'a closure is created! the returned function was declared inside of "returnsNewFunction"');

  // study this function call in JS Tutor to see closure in action:
  newFunction();

}
example_functionsReturningFunctions.display = true;
identifyingClosure.push(example_functionsReturningFunctions);



function neverCreatesAClosure() {
  // any function that returns a new function creates a closure
  // returning a function that was passed as an argument does not create a closure
  // the returned function must be declared inside the function call ("frame" on js tutor)

  function doesItClose(func, arg) {
    const returnVal = func(arg);
    const returnedAFunction = typeof returnVal === 'function';
    const returnedArgument = arg === returnVal;

    const createsAClosure = returnedAFunction && !returnedArgument;
    return createsAClosure;
  }

  function never(x) {
    return x;
  }

  const whenPassed4 = doesItClose(never, 4);
  console.assert(whenPassed4 === null, "... when passed 4");

  const whenPassedAFunction = doesItClose(never, function () { });
  console.assert(whenPassedAFunction === null, "... when passed a function");

  const whenPassedAnArray = doesItClose(never, []);
  console.assert(whenPassedAnArray === null, "... when passed an array");

  const whenPassedItself = doesItClose(never, never);
  console.assert(whenPassedItself === null, "... when passed itself");

}
neverCreatesAClosure.display = true;
identifyingClosure.push(neverCreatesAClosure);

function alwaysCreatesAClosure() {
  // any function that returns a new function creates a closure
  // returning a function that was passed as an argument does not create a closure
  // the returned function must be declared inside the function call ("frame" on js tutor)

  function doesItClose(func, arg) {
    const returnVal = func(arg);
    const returnedAFunction = typeof returnVal === 'function';
    const returnedArgument = arg === returnVal;

    const createsAClosure = returnedAFunction && !returnedArgument;
    return createsAClosure;
  }

  function always(x) {
    return function () {
      console.log(x)
    };
  }

  const whenPassed4 = doesItClose(always, 4);
  const alwaysLogs4 = always(4);

  const whenPassedAFunction = doesItClose(always, function bye() { });
  const alwaysLogsHi = always(function hi() { });

  const whenPassedAnArray = doesItClose(always, []);
  const alwaysLogsArray = always([]);

  const whenPassedItself = doesItClose(always, always);
  const alwaysLogsAlways = always(always);

  alwaysLogs4(), alwaysLogsHi(), alwaysLogsArray(), alwaysLogsAlways();
  alwaysLogs4(), alwaysLogsHi(), alwaysLogsArray(), alwaysLogsAlways();

}
alwaysCreatesAClosure.display = true;
identifyingClosure.push(alwaysCreatesAClosure);

function sometimesCreatesAClosure1() {

  function doesItClose(func, arg) {
    const returnVal = func(arg);
    const returnedAFunction = typeof returnVal === 'function';
    const returnedArgument = arg === returnVal;

    const createsAClosure = returnedAFunction && !returnedArgument;
    return createsAClosure;
  }

  function sometimes1(x) {
    return typeof x === "function"
      ? x
      : function () {
        console.log(x)
      }
  }

  const whenPassed4 = doesItClose(sometimes1, 4);
  const resultFrom4 = sometimes1(4);
  resultFrom4();

  const whenPassedItself = doesItClose(sometimes1, sometimes1);
  const resultFromItself = sometimes1(sometimes1);
  resultFromItself();

  const whenPassedAFunction = doesItClose(sometimes1, function bye() { console.log(x) });
  const resultFromFunction = sometimes1(function hi() {
    console.log(x)
  });
  resultFromFunction();
}
sometimesCreatesAClosure1.display = true;
identifyingClosure.push(sometimesCreatesAClosure1);

function sometimesCreatesAClosure2() {

  function doesItClose(func, arg) {
    const returnVal = func(arg);
    const returnedAFunction = typeof returnVal === 'function';
    const returnedArgument = arg === returnVal;

    const createsAClosure = returnedAFunction && !returnedArgument;
    return createsAClosure;
  }

  function sometimes2(x) {
    return typeof x === "function"
      ? function () {
        console.log(x)
      }
      : x;
  }


  const whenPassedAFunction = doesItClose(sometimes2, function bye() { console.log(x) });
  const resultFromFunction = sometimes2(function hi() {
    console.log(x)
  });
  resultFromFunction();

  const whenPassedItself = doesItClose(sometimes2, sometimes2);
  const resultFromItself = sometimes2(sometimes2);
  resultFromItself();

  const whenPassed4 = doesItClose(sometimes2, 4);
  const resultFrom4 = sometimes2(4);
  resultFrom4();

}
sometimesCreatesAClosure2.display = true;
identifyingClosure.push(sometimesCreatesAClosure2)


console.group('Identifying Closure')
const evaluatedIdentifyingClosure = identifyingClosure
  .map(f => evaluate(f))
  .map(report => {
    report.status = report.status === 0
      ? 'error'
      : report.status === 1
        ? 'no status'
        : report.status === 2
          ? 'pass'
          : report.status === 3
            ? 'fail'
            : 'invalid';
    return report
  });
console.groupEnd();
const liveStudiedIdentifyingClosure = liveStudy(evaluatedIdentifyingClosure, 'Identifying Closure');
document.body.appendChild(liveStudiedIdentifyingClosure.container);
