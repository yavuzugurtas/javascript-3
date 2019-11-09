/*
  Closures can get tricky pretty quickly if you want to use them for something practical.
  A little practice with the basic closure use-case will help you set the basics before moving on
*/

{
  const pageTitle = 'parent values, own values';
  const header = document.createElement("h2");
  header.innerHTML = pageTitle;
  document.body.appendChild(header);
  console.groupCollapsed('%c' + pageTitle, 'font-weight:bold');
}
try {



  function example_parentValuesOwnValues() {


    function closeIt(parentParam) {
      const parentLocal = "parent frame : " + parentParam;
      return function (ownParam) {
        const ownLocal = "own frame : " + ownParam;
        return { parentParam, parentLocal, ownParam, ownLocal };
      }
    }
    const closure1 = closeIt("a");
    const result1 = closure1("b");

    const closure2 = closeIt("c");
    const result2 = closure2("d");

  }
  example_parentValuesOwnValues.display = true;
  evaluate(example_parentValuesOwnValues);

  function exercise1() { // replace all of the null's to pass the assertions

    function closeAValue(val) {
      return function () {
        return val;
      }
    }

    const one = closeAValue(1);
    const oneReturns = one();
    console.assert(oneReturns === null, "asserting one's return value");

    const two = closeAValue(2);
    const twoReturns = two();
    console.assert(twoReturns === null, "asserting two's return value");

    const three = null;
    const threeReturns = null;
    console.assert(threeReturns === 4, "asserting three's return value");


    const sum = one + two + three; // fix this line to pass the assert
    console.assert(sum === 7, "summing closed values");

    const product = null; // fix this line to pass the assert
    console.assert(product === 16, "create the value 16 using your closed functions");

  }
  exercise1.display = true;
  evaluate(exercise1);

  function exercise2() { // replace all of the null's to pass the assertions

    function closeIt(parentParam) {
      return function (ownParam) {
        return ownParam + parentParam;
      }
    }

    const closure1 = closeIt(3);
    const closure2 = closeIt("3");

    const result1 = closure1(8);
    const result2 = closure2(8);
    console.assert(result1 === null, "result 1")
    console.assert(result2 === null, "result 2")

    const result3 = closure1(true);
    const result4 = closure2(true);
    console.assert(result3 === null, "result 3")
    console.assert(result4 === null, "result 4")

    const result5 = closure1(null);
    const result6 = closure2(null);
    console.assert(result5 === result6, "results 5 & 6");
  }
  exercise2.display = true;
  evaluate(exercise2);

  function exercise3() { // replace "null"s to pass the asserts

    function closeIt(paramParent) {
      const localParent = "b";
      return function (paramOwn) {
        const localOwn = "d";
        return paramParent + localParent + paramOwn + localOwn;
      }
    }

    const closure1 = closeIt("a");

    const result1 = closure1("c");
    console.assert(result1 === null, "result 1");

    const result2 = closure1("x");
    console.assert(result2 === null, "result 2");


    const closure2 = closeIt("iii");

    const result3 = closure2("2");
    console.assert(result3 === null, "result 3");

    const result4 = closure2("--");
    console.assert(result4 === null, "result 4");


    const result5 = closure1(8);
    console.assert(result5 === null, "result 5");

    const result6 = closure2(null)
    console.assert(result6 === "iiib d", "result 6");
  }
  exercise3.display = true;
  evaluate(exercise3);

  function exercise4() {// replace the "null"s to pass the asserts

    function closeIt(x, y) {
      return function (x) {
        return x + y;
      }
    }

    const closure_4_5 = closeIt(4, 5);

    const result1 = closure_4_5(200);
    console.assert(result1 === null, "result 1");

    const result2 = closure_4_5(-3);
    console.assert(result2 === null, "result 2");


    const closure_false_true = closeIt(false, true);

    const result3 = closure_false_true(200);
    console.assert(result3 === null, "result 3");

    const result4 = closure_false_true(-3);
    console.assert(result4 === null, "result 4");


    const result5 = closure_4_5(1);
    console.assert(result5 === null, "result 5");

    const result6 = closure_4_5(null) + closure_false_true(null);
    console.assert(result6 === 6, "result 6");
  }
  exercise4.display = true;
  evaluate(exercise4);


} catch (err) {
  console.log(err);
  document.body.appendChild(
    evaluate.errorSearchComponent('.js file', err)
  );
}
{
  document.body.appendChild(document.createElement('hr'));
  console.groupEnd();
}

