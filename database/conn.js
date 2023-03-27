import { MongoMemoryServer } from "mongodb-memory-server";
import mongoose from "mongoose";
import ENV from "../config.js";
export async function connect() {
  // const mongod = await MongoMemoryServer.create();
  // const getUri = mongod.getUri();
  // const db = await mongoose.connect(getUri);
  mongoose.set("strictQuery", true);
  const db = await mongoose.connect(ENV.ATLAS_URI);
  console.log("Data Base Connected");
  return db;
}
