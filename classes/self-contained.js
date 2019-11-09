try {

  const literal1 = {
    name: 1,
    greet: function () {
      return `hi i'm ${this.name}`;
    }
  }
  const literal2 = {
    name: 2,
    greet: function () {
      return `hi i'm ${this.name}`;
    }
  }

  class Greeter {
    // write me!
  }
  const instance1 = new Greeter(1);
  const instance2 = new Greeter(2);

  describe('they should be the same', () => {
    it(`1's should have same prop names`, () => {
      assert.strictEqual(instance1.name, literal1.name);
    })
    it(`2's should have same prop names`, () => {
      assert.strictEqual(instance2.name, literal2.name);
    })
    it(`1's should have the same greetings`, () => {
      assert.strictEqual(instance1.greet(), literal1.greet());
    })
    it(`2's should have same greetings`, () => {
      assert.strictEqual(instance2.greet(), literal2.greet());
    })
  })

} catch (err) {
  console.log(err);
}
