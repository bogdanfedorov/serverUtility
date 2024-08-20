import test from "node:test";
import assert from "node:assert";
import { ts } from "../src/betterTS.js";

test.describe("Test ts function", () => {
  test("Type check", () => {
    var out = ts`{
    numberField: number
  }`;

    assert.deepEqual(out, {
      numberField: {
        type: "number",
      },
    });
  });

  test("Required field (!)", () => {
    var out = ts`{
    numberField!: number
  }`;

    assert.deepEqual(out, {
      numberField: {
        type: "number",
        required: true,
      },
    });
  });

  test("Object field", () => {
    var out = ts`{
    object_1: {
        fieldInObject: number
    }
  }`;

    assert.deepEqual(out, {
      object_1: {
        type: "object",
        value: {
          fieldInObject: {
            type: "number",
          },
        },
      },
    });
  });

  test("Object deep", () => {
    var out = ts`{
    object_1: {
        object_2: {
        field: number
      }
    }
  }`;

    assert.deepEqual(out, {
      object_1: {
        type: "object",
        value: {
          object_2: {
            type: "object",
            value: {
              field: {
                type: "number",
              },
            },
          },
        },
      },
    });
  });

  test("Object required field", () => {
    var out = ts`{
    object_1: {
        field_non_reqired: number,
        field_reqired!: number
    }
  }`;

    assert.deepEqual(out, {
      object_1: {
        type: "object",
        value: {
          field_non_reqired: {
            type: "number",
          },
          field_reqired: {
            type: "number",
            required: true,
          },
        },
      },
    });
  });

  test("Number min (0<num)", () => {
    var out = ts`{
    0<numberField: number
  }`;

    assert.deepEqual(out, {
      numberField: {
        type: "number",
        min: 0,
      },
    });
  });

  test("Number max (num<100)", () => {
    var out = ts`{
    numberField<100: number
  }`;

    assert.deepEqual(out, {
      numberField: {
        type: "number",
        max: 100,
      },
    });
  });

  test("Number min and max (0<num<100)", () => {
    var out = ts`{
    0<numberField<100: number
  }`;

    assert.deepEqual(out, {
      numberField: {
        type: "number",
        min: 0,
        max: 100,
      },
    });
  });

  test("Number min required (0<num!)", () => {
    var out = ts`{
    0<numberField!: number
  }`;

    assert.deepEqual(out, {
      numberField: {
        type: "number",
        required: true,
        min: 0,
      },
    });
  });

  test("Number max required (num<100!)", () => {
    var out = ts`{
    numberField<100!: number
  }`;

    assert.deepEqual(out, {
      numberField: {
        type: "number",
        max: 100,
        required: true,
      },
    });
  });

  test("Number min and max required (0<num<100!)", () => {
    var out = ts`{
    0<numberField<100!: number
  }`;

    assert.deepEqual(out, {
      numberField: {
        type: "number",
        min: 0,
        max: 100,
        required: true,
      },
    });
  });
});
