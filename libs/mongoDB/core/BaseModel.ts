import { ObjectId } from "mongodb";

export abstract class BaseModel {
  _id: ObjectId;

  constructor(id?: string | ObjectId) {
    if (id instanceof ObjectId) {
      this._id = id;
      return;
    }
    if (typeof id === "string") {
      this._id = new ObjectId(id);
      return;
    }
    this._id = new ObjectId();
  }
}
