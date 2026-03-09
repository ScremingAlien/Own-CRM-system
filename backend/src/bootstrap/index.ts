import { initDatabase } from "./db.bootstrap.js";
// import { initMessageBroker } from "./mq.bootstrap.js";
import { logger } from "@/infra/logger.js";

export async function bootstrapApp() {
  logger.info("Bootstrapping service...");

  await initDatabase();
  //   await initMessageBroker();

  logger.info("All dependencies initialized");
}
