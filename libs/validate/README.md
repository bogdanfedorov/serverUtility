# Verifiable Object Model

A lightweight JavaScript utility to define and verify object structures using a custom model.
This package allows you to enforce object shapes and types in your code, making your applications more robust and predictable.

## Features

- **Custom Object Verification:** Define a model and verify if objects match the specified structure.
- **Type Checking:** Ensure that the properties in your objects match the expected types.
- **Required Properties:** Mark properties as required in your models.
- **Recursive Verification:** Supports nested object structures.

## Usage

### Importing

```javascript
import { Model, Validate, ts } from "validate";
```

### Defining a Model

Define a model for your objects using the `ts` helper function.
The model can include required properties and nested objects.

```javascript
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
```

or you can use native syntax using object

```javascript
class Person extends Validate {
  static [Model] = {
    name: {
      type: "string",
      required: true,
    },
    age: {
      type: "number",
      required: true,
    },
    address: {
      type: "object",
      required: false,
      value: {
        street: {
          type: "string",
          required: false,
        },
        city: {
          type: "string",
          required: false,
        },
      },
    },
  };
}
```

In this example, the `Person` class has a model with the following structure:

- `name` (required, type: `string`)
- `age` (required, type: `number`)
- `address` (optional, type: `object`)
  - `street` (type: `string`)
  - `city` (type: `string`)

### Verifying Objects

You can now use the `instanceof` operator to verify if an object matches the `Person` model.

```javascript
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
```

### Error Handling

If the model is not defined in a class that extends `Verifiable`, an error will be thrown:

```javascript
class Animal extends Verifiable {}

// No model defined
try {
  const dog = { species: "Dog" };
  console.log(dog instanceof Animal);
} catch (error) {
  console.error(error.message); // "Model is not defined in the class."
}
```

## API

### `Model`

A `Symbol` used to attach a model to a class.

### `Verifiable`

A base class that provides the functionality to compare objects against a model. Extend this class in your own models.

### `ts(strings)`

A tagged template literal function that parses a TypeScript-like object definition string and converts it into a model structure.

## Contributing

Feel free to contribute by submitting issues or pull requests. Make sure to follow the coding standards and write tests for any new features.
