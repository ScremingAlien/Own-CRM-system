import "@/config/env.js";
import { createServer } from "http";

import { createApp } from "./app.js";
import { bootstrapApp } from "./bootstrap/index.js";
import { shutdown } from "./bootstrap/shutdown.js";
import { logger } from "@/infra/logger.js";

async function startServer() {
  try {
    await bootstrapApp();

    const app = createApp();
    const server = createServer(app);

    const port = Number(process.env.PORT) || 3000;

    server.listen(port, () => {
      logger.info({ port }, "HTTP server started");
    });

    // graceful shutdown
    process.once("SIGINT", () => shutdown("SIGINT"));
    process.once("SIGTERM", () => shutdown("SIGTERM"));
  } catch (err) {
    logger.fatal(err, "Application startup failed");
    process.exit(1);
  }
}

startServer();
