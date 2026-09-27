import mongoose from "mongoose";
import { env } from "./env";

let connectPromise: Promise<typeof mongoose> | null = null;

/**
 * Connects to MongoDB Atlas (or whatever MONGODB_URI points at). Safe to
 * call multiple times — reuses the in-flight/established connection instead
 * of opening a new one per call.
 */
export const connectToDatabase = () => {
  if (mongoose.connection.readyState === 1) {
    return Promise.resolve(mongoose);
  }

  if (!connectPromise) {
    connectPromise = mongoose
      .connect(env.MONGODB_URI, { dbName: env.MONGODB_DB_NAME })
      .catch((error) => {
        connectPromise = null;
        throw error;
      });
  }

  return connectPromise;
};

export const disconnectFromDatabase = async () => {
  connectPromise = null;
  await mongoose.disconnect();
};
