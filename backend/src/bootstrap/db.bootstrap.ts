import { prisma } from "@/infra/database/prisma.js";
import { logger } from "@/infra/logger.js";

export async function initDatabase(): Promise<void> {
  try {
    await prisma.$connect();
    
    // simple connection verification
    await prisma.$queryRaw`SELECT 1`;

    logger.info("Database connected successfully");
  } catch (error) {
    logger.fatal({ err: error }, "Database connection failed");
    process.exit(1);
  }
}