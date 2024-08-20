export const Model = Symbol("Model");
export const TypeOf = Symbol("TypeOf");

const determineType = (value) => {
  if (Array.isArray(value)) return "array";
  if (value === null) return "null";
  return typeof value;
};

export class Verifiable {
  constructor(obj) {
    Object.assign(this, obj);
  }

  static [Symbol.hasInstance](obj) {
    const instanceClass = this;
    const ruleGetter = Verifiable.getRuleGetter(
      instanceClass,
      Verifiable.compareObject,
    );
    const isValid = Verifiable.compareObject(
      obj,
      instanceClass[Model],
      ruleGetter,
    );

    if (isValid) {
      Object.setPrototypeOf(obj, instanceClass.prototype);
      Object.assign(obj, new this(obj));
    }

    return isValid;
  }

  static compareObject(obj, model = {}, ruleGetter) {
    const getRule = ruleGetter(obj, model, ruleGetter);

    for (const key in model) {
      const rule = getRule(key);

      if (rule.isRequired) return false;
      if (rule.hasKey && rule.isTypeMismatch) return false;
      if (rule.hasKey && rule.isObject && rule.isObjectInvalid) return false;
    }

    return true;
  }

  static getRuleGetter(Class, compareFunc) {
    const typeOf = Class[TypeOf] || determineType;
    return (obj, model, ruleGetter) => (key) => ({
      isRequired: model[key].required && !obj.hasOwnProperty(key),
      hasKey: obj.hasOwnProperty(key),
      isTypeMismatch: typeOf(obj[key]) !== model[key].type,
      isObject: model[key].type === "object",
      isObjectInvalid: !compareFunc(obj[key], model[key].value, ruleGetter),
    });
  }
}
