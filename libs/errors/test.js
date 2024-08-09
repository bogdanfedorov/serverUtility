import { ErrorSet, NotFound } from "./index.js";

function Service() {
  throw NotFound;
}

try {
  Service();
} catch (error) {
  console.log(
    "check this error is Not Found",
    "error === NotFound =>",
    error === NotFound,
  ); // true
}

try {
  Service();
} catch (error) {
  console.log(
    "check string not working",
    'error === "Not found" =>',
    error === "Not found",
  ); // false
}

try {
  Service();
} catch (error) {
  console.log(
    "Check this error in some set",
    "ErrorSet.has(error) =>",
    ErrorSet.has(error),
  ); // true
}
