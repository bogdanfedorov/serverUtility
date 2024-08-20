import { Verifiable, Model } from "../src/validate.class.js";
import { ts } from "../src/betterTS.js";

class Person extends Verifiable {
  static [Model] = ts`{
  name!: string,
  age!: number,
  address: {
    street!: string,
    city: string
  }
}`;
}

const john = {
  name: "John",
  age: 30,
  address: {
    city: "Somewhere",
  },
};

console.log("john instanceof Person:", john instanceof Person); // false

const john2 = {
  name: "John",
  age: 30,
  address: {
    street: "Avenu",
    city: "Somewhere",
  },
};

console.log("john2 instanceof Person:", john2 instanceof Person); // true
console.log(john2);
