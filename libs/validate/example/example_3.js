import { Verifiable, Model } from "../src/validate.class.js";
import { ts } from "../src/betterTS.js";

class Person extends Verifiable {
  static [Model] = ts`{
  name!: string,
  0<age!: number,
  }`;
}

const john = {
  name: "John",
  age: 30,
};

console.log("john instanceof Person:", john instanceof Person); // true

const john2 = {
  name: "John",
  age: -10,
};

console.log("john2 instanceof Person:", john2 instanceof Person); // false
console.log(john2);
