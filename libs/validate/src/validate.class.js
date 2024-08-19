export const Model = Symbol("Model");

export class Validate {
  static [Symbol.hasInstance](obj) {
    var instanceClass = this;

    if (!instanceClass[Model]) {
      throw new Error("Model is not defined in the class.");
    }

    return Validate.compareObject(obj, instanceClass[Model]);
  }

  static compareObject(obj, model) {
    for (const key in model) {
      if (model[key].required && !obj.hasOwnProperty(key)) {
        return false;
      }
      if (obj.hasOwnProperty(key)) {
        var type = Validate.getType(obj[key]);
        if (type !== model[key].type) return false;
        if (model[key].type === "object") {
          var result = Validate.compareObject(obj[key], model[key].value);
          if (!result) {
            return false;
          }
        }
      }
    }
    return true;
  }

  static getType(value) {
    let type;
    if (Array.isArray(value)) {
      type = "array";
    } else if (value === null) {
      type = "null";
    } else {
      type = typeof value;
    }

    return type;
  }
}
