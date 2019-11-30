
const basicExamples = [];

function greetingClass() {

  // it's conventional to name classes with an uppercase letter
  // JavaScript doesn't care, but other developers do

  class Greeter {
    constructor(name) {
      this.name = name;
    }
    greet() {
      return `hi i'm ${this.name}`;
    }
  }

  const instance1 = new Greeter('first');
  const instance2 = new Greeter('second');

  console.assert(instance1.name === 'first', 'assert 1');
  console.assert(instance2.name === 'second', 'assert 2');

  console.assert(instance1.greet() === "hi i'm first", 'assert 3');
  console.assert(instance2.greet() === "hi i'm second", 'assert 4');

}
basicExamples.push(greetingClass);



function staticMethods1() {

  // static methods are available on the class, not the instances
  // instance methods are available on the instances, not the class

  class StaticVsInstance {
    constructor() {

    }
    static staticMethod() {
      return 'called static ';
    }
    instanceMethod() {
      return 'called instance ';
    }
  }

  const anInstance = new StaticVsInstance();

  console.log(anInstance.instanceMethod());
  console.log(StaticVsInstance.staticMethod());

  try {
    anInstance.staticMethod()
  } catch (err) {
    console.log(err.message);
  }

  try {
    StaticVsInstance.instanceMethod()
  } catch (err) {
    console.log(err.message);
  }

}
basicExamples.push(staticMethods1);



function extendingClasses() {

  class Person {
    constructor(name) {
      this.name = name;
    }
  }

  class Greeter extends Person {
    greet() {
      return `hi i'm ${this.name}`;
    }
  }

  const aPerson = new Person('Ludo');
  try {
    aPerson.greet()
  } catch (err) {
    console.log(err.message);
  }

  const aGreeter = new Greeter('Tom');
  console.assert(aGreeter.greet() === "hi i'm Tom");

}
basicExamples.push(extendingClasses);

function extendingClassesWithSuper() {

  class Person {
    constructor(name) {
      this.name = name;
    }
  }

  class Greeter extends Person {
    constructor(name, greeting) {
      super(name);
      this.greeting = greeting
    }
    greet() {
      return this.greeting + ' ' + this.name;
    }
  }

  const aPerson = new Person('Ludo');
  try {
    aPerson.greet()
  } catch (err) {
    console.log(err.message);
  }

  const aGreeter = new Greeter('Tom', "hello, i'm");
  console.assert(aGreeter.greet() === "hello, i'm Tom");

}
basicExamples.push(extendingClassesWithSuper);



console.group('Basic Examples')
const evaluatedbasicExamples = basicExamples
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
const liveStudiedbasicExamples = liveStudy(evaluatedbasicExamples, 'Basic Examples');
document.body.appendChild(liveStudiedbasicExamples.container);
