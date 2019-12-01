
const trickierExamples = [];

function greetingClassGetterSetter() {

  class Greeter {
    constructor(name) {
      this.name = name;
      this.firstPart = "hi i'm";
    }
    set greeting(newFirstPart) {
      this.firstPart = newFirstPart;
    }
    get greeting() {
      return this.firstPart + ' ' + this.name;
    }
  }

  const instance1 = new Greeter('first');
  console.assert(instance1.name === 'first', 'assert 1');
  console.assert(instance1.greeting === "hi i'm first", 'assert 2');

  instance1.greeting = 'howdy';
  console.assert(instance1.greeting === "howdy first", 'assert 3');


  const instance2 = new Greeter('second');
  console.assert(instance2.name === 'second', 'assert 4');
  console.assert(instance2.greeting === "hi i'm second", 'assert 5');

  instance2.greeting = 'doody';
  console.assert(instance2.greeting === "doody second", 'assert 6');

}
trickierExamples.push(greetingClassGetterSetter);


function theConstructorProperty() {

  // you can tell if something is from a class with the .constructor property
  // this property does not appear on the object like a normal property
  // using this can be very helpful for type checking and early returns

  class First {
    constructor() { }
  }

  class Second {
    constructor() { }
  }

  const a = new First();
  const b = new First();

  const y = new Second();
  const z = new Second();


  const pointsToFirst = a.constructor;
  const pointsToSecond = y.constructor;


  console.assert(a.constructor === First, 'assert 1');
  console.assert(a.constructor === b.constructor, 'assert 2');
  console.assert(b.constructor.name === 'First', 'assert 3');

  console.assert(y.constructor === Second, 'assert 4');
  console.assert(y.constructor === z.constructor, 'assert 5');
  console.assert(z.constructor.name === 'Second', 'assert 6');

  console.assert(a.constructor !== z.constructor, 'assert 7');
  console.assert(a.constructor.name !== z.constructor.name, 'assert 8');


}
trickierExamples.push(theConstructorProperty);


function staticMethods2() {

  // "this" is different in static and instance methods

  class WhatIsThis {
    constructor() { }

    static staticMethod() {
      return this;
    }
    instanceMethod() {
      return this;
    }
  }


  const staticMethodReturnValue = WhatIsThis.staticMethod()
  console.assert(staticMethodReturnValue === WhatIsThis, 'assert 1');

  const instanceOne = new WhatIsThis();
  const returnValueOne = instanceOne.instanceMethod();
  console.assert(returnValueOne === instanceOne, 'assert 2');

  const instanceTwo = new WhatIsThis();
  const returnValueTwo = instanceTwo.instanceMethod();
  console.assert(returnValueTwo === instanceTwo, 'assert 3');

}
trickierExamples.push(staticMethods2);


function SelfAwareClass() {
  // a trickier example using .constructor and static methods

  class SelfAware {
    constructor() { }
    static isInstance(arg) {
      // "this" is referring to SelfAware because the method is static
      return arg.constructor === this
        ? true : false;
    }
    isConstructor(classToCheck) {
      // "this" is referring to the instance because the method isn't static
      return this.constructor === classToCheck
        ? true : false;
    }
  }

  const objLiteral = {};

  console.assert(SelfAware.isInstance(objLiteral) === false, 'assert 1');

  const instance1 = new SelfAware();
  const instance2 = new SelfAware();

  console.assert(SelfAware.isInstance(instance1) === true, 'assert 2');
  console.assert(SelfAware.isInstance(instance2) === true, 'assert 3');

  console.assert(instance1.isConstructor(SelfAware) === true, 'assert 4');
  console.assert(instance2.isConstructor(SelfAware) === true, 'assert 5');

  class AnotherClass { }

  console.assert(instance1.isConstructor(AnotherClass) === false, 'assert 6');
  console.assert(instance2.isConstructor(AnotherClass) === false, 'assert 7');

}
trickierExamples.push(SelfAwareClass);


function instanceofVsDotConstructor() {

  // this is more detailed than you need to know right away
  // but is very helpful for type checking and early returns

  class Base { }

  class Extension extends Base { }

  const baseInstance = new Base();
  const extensionInstance = new Extension();

  console.assert(baseInstance instanceof Base, 'assert 1');
  console.assert(extensionInstance instanceof Base, 'assert 2');

  console.assert(baseInstance instanceof Extension, 'assert 3');
  console.assert(extensionInstance instanceof Extension, 'assert 4');


  console.assert(baseInstance.constructor === Base, 'assert 5');
  console.assert(extensionInstance.constructor === Base, 'assert 6');

  console.assert(baseInstance.constructor === Extension, 'assert 7');
  console.assert(extensionInstance.constructor === Extension, 'assert 8');

  // https://stackoverflow.com/questions/18172902/difference-between-instanceof-and-constructor-property

}
trickierExamples.push(instanceofVsDotConstructor);


console.group('Trickier Examples')
const evaluatedTrickierExamples = trickierExamples
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
const liveStudiedTrickierExamples = liveStudy(evaluatedTrickierExamples, 'Trickier Examples');
document.body.appendChild(liveStudiedTrickierExamples.container);
