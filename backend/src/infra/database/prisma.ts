 
import { PrismaPg } from "@prisma/adapter-pg";
import { logger } from "@/infra/logger.js";
 
import { PrismaClient } from "@/generated/index.js";

const connectionString = process.env.DATABASE_URL;

if (!connectionString) {
  logger.fatal("DATABASE_URL is not defined");
  process.exit(1);
}

const adapter = new PrismaPg({ connectionString });

export const prisma = new PrismaClient({
  adapter 
});