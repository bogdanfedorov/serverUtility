const parse = (obj) => {
  const out = {};

  Object.entries(obj).map(([key, value]) => {
    let required = false;
    if (key.endsWith("!")) {
      required = true;
      key = key.slice(0, -1);
    }
    if (typeof value === "object" && value !== null) {
      Object.assign(out, {
        [key]: {
          type: "object",
          required,
          value: parse(value),
        },
      });
    } else {
      Object.assign(out, {
        [key]: {
          type: value,
          required,
        },
      });
    }
  });

  return out;
};

export const ts = ([s]) => {
  const obj = JSON.parse(s.replace(/\w+(!|)/g, '"$&"'));

  return parse(obj);
};
