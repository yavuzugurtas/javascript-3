/*
  Free Variables

    "Free variables are simply the variables that are neither locally declared nor passed as parameter."
      --> Denys Séguret: https://stackoverflow.com/questions/12934929/what-are-free-variables

  This may sound like an abstract, mathy definition. But really it's not so bad.
  You can even identify free variables just by reading the source code, without even running it!

*/

{
  const pageTitle = 'free variables';
  const header = document.createElement("h2");
  header.innerHTML = pageTitle;
  document.body.appendChild(header);
  console.groupCollapsed('%c' + pageTitle, 'font-weight:bold');
}
try {

  function example_aFreeVariable() {

    function freeOrNot(parameter) {
      const localVariable = "declared in function";
      freeVariable = `not declared locally or passed as a parameter`;
    }

    freeOrNot("parameter value");

  }
  example_aFreeVariable.display = true;
  evaluate(example_aFreeVariable);

  function example_fromGlobalScope() {

    function freeOrNot(parameter) {
      var localVariable = "declared in function";
      valueFromGlobalScope = "global side-effect";
    }

    let valueFromGlobalScope = "declared in global scope";
    freeOrNot("first call");

    valueFromGlobalScope = "reassigned in global scope";
    freeOrNot("second call");

  }
  example_fromGlobalScope.display = true;
  evaluate(example_fromGlobalScope)

  function example_fromClosure() {

    function closeIt(parentParam) {
      let valueFromClosure = "declared in parent frame : " + parentParam;
      return function (ownParam) {
        var ownLocal = "declared in body : " + ownParam[ownParam.length - 1];
        valueFromClosure = "closed side-effect : " + ownParam;
      }
    }

    const closure1 = closeIt("1");
    closure1("first call to closure1");

    const closure2 = closeIt("2");
    closure2("first call to closure2");
    closure2("second call to closure2");

    closure1("second call to closure1");

  }
  example_fromClosure.display = true;
  evaluate(example_fromClosure);


  function exercise1() {
    // write the function and replace the null's to pass the asserts

    function usesGlobalVariable(param) {
      // write me!
    }

    let globalVariable = "global";

    const result1 = usesGlobalVariable("arg");
    console.assert(result1 === "arggloballocal", "assert 1");

    const result2 = usesGlobalVariable(undefined);
    console.assert(result2 === "undefinedgloballocal", "assert 2");

    globalVariable = usesGlobalVariable("spoon");
    console.assert(globalVariable === null, "assert 3");

    const result3 = usesGlobalVariable(null);
    console.assert(result3 === "spoongloballocallocal", "assert 4");

    globalVariable = usesGlobalVariable("spoon");
    console.assert(globalVariable === null, "assert 5");
  }
  exercise1.display = true;
  evaluate(exercise1);

  function exercise2() {
    function closesParentParamter(parentParam) {
      // write me!
    }

    const closure1 = closesParentParamter("|");
    const closure2 = closesParentParamter("~");

    const result1 = closure1("+(=)+");
    console.assert(result1 === "+|(|=|)|+", "assert 1");

    const result2 = closure2("+(=)+");
    console.assert(result2 === "+~(~=~)~+", "assert 2");

    const result3 = closure1("abc");
    console.assert(result3 === null, "assert 3");

    const result4 = closure2("xyz");
    console.assert(result4 === null, "assert 4");


    const closure3 = closesParentParamter(null);
    const result5 = closure3(null);
    console.assert(result5 === "--0--1--", "assert 5");

    const closure4 = closesParentParamter(null);
    const result6 = closure4(null);
    console.assert(result6 === "--1--0--", "assert 6");
  }
  exercise2.display = true;
  evaluate(exercise2);


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

