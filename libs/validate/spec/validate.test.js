import test from "node:test";
import assert from "node:assert";
import { ts } from "../src/betterTS.js";
import { Verifiable, Model } from "../src/validate.class.js";

test.describe("Person class verifications age", () => {
  test("Person instance of person with valid age", () => {
    class Person extends Verifiable {
      static [Model] = ts`{
      age: number
    }`;
    }
    var person = {
      age: 10,
    };

    assert.equal(person instanceof Person, true);
  });

  test("Person instance of person with missing age", () => {
    class Person extends Verifiable {
      static [Model] = ts`{
      age: number
    }`;
    }
    var person = {};
    assert.equal(person instanceof Person, true);
  });

  test("Person not instance without required age", () => {
    class Person extends Verifiable {
      static [Model] = ts`{
      age!: number
    }`;
    }
    var person = {};
    assert.equal(person instanceof Person, false);
  });

  test("Person instance with required age", () => {
    class Person extends Verifiable {
      static [Model] = ts`{
      age!: number
    }`;
    }
    var person = {
      age: 10,
    };
    assert.equal(person instanceof Person, true);
  });

  test("Person not instance with age below threshold", () => {
    class Person extends Verifiable {
      static [Model] = ts`{
      18<age!: number
    }`;
    }
    var person = {
      age: 10,
    };
    assert.equal(person instanceof Person, false);
  });

  test("Person instance with age above threshold", () => {
    class Person extends Verifiable {
      static [Model] = ts`{
      18<age!: number
    }`;
    }
    var person = {
      age: 19,
    };
    assert.equal(person instanceof Person, true);
  });

  test("Person not instance with age above max limit", () => {
    class Person extends Verifiable {
      static [Model] = ts`{
      18<age<100!: number
    }`;
    }
    var person = {
      age: 101,
    };
    assert.equal(person instanceof Person, false);
  });

  test("Person instance with age within range", () => {
    class Person extends Verifiable {
      static [Model] = ts`{
      18<age<100!: number
    }`;
    }
    var person = {
      age: 19,
    };
    assert.equal(person instanceof Person, true);
  });
});
