class B {
  constructor(obj) {
    Object.assign(this, obj);
  }
  static [Symbol.hasInstance](obj) {
    var InstanceClass = this;

    Object.setPrototypeOf(obj, InstanceClass.prototype);
    Object.assign(obj, new this(obj));

    return true;
  }
}

class A extends B {}
class C extends B {}

let a = { num: 1 };

console.log(a);
console.log(a instanceof A);
console.log(a);
