import { JWT } from "./index.js";

const jwtString = JWT.create({
  number: 1,
  string: "s",
  array: [1, 2],
  object: { key: "value" },
});

console.log(jwtString);

const parced = JWT.parce(jwtString);

console.log(parced);
