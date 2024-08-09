import { MongoClientOptions } from "mongodb";

//@ts-ignore
if (!process.env.MONGODB_URI) {
  throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

//@ts-ignore
export const url = process.env.MONGODB_URI as string;

//@ts-ignore
export const devMode = process.env.NODE_ENV === "development";

//@ts-ignore
export const options: MongoClientOptions = {};

export const ErrorLogger = console.error;
//export const ErrorLogger = () => {};
