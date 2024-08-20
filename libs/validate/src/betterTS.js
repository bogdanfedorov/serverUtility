const parse = (obj) => {
  const out = {};

  Object.entries(obj).map(([key, value]) => {
    var meta = {
      key,
    };

    if (meta.key.endsWith("!")) {
      Object.assign(meta, {
        key: key.slice(0, -1),
        required: true,
      });
    }

    if (meta.key.includes("<")) {
      const t = meta.key.split("<");

      if (!Number.isNaN(Number(t.at(0)))) {
        Object.assign(meta, {
          min: Number(t.at(0)),
          key: t.at(1),
        });
      }

      if (!Number.isNaN(Number(t.at(-1)))) {
        Object.assign(meta, {
          max: Number(t.at(-1)),
          key: t.at(-2),
        });
      }
    }

    var { key, ...meta } = meta;

    if (typeof value === "object" && value !== null) {
      Object.assign(out, {
        [key]: {
          type: "object",
          value: parse(value),
          ...meta,
        },
      });
    } else {
      Object.assign(out, {
        [key]: {
          type: value,
          ...meta,
        },
      });
    }
  });

  return out;
};

export const ts = ([s]) => {
  const obj = JSON.parse(s.replace(/(\w+(<)|)(\w+(<)|)\w+(!|)/g, '"$&"'));

  return parse(obj);
};
