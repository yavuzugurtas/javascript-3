/*
  Sharing State

  This is where closure becomes interesting.
  All the examples and exercises till now have focused on the different ways you can get values into your functions

  This set of examples and exercises gives you the first taste of how closure can be used to build simple applications

  "State" is the value stored by a variable the moment you access it.
  Two frames share state if they have shared access to the same values.

  When two frames share state, that means if one function call changes a variable's value,
    that new value is available when the other function is called.

  Saving and changing state is the beating heart of any application.
  Imagine if every time you logged into your email, all your emails were gone!

  How you store state in your applications,
  and how you do (or don't!) change state from different functions is one of the most important considerations when planning apps

  Below you'll see 2 ways that functions can share state between frames:

  Arguments and Return Values:
    state can be shared between frames using arguments and captured return values.
    this is generally the simplest method to reason about and to debug
    the same arguments will always return the same value not matter what!
    This strategy is called "pure functions".
    once you understand the individual functions, you can understand the whole program.
    To make things even easier, using global const variables will help with debugging by leaving a record of everything that happened

  Closed Free Variables:
    state changes can be shared more between frames by closed variables.
    Changes made are not available globally, but do show up the next time you call the same function.
    Closures that do not modify their closed variables are "pure functions", the same arguments will always return the same values
    While closures that modify closed variables are not "pure functions", they are can a good way to build your programs.

*/

const sharingState = [];


function pureFunctions() {
  // closeIt creates pure closures
  // because the returned functions never modify the closed variable
  // calling the closed functions with the same args always returns the same result


  function concatPigs(str) {
    return str + " pigs";
  }
  function concatParam(str, param) {
    return str + param;
  }

  const str1 = '-';

  console.assert(concatPigs(str1) === null, 'assert 1');
  console.assert(concatPigs(str1) === null, 'assert 2');
  console.assert(concatParam(str1, " rock!") === null, 'assert 3');
  console.assert(concatParam(str1, " rock!") === null, 'assert 4');


  const str2 = "hoy";

  console.assert(concatPigs(str2) === null, 'assert 5');
  console.assert(concatPigs(str2) === null, 'assert 6');
  console.assert(concatParam(str2, " cheese!") === null, 'assert 7');
  console.assert(concatParam(str2, " cheese!") === null, 'assert 8');
}
pureFunctions.display = true;
sharingState.push(pureFunctions);


function nonMutatingClosure() {
  // closeIt creates pure closures
  // because the returned functions never modify the closed variable
  // calling the closed functions with the same args always returns the same result

  function closeNonMutatingFunctions(str) {
    return [
      function () {
        return str + " pigs";
      },
      function (param) {
        return str + param;
      }
    ]
  }

  let closedFunctions1 = closeNonMutatingFunctions("-");
  const concatPigs1 = closedFunctions1[0], concatParam1 = closedFunctions1[1];
  closedFunctions1 = null;

  console.assert(concatPigs1() === null, 'assert 1');
  console.assert(concatPigs1() === null, 'assert 2');
  console.assert(concatParam1(" rock!") === null, 'assert 3');
  console.assert(concatParam1(" rock!") === null, 'assert 4');


  let closedFunctions2 = closeNonMutatingFunctions("hoy");
  const concatPigs2 = closedFunctions2[0], concatParam2 = closedFunctions2[1];
  closedFunctions2 = null;

  console.assert(concatPigs2() === null, 'assert 5');
  console.assert(concatPigs2() === null, 'assert 6');
  console.assert(concatParam2(" cheese!") === null, 'assert 7');
  console.assert(concatParam2(" cheese!") === null, 'assert 8');
}
nonMutatingClosure.display = true;
sharingState.push(nonMutatingClosure);


function mutatingClosure() {
  // closeIt creates impure closures
  // because the returned functions DO modify the closed variable
  // calling the closed functions with the same args will not always return the same result

  function closeMutatingFunctions(str) {
    return [
      function () {
        return str += " pigs";
      },
      function (param) {
        return str += param;
      }
    ]
  }

  let closedFunctions1 = closeMutatingFunctions("-");
  const concatPigs1 = closedFunctions1[0], concatParam1 = closedFunctions1[1];
  closedFunctions1 = null;

  console.assert(concatPigs1() === null, 'assert 1');
  console.assert(concatPigs1() === null, 'assert 2');
  console.assert(concatParam1(" rock!") === null, 'assert 3');
  console.assert(concatParam1(" rock!") === null, 'assert 4');


  let closedFunctions2 = closeMutatingFunctions("hoy");
  const concatPigs2 = closedFunctions2[0], concatParam2 = closedFunctions2[1];
  closedFunctions2 = null;

  console.assert(concatPigs2() === null, 'assert 5');
  console.assert(concatPigs2() === null, 'assert 6');
  console.assert(concatParam2(" cheese!") === null, 'assert 7');
  console.assert(concatParam2(" cheese!") === null, 'assert 8');
}
mutatingClosure.display = true;
sharingState.push(mutatingClosure);


function exercise1() {
  const str0 = "";

  function concatPigs(str) {
    return str + " pigs";
  }
  function concatParam(str, param) {
    return str + " " + param;
  }

  const str1 = concatPigs(str0);

  const str2 = concatParam(str1, " rock!");

  const str3 = concatPigs(str2);

  const str4 = concatParam(str2, str3);

  console.assert(str4 === null, 'assert str4');
}
exercise1.display = true;
sharingState.push(exercise1);


function exercise2() {

  function closeIt(str) {
    return [
      function () {
        return str + " pigs";
      },
      function (param) {
        return str + param;
      }
    ]
  }

  let closedFunctions = closeIt("-");
  const concatPigs = closedFunctions[0], concatParam = closedFunctions[1];
  closedFunctions = null;

  const str1 = concatPigs();

  const str2 = concatParam(" rock!");

  const str3 = concatPigs();

  const str4 = concatParam(str3);

  console.assert(str4 === null, 'assert str4');
}
exercise2.display = true;
sharingState.push(exercise2);


function exercise3() {

  function closeIt(str) {
    return [
      function () {
        return str += " pigs";
      },
      function (param) {
        return str += param;
      }
    ]
  }

  let closedFunctions = closeIt("-");
  const concatPigs = closedFunctions[0], concatParam = closedFunctions[1];
  closedFunctions = null;

  const str1 = concatPigs();

  const str2 = concatParam(" rock!");

  const str3 = concatPigs();

  const str4 = concatParam(str3);

  console.assert(str4 === null, 'assert str4');
}
exercise3.display = true;
sharingState.push(exercise3);

console.group('Sharing State')
const evaluatedSharingState = sharingState
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
const liveStudiedSharingState = liveStudy(evaluatedSharingState, 'Sharing State');
document.body.appendChild(liveStudiedSharingState.container);
