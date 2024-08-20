import { tap } from "node:test/reporters";
import { run } from "node:test";
import { resolve } from "node:path";

run({
  files: [
    resolve("./spec/betterTS.test.js"),
    resolve("./spec/validate.test.js"),
  ],
})
  .on("test:fail", () => {
    process.exitCode = 1;
  })
  .compose(tap)
  .pipe(process.stdout);
