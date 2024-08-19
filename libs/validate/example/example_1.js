import { Validate, Model } from "../src/validate.class.js";
import { ts } from "../src/betterTS.js";

class Person extends Validate {
  static [Model] = ts`{
  name!: string,
  age!: number,
  address: {
    street: string,
    city: string
  }
}`;
}

const john = {
  name: "John",
  age: 30,
  address: {
    street: "123 Main St",
    city: "Somewhere",
  },
};

console.log(john instanceof Person); // true

const incompletePerson = {
  name: "John",
  address: {
    street: "123 Main St",
  },
};

console.log(incompletePerson instanceof Person); // false (age is required)
