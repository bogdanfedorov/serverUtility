export const ConnectionError = Symbol("Connection error");
export const NotFound = Symbol("Not found");
export const NotCreated = Symbol("Not created");
export const NotValidId = Symbol("Not valid id");
export const OnFindError = Symbol("On find error");
export const OnCountError = Symbol("On count error");
export const OnUpdateError = Symbol("On update error");
export const OnDeleteError = Symbol("On delete error");

export const ErrorSet = new Set([
  ConnectionError,
  NotFound,
  NotCreated,
  NotValidId,
  OnFindError,
  OnCountError,
  OnUpdateError,
  OnDeleteError,
]);

export const isDbError = ErrorSet.has;
