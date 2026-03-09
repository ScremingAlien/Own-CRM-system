import mongoose from "mongoose";

import { logger } from "@/infra/logger.js";

const MONGO_URL: string = process.env.DB_URL || "";

const connectDB = async (): Promise<void> => {
  try {
    if (!MONGO_URL) {
      throw new Error("MongoDB connection string (DB_URL) is not defined in environment variables");
    }
    await mongoose.connect(MONGO_URL, {
      // You can still pass options if needed, but from mongoose v7 most defaults are fine
      // dbName: process.env.DB_NAME, // optional if you want separate DB name
    });
  } catch (error) {
    logger.fatal(error, "MongoDB connection error:");

    // Exit process on DB failure (best practice in prod)
    process.exit(1);
  }

  // Handle disconnections after initial connect
  mongoose.connection.on("disconnected", () => {
    logger.warn("MongoDB disconnected. Attempting to reconnect...");
  });

  mongoose.connection.on("reconnected", () => {});

  mongoose.connection.on("error", (err) => {
    logger.fatal(err, "MongoDB error:");
  });
};

export default connectDB;
