import { MongoClient } from "mongodb";
import { devMode, options, url } from "../config";

let client: MongoClient;

if (devMode) {
  // @ts-ignore
  let globalWithMongo = global as typeof globalThis & {
    _mongoClient?: MongoClient;
  };

  if (!globalWithMongo._mongoClient) {
    globalWithMongo._mongoClient = new MongoClient(url, options);
  }
  client = globalWithMongo._mongoClient;
} else {
  client = new MongoClient(url, options);
}

const getCollection = async (collectionName: string) => {
  const mongoClient = await client.connect();

  const database = mongoClient.db("crm_local");

  return database.collection(collectionName);
};

export { client, getCollection };
