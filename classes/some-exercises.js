{
  const pageTitle = 'class exercises';
  const header = document.createElement("h2");
  header.innerHTML = pageTitle;
  document.body.appendChild(header);
}

try {


  function example_classesReturnObjects() {

    class Thing {
      constructor(prop) {
        this.prop = prop;
      }
    }

    const firstThing = new Thing('first');
    console.assert(firstThing.prop === 'first', 'firstThing.prop should be "first"');

    const secondThing = new Thing('second');
    console.assert(secondThing.prop === 'second', 'secondThing.prop should be "second"');

  }
  evaluate(example_classesReturnObjects);


  function example_classesLetManyObjectsUseTheSameCode() {

    class Thing {
      constructor(name) {
        this.name = name;
      }

      fullName() {
        return this.name + ' thing.';
      }
    }

    const firstThing = new Thing('first');
    const secondThing = new Thing('second');

    const fullName1 = firstThing.fullName();
    console.assert(fullName1 === 'first thing.', 'fullName1 should be "first thing."');

    const fullName2 = secondThing.fullName();
    console.assert(fullName2 === 'second thing.', 'fullName2 should be "second thing."');

  }
  evaluate(example_classesLetManyObjectsUseTheSameCode);




} catch (err) {
  console.log(err);
  document.body.appendChild(
    evaluate.errorSearchComponent('.js file', err)
  );
}

{
  document.body.appendChild(document.createElement('hr'));
}
