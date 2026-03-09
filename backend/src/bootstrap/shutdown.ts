import { logger } from "@/infra/logger.js";

type ShutdownHandler = () => Promise<void>;

const handlers: ShutdownHandler[] = [];

export function registerShutdown(handler: ShutdownHandler) {
  handlers.push(handler);
}

export async function shutdown(signal: string) {
  logger.warn(`${signal} received. Starting graceful shutdown`);

  for (const handler of handlers) {
    try {
      await handler();
    } catch (err) {
      logger.error(err, "Shutdown handler failed");
    }
  }

  logger.info("Graceful shutdown completed");
  process.exit(0);
}