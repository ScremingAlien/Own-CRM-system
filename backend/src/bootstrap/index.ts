import { logger } from "@/infra/logger.js";
import { initDatabase } from "./db.bootstrap.js";

export async function bootstrapApp() {
  logger.info("Bootstrapping service...");

  await initDatabase();

  logger.info("All dependencies initialized");
}
